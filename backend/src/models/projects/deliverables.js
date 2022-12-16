const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const fiscalYearTable = `${dataBaseSchemas().data}.fiscal_year`;
const projectDeliverableTable = `${dataBaseSchemas().data}.project_deliverable`;
const projectTable = `${dataBaseSchemas().data}.project`;
const healthIndicatorTable = `${dataBaseSchemas().data}.health_indicator`;

const findAllById = (projectId) => {
  return knex(`${projectDeliverableTable} as prd`)
    .columns(
      "prd.id",
      "prd.deliverable_name",
      "prd.description",
      "prd.start_date",
      "prd.completion_date",
      knex.raw("prd.deliverable_amount::numeric::float8"),
      knex.raw("prd.recoverable_amount::numeric::float8"),
      "proj.project_number",
      "prd.comments",
      "fy.fiscal_year as fiscal",
      "prd.deliverable_status",
      "prd.percent_complete",
      {
        health_id: knex.raw(
          "( SELECT json_build_object('red', ph.colour_red, 'green', ph.colour_green, 'blue', ph.colour_blue) )"
        ),
      },
      "prd.is_expense"
    )
    .leftJoin(`${fiscalYearTable} as fy`, { "prd.fiscal": `fy.id` })
    .leftJoin(`${projectTable} as proj`, { "prd.project_id": "proj.id" })
    .join(`${healthIndicatorTable} as ph`, "prd.health_id", "ph.id")
    .orderBy("prd.id")
    .where({ "prd.project_id": projectId });
};

// Get specific one by id.
const findById = (id) => {
  return knex
    .select(
      "prd.id",
      "prd.deliverable_name",
      "prd.description",
      "prd.start_date",
      "prd.completion_date",
      knex.raw("prd.deliverable_amount::numeric::float8"),
      knex.raw("prd.recoverable_amount::numeric::float8"),
      knex.raw(
        "( SELECT json_build_object('value', prd.project_id, 'label', proj.project_number)) AS project_id"
      ),
      "prd.comments",
      knex.raw(
        "(SELECT json_build_object('value', prd.fiscal, 'label', COALESCE(fy.fiscal_year, ''))) AS fiscal"
      ),
      "prd.deliverable_status",
      "prd.percent_complete",
      knex.raw(
        "( SELECT json_build_object('value', prd.health_id, 'label', ph.health_name) ) AS health_id"
      ),
      "prd.is_expense"
    )
    .from(`${projectDeliverableTable} as prd`)
    .leftJoin(`${projectTable} as proj`, { "prd.project_id": "proj.id" })
    .leftJoin(`${fiscalYearTable} as fy`, { "prd.fiscal": `fy.id` })
    .join(`${healthIndicatorTable} as ph`, "prd.health_id", "ph.id")
    .where("prd.id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectDeliverableTable).where("id", id).update(body);
};

// Add one.
const addOne = (newDeliverable) => {
  return knex(projectDeliverableTable).insert(newDeliverable);
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
};
