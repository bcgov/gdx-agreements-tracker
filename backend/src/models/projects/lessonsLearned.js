const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();

const projectTable = `${dataBaseSchemas().data}.project`;
const lessonsLearned = `${dataBaseSchemas().data}.project_lesson`;
const lessonCategory = `${dataBaseSchemas().data}.lesson_category`;

// Get all lesson learned for specific project id.
const findAllById = (id) => {
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
const findById = (lessonsLearnedId) => {
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
const updateOne = (body, lessonsLearnedId) => {
  return knex(lessonsLearned).where("id", lessonsLearnedId).update(body);
};

// Add one.
const addOne = (data) => {
  return knex(lessonsLearned).insert(data);
};

module.exports = {
  findAllById,
  findById,
  updateOne,
  addOne,
};
