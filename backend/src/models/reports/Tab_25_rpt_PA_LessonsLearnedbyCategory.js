const dbConnection = require("@database/databaseConnection");
const { request } = require("http");
const { knex } = dbConnection();

/**
 * Gets data for the Divisional Project Reports - Project Dashboard report.
 *
 * @param           requestParams the params or filter values passed to filter the query on
 * @returns {any[]}
 */
const Tab_25_rpt_PA_LessonsLearnedbyCategory = (requestParams) => {
  const query = knex.select(
    knex.raw(`data.lesson_category.id AS LessonCategory_ID, 
    data.lesson_category.lesson_category_name, 
    data.project.project_number, 
    project.project_name, 
    project.id AS ProjectID, 
    fy.fiscal_year, 
    data.project_lesson.lesson,
    data.project_lesson.recommendations,
    data.project_lesson.lesson_sub_category,
    data.portfolio.portfolio_abbrev, 
    data.portfolio.portfolio_name,
    data.project.portfolio_id
    FROM (data.portfolio INNER JOIN data.project ON portfolio.id = data.project.portfolio_id) 
    INNER JOIN data.fiscal_year fy on data.project.fiscal = fy.id
    INNER JOIN (data.lesson_category INNER JOIN data.project_lesson ON data.lesson_category.id = data.project_lesson.lesson_category_id) 
    ON project.id = data.project_lesson.project_id`)
  );

  console.log(requestParams);

  if (requestParams.portfolio_id) {
    query.where({ "data.project.portfolio_id": requestParams.portfolio_id });
  }
  if (requestParams.fiscal) {
    query.where({ "data.project.fiscal": requestParams.fiscal });
  }
  if (requestParams.project_id) {
    query.where({ "data.project.id": requestParams.project_id });
  }

  return query;
};

module.exports = {
  Tab_25_rpt_PA_LessonsLearnedbyCategory,
};
