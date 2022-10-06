const dbConnection = require("../database/databaseConnection");
const { dateFormat } = require("../helpers/standards");
const { knex, dataBaseSchemas } = dbConnection();

const projectTable = `${dataBaseSchemas().data}.project`;
const getFromView = `${dataBaseSchemas().data}.projects_with_json`;
const contactTable = `${dataBaseSchemas().data}.contact`;
const lessonsLearned = `${dataBaseSchemas().data}.project_lesson`;
const lessonCategory = `${dataBaseSchemas().data}.lesson_category`;
const portfolio = `${dataBaseSchemas().data}.portfolio`;

// Get all.
const findAll = () => {
  return knex(`${projectTable} as p`)
    .column([
      "p.id",
      "p.project_number",
      "p.project_name",
      { version: "p.project_version" },
      "port.portfolio_name",
      { project_manager: knex.raw("c.last_name || ', ' || c.first_name") },
      { registration_date: knex.raw(`TO_CHAR(p.initiation_date :: DATE, '${dateFormat}')`) },
      { end_date: knex.raw(`TO_CHAR(p.agreement_end_date :: DATE, '${dateFormat}')`) },
      { status: "p.project_status" },
    ])
    .select()
    .leftJoin(`${portfolio} as port`, "p.portfolio_id", "port.id")
    .leftJoin(`${contactTable} as c`, "p.project_manager", "c.id")
    .orderBy("p.id", "desc");
};

// Get specific one by id.
// Casts money types to float so values are numeric instead of string.
const findById = (id) => {
  return knex(getFromView)
    .select(
      "*",
      knex.raw("planned_budget::numeric::float8"),
      knex.raw("total_project_budget::numeric::float8"),
      knex.raw("recoverable_amount::numeric::float8")
    )
    .where("id", id)
    .first();
};

// Update one.
const updateOne = (body, id) => {
  return knex(projectTable).where("id", id).update(body);
};

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

// Get all lesson learned for specific project id.
const findProjectLessonsLearned = (id) => {
  return knex(`${lessonsLearned} as pl`)
    .columns(
      { category: "lc.lesson_category_name" },
      { subcategory: "pl.lesson_sub_category" },
      "pl.lesson",
      "pl.recommendations",
      "pl.id"
    )
    .select()
    .leftJoin(`${projectTable} as p`, { "pl.project_id": `p.id` })
    .leftJoin(`${lessonCategory} as lc`, { "pl.lesson_category_id": `lc.id` })
    .where("pl.project_id", id)
    .orderBy([
      { column: "lc.lesson_category_name", order: "asc" },
      { column: "pl.lesson_sub_category", order: "asc" },
    ]);
};

// Get all lesson learned for specific project id.
const findLessonsLearnedById = (lessonsLearnedId) => {
  return knex
    .select(
      knex.raw(`(
          SELECT json_build_object(
            'value', lc.id,
            'label', lc.lesson_category_name
          ) as lesson_category_id
        )`),
      "pl.lesson_sub_category",
      "pl.lesson",
      "pl.recommendations",
      "pl.id"
    )
    .from(`${lessonsLearned} as pl`)
    .leftJoin(`${projectTable} as p`, { "pl.project_id": `p.id` })
    .leftJoin(`${lessonCategory} as lc`, { "pl.lesson_category_id": `lc.id` })
    .where("pl.id", lessonsLearnedId)
    .first();
};

// Update one.
const updateOneProjectLessonsLearned = (body, lessonsLearnedId) => {
  return knex(lessonsLearned).where("id", lessonsLearnedId).update(body);
};

// Add one.
const addOne = (data) => {
  return knex(lessonsLearned).insert(data);
};

module.exports = {
  findAll,
  findById,
  findCloseOutById,
  findProjectLessonsLearned,
  findLessonsLearnedById,
  updateOne,
  updateOneProjectLessonsLearned,
  addOne,
};
