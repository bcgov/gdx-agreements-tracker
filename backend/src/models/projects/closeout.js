const dbConnection = require("../../database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const projectTable = `${dataBaseSchemas().data}.project`;
const contactTable = `${dataBaseSchemas().data}.contact`;

// Get close out data by project id.
const findCloseOutById = (id) => {
  return knex(`${projectTable} as p`)
    .select(
      "p.id",
      "p.close_out_date",
      knex.raw(`(
        SELECT json_build_object(
          'value', c.id,
          'label', CASE WHEN (c.id IS NOT NULL)
            THEN (c.last_name || ', ' || c.first_name)
            ELSE '' END
        ) as completed_by_contact_id
      )`),
      "p.actual_completion_date",
      knex.raw(`(
        SELECT json_build_object(
          'value', p.hand_off_to_operations,
          'label', COALESCE(p.hand_off_to_operations, '')
        ) as hand_off_to_operations
      )`),
      knex.raw(`(
        SELECT json_build_object(
          'value', p.records_filed,
          'label', COALESCE(p.records_filed, '')
        ) as records_filed
      )`),
      knex.raw(`(
        SELECT json_build_object(
          'value', p.contract_ev_completed,
          'label', COALESCE(p.contract_ev_completed, '')
        ) as contract_ev_completed
      )`),
      knex.raw(`(
        SELECT json_build_object(
          'value', p.contractor_security_terminated,
          'label', COALESCE(p.contractor_security_terminated, '')
        ) as contractor_security_terminated
      )`)
    )
    .leftJoin(`${contactTable} as c`, "p.completed_by_contact_id", "c.id")
    .where("p.id", id)
    .first();
};

module.exports = {
  findCloseOutById,
};
