const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contact_project`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const contactRoleTable = `${dataBaseSchemas().data}.contact_role`;

const findAllById = async (projectId) => {
  return knex
    .columns({ role_id: "cr.id" }, "cr.role_type", {
      contacts: knex.raw(
        `CASE json_agg(cp.id)::text
          WHEN '[null]' THEN '[]'
          ELSE json_agg(json_strip_nulls(json_build_object('value', c.id, 'label', c.last_name || ', ' || c.first_name)))
        END`
      ),
    })
    .select()
    .from(`${contactRoleTable} as cr`)
    .leftJoin(
      `${table} as cp`,
      knex.raw(`cp.contact_role = cr.id AND cp.project_id = ${projectId}`)
    )
    .leftJoin(`${contactTable} as c`, { "cp.contact_id": "c.id" })
    .groupBy("cr.id");

  // const result = await knex("contact_project")
  //   .select(
  //     "contact_project.contact_role",
  //     "contact.first_name",
  //     "contact.last_name",
  //     "contact_project.contact_id",
  //     "contact_role.role_type"
  //   )
  //   .join("contact", "contact_project.contact_id", "contact.id")
  //   .join("contact_role", "contact_project.contact_role", "contact_role.id")
  //   .where("contact_project.project_id", projectId)

  // const formattedData = {};

  // result.forEach((row) => {
  //   const { first_name, last_name, contact_id, role_type } = row;

  //   if (!formattedData[role_type]) {
  //     formattedData[role_type] = [];
  //   }

  //   formattedData[role_type].push({
  //     label: `${first_name} ${last_name}`,
  //     value: contact_id,
  //   });
  // });
  // return formattedData
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
