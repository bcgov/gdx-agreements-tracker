const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const table = `${dataBaseSchemas().data}.contact_project`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const contactRoleTable = `${dataBaseSchemas().data}.contact_role`;

// Get all.
const findAllById = (projectId) => {
  return knex.select(
    knex.raw(
      `
      cr.role_type, 
      cr.id as role_id,
      (CASE json_agg(cp.id)::text
                WHEN '[null]' THEN '[]'
                ELSE json_agg(json_strip_nulls(json_build_object('value', c.id, 'label', c.last_name || ', ' || c.first_name)))
              END) as contacts,
      json_agg(cp.id) as rows_to_lock
      from data.contact_role as cr
      LEFT JOIN data.contact_project as cp ON cp.contact_role = cr.id AND cp.project_id = ${projectId}
      LEFT JOIN data.contact as c ON cp.contact_id = c.id
      group by cr.id
      `
    )
  );
};

// Update one.
const updateOne = (body, projectId) => {
  for (const [key, value] of Object.entries(body)) {
    return value.map((row) => {
      // console.log('row', row)
      // console.log('first', { contact_role: Number(key), project_id: projectId, contact_id: row.value })
      return knex(table).insert({
        contact_role: Number(key),
        project_id: projectId,
        contact_id: row.value,
      });
    });
  }

  // if (body.length > 0) {
  //   // If there are any new rows to insert, insert them.
  //   return trx(table)
  //     .insert(body)
  //     .onConflict(["contact_id", "project_id", "contact_role"])
  //     .merge()
  //     .returning("id")
  //     .then((ids) => {
  //       // Delete any rows that were not included in input.
  //       return trx(table)
  //         .whereNotIn(
  //           "id",
  //           ids.map((val) => val.id)
  //         )
  //         .andWhere("project_id", projectId)
  //         .del();
  //     });
  // } else {
  //   // Otherwise, delete all rows belonging to project id.
  //   return trx(table).where("project_id", projectId).del();
  // }
};

module.exports = {
  findAllById,
  updateOne,
};
