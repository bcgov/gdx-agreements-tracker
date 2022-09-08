const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.project`;
const getFromView = `${dbConnection.dataBaseSchemas().data}.projects_with_json`;
const contactTable = `${dbConnection.dataBaseSchemas().data}.contact`;

const model = () => {
  // Get all.
  const findAll = () => {
    return db(table).select(
      "project_number",
      "project_name",
      "project_version",
      "portfolio_id",
      "project_manager",
      "agreement_end_date",
      "project_status",
      "initiation_date",
      "id"
    );
  };

  // Get specific one by id.
  // Casts money types to float so values are numeric instead of string.
  const findById = (projectId) => {
    return db(getFromView)
      .select(
        "*",
        db.raw("planned_budget::numeric::float8"),
        db.raw("total_project_budget::numeric::float8"),
        db.raw("recoverable_amount::numeric::float8")
      )
      .where("id", projectId)
      .first();
  };

  // Update one.
  const updateOne = (body, id) => {
    return db(table).where("id", id).update(body);
  };

  // Get close out data by project id.
  const findCloseOutById = (projectId) => {
    return db(`${table} as p`)
      .select(
        "p.id",
        "p.close_out_date",
        db.raw(`(
        SELECT json_build_object(
          'value', c.id,
          'label', CASE WHEN (c.id IS NOT NULL)
            THEN (c.last_name || ', ' || c.first_name)
            ELSE '' END
        ) as completed_by_contact_id
      )`),
        "p.actual_completion_date",
        db.raw(`(
        SELECT json_build_object(
          'value', p.hand_off_to_operations,
          'label', COALESCE(p.hand_off_to_operations, '')
        ) as hand_off_to_operations
      )`),
        db.raw(`(
        SELECT json_build_object(
          'value', p.records_filed,
          'label', COALESCE(p.records_filed, '')
        ) as records_filed
      )`),
        db.raw(`(
        SELECT json_build_object(
          'value', p.contract_ev_completed,
          'label', COALESCE(p.contract_ev_completed, '')
        ) as contract_ev_completed
      )`),
        db.raw(`(
        SELECT json_build_object(
          'value', p.contractor_security_terminated,
          'label', COALESCE(p.contractor_security_terminated, '')
        ) as contractor_security_terminated
      )`)
      )
      .leftJoin(`${contactTable} as c`, "p.completed_by_contact_id", "c.id")
      .where("p.id", projectId)
      .first();
  };

  return {
    findAll,
    findById,
    findCloseOutById,
    updateOne,
  };
};

export default model;
