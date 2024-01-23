const { knex } = require("@database/databaseConnection")();
const log = require("../../facilities/logging")(module.filename);

  const queries = {
    fiscal: (fiscal) =>
      knex("fiscal_year").select("fiscal_year").where("fiscal_year.id", fiscal).first(),

    report: ( fiscal, project_type ) => 
      knex('data.project')
      .select({
        fiscal: 'project.fiscal',
        project_number: 'project.project_number',
        project_name: 'project.project_name',
        portfolio_abbrev: 'portfolio.portfolio_abbrev',
        description: 'project.description',
        ministry_id: 'project.ministry_id',
        ministry_name: 'ministry.ministry_name',
        ministry_short_name: 'ministry.ministry_short_name',
        planned_start_date: 'project.planned_start_date',
        planned_end_date: 'project.planned_end_date',
        total_project_budget: knex.raw(
            `CASE WHEN client_coding.client_amount IS NULL
                THEN project.total_project_budget
                ELSE client_coding.client_amount
                END`
        ),
        portfolio_name: 'portfolio.portfolio_name',
        project_manager: knex.raw('project.project_manager::VARCHAR'),
        client_sponsor: knex.select(knex.raw(
              `
                  CASE WHEN client_coding.client_amount IS NULL
                    THEN get_project_contacts( project.id, 'ClientSponsor')
                    ELSE contact.first_name || ' ' || contact.last_name
                  END
          
                FROM
                  client_coding
                  RIGHT JOIN portfolio ON portfolio.id = project.portfolio_id
                  LEFT JOIN fiscal_year ON project.fiscal = fiscal_year.id
                  LEFT JOIN ministry ON project.Ministry_ID = ministry.id
                  LEFT JOIN contact ON client_coding.Contact_ID = contact.id
                LIMIT 1
                `
        )
        ),
        fiscal_year: 'fiscal_year.fiscal_year',
        project_type: 'project.project_type',
      })
      .leftJoin('portfolio', 'project.portfolio_id', 'portfolio.id')
      .leftJoin('ministry', 'project.ministry_id', 'ministry.id')
      .leftJoin('fiscal_year', 'project.fiscal', 'fiscal_year.id')
      .joinRaw('LEFT JOIN client_coding ON portfolio.client::INTEGER = client_coding.id')
      .where({
        'project.fiscal': fiscal,
        'project.project_type': JSON.parse(project_type),
      })
      .unionAll(function() {
        this.select({
          fiscal: 'historical_projects.fiscal_year',
          project_number: 'historical_projects.project_number',
          project_name: 'historical_projects.project_name',
          portfolio_abbrev: 'portfolio.portfolio_abbrev',
          description: 'historical_projects.description',
          ministry_id: 'historical_projects.ministry_id',
          ministry_name: 'ministry.ministry_name',
          ministry_short_name: 'ministry.ministry_short_name',
          start_date: 'historical_projects.start_date',
          end_date: 'historical_projects.end_date',
          total_project_budget: 'historical_projects.total_project_budget',
          portfolio_name: 'portfolio.portfolio_name',
          project_manager: 'historical_projects.project_manager',
          client_sponsor: knex.raw('NULL'),
          fiscal_year: 'fiscal_year.fiscal_year',
          project_type: 'historical_projects.project_type'
        })
        .from('historical_projects')
        .innerJoin('portfolio', 'historical_projects.portfolio_id', 'portfolio.id')
        .innerJoin('fiscal_year', 'historical_projects.fiscal_year', 'fiscal_year.id')
        .innerJoin('ministry', 'historical_projects.ministry_id', 'ministry.id')
        .where({
          'historical_projects.fiscal_year': fiscal,
          'historical_projects.project_type': JSON.parse(project_type),
        })
      })
  }

const getAll = async ({ fiscal, project_type }) => {
  try {
    const [{ fiscal_year }, report ] = await Promise.all([
      queries.fiscal(fiscal),
      queries.report(fiscal, project_type),
    ]);

  return { fiscal_year, report };

  } catch (error) {
    log.error(error);
    throw error;
  }
}

module.exports = {
  required: ["fiscal", "project_type"],
  getAll
};
