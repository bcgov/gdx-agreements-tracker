const fs = require("fs");
const path = require("path");
const nReadlines = require("n-readlines");

exports.seed = (knex) => {
  return (
    knex
      // Turn off certain database constraints to ease importing of data.
      .raw("SET session_replication_role = 'replica';")
      .then(async () => {
        const seedsPath = "./src/database/production_seeds";
        const files = fs.readdirSync(seedsPath);
        // Loop through all of the files.
        for (const filename of files) {
          // Only open .dat files.
          if (!filename.endsWith(".dat")) {
            continue;
          }
          const filePath = path.join(seedsPath, filename);
          const datFile = new nReadlines(filePath);

          // Load the "header" from the .dat file.
          const tableName = datFile.next();
          const columns = JSON.parse(datFile.next());

          // eslint-disable-next-line no-console
          console.log(`Loading table: ${tableName}`);

          // Flush out the original table contents.
          await knex(tableName).withSchema("data").del();

          let row;
          // Load each row from the .dat file, and insert it into the database.
          while ((row = datFile.next())) {
            row = JSON.parse(row);
            // knex only accepts objects, so combine the keys and data into an object.
            const merged = columns.reduce((obj, key, index) => ({ ...obj, [key]: row[index] }), {});

            // eslint-disable-next-line no-console
            // console.dir(merged);

            // Insert the data.
            await knex(tableName).withSchema("data").insert(merged);
          }
        }
      })
      .then(() =>
        // This PG/PLSQL code brings all of the id sequence numbers in all of the data tables, up to date with the max value found in the container.
        knex.raw(
          "DO\n" +
            "$$\n" +
            "DECLARE\n" +
            "\trec   record;\n" +
            "BEGIN\n" +
            "\tFOR rec IN\n" +
            "\t\tSELECT \n" +
            "\t\t\tconcat(ist.table_schema,'.',ist.table_name) as table_path, \n" +
            "\t\t\tpg_get_serial_sequence(concat(ist.table_schema,'.',ist.table_name), 'id') as seq_name\n" +
            "\t\tFROM information_schema.tables AS ist\n" +
            "\t\tWHERE table_schema='data' AND table_type='BASE TABLE'\n" +
            "\tLOOP\n" +
            "\t\tEXECUTE format(E'SELECT setval(%L, COALESCE((SELECT MAX(id)+1 FROM %s), 1), false);', rec.seq_name, rec.table_path);\n" +
            "\tEND LOOP;\n" +
            "END\n" +
            "$$;"
        )
      )
      .then(() => knex.raw("SET session_replication_role = 'origin';"))
  );
};
