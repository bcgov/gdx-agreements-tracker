const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contact_project`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const contactRoleTable = `${dataBaseSchemas().data}.contact_role`;

const findAllById = async (projectId) => {
  return knex
    .columns(
      { role_id: "cr.id" },
      "cr.role_type",
      {
        contacts: knex.raw(
          `CASE 
          WHEN cp.contact_role = 6 THEN
           json_build_object('value', c.id, 'label', c.last_name || ', ' || c.first_name)
          ELSE 
            CASE json_agg(cp.id)::text
              WHEN '[null]' THEN '[]'
              ELSE json_agg(json_strip_nulls(json_build_object('value', c.id, 'label', c.last_name || ', ' || c.first_name)))
            END
        END`
        ),
      },
      { rows_to_lock: knex.raw(`array_agg(cp.id)`) }
    )
    .select()
    .from(`${contactRoleTable} as cr`)
    .leftJoin(
      `${table} as cp`,
      knex.raw(`cp.contact_role = cr.id AND cp.project_id = ${projectId}`)
    )
    .leftJoin(`${contactTable} as c`, { "cp.contact_id": "c.id" })
    .groupBy("cr.id", "cp.contact_role", "c.id");
};

// Update one.
const updateOne = (body, projectId) => {
  return knex.transaction(async (trx) => {
    if (body.length > 0) {
      // If there are any new rows to insert, insert them.
      return trx(table)
        .insert(body)
        .onConflict(["contact_id", "project_id", "contact_role"])
        .merge()
        .returning("id")
        .then((ids) => {
          // Delete any rows that were not included in input.
          return trx(table)
            .whereNotIn(
              "id",
              ids.map((val) => val.id)
            )
            .andWhere("project_id", projectId)
            .del();
        });
    } else {
      // Otherwise, delete all rows belonging to project id.
      return trx(table).where("project_id", projectId).del();
    }
  });
};

module.exports = {
  findAllById,
  updateOne,
};
