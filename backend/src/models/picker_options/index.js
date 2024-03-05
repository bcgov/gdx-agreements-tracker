const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const pickerOptions = `${dataBaseSchemas().public}.picker_options`;

/**
 * Gets all the picker options.
 *
 * @returns {Array}
 */
const findAll = () => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups(false, false));
};

/**
 * Controller to get picker options with specific project related options.
 *
 * @param   {int}   id The project id.
 * @returns {Array}
 */
const findAllByProject = (id) => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups(id, false));
};

/**
 * Retrieves picker options with specific contract-related options.
 *
 * @param   {number} id                 - The contract ID.
 * @param   {object} [params={}]        - Additional parameters for the query.
 * @param   {string} [params.someParam] - An example parameter description.
 * @returns {Array}                     An array of picker options.
 */
const findAllByContract = (id, params = {}) => {
  return knex(pickerOptions)
    .select("name", "title", "description", knex.raw(getCaseStatements()), "associated_form")
    .unionAll(getTableLookups(false, id, params));
};

/**
 * Helper function to get case statement for initial query for drop down values.
 *
 * @returns {string}
 */
const getCaseStatements = () => {
  return `
    CASE
      WHEN definition ->> 'dropDownValues' IS NOT NULL THEN definition -> 'dropDownValues'
    END definition`;
};

/**
 * This is the table lookup values, which gets an array of json values for lookups of an existing table.
 *
 * @param   {int|boolean} projectId          The project id if applicable.
 * @param   {int|boolean} contractId         The contract id if applicable.
 * @param   {object}      [params={}]        - Additional parameters for the query.
 * @param   {string}      [params.someParam] - An example parameter description.
 * @returns {Array}
 */
const tableLookupValues = (projectId, contractId, params) => {
  const pickerOptions = [
    {
      id: "ministry",
      name: "ministry_option",
      title: "Client Ministry Name",
      description: "",
      table: "data.ministry",
      value: "id",
      label: `concat(ministry.ministry_name, ' ', ministry.ministry_short_name)`,
      queryAdditions: ``,
    },
    {
      id: "fy",
      name: "fiscal_year_option",
      title: "Fiscal Year",
      description: "",
      table: "data.fiscal_year",
      value: "id",
      label: `fiscal_year`,
      queryAdditions: `WHERE fiscal_year IS NOT NULL`,
    },
    {
      id: "port",
      name: "portfolio_option",
      title: "Portfolio",
      description: "",
      table: "data.portfolio",
      value: "id",
      label: `concat(portfolio.portfolio_name, ' ', portfolio.portfolio_abbrev) `,
      queryAdditions: ``,
    },
    {
      id: "sub",
      name: "subcontractor_option",
      title: "Subcontractor",
      description: "",
      table: "data.subcontractor",
      value: "id",
      label: `subcontractor_name`,
      queryAdditions: `WHERE subcontractor_name IS NOT NULL`,
    },
    {
      id: "sup",
      name: "supplier_option",
      title: "Supplier",
      description: "",
      table: "data.supplier",
      value: "id",
      label: `supplier_name`,
      queryAdditions: `WHERE supplier_name IS NOT NULL`,
    },
    {
      id: "contramend",
      name: "amendment_type_option",
      title: "Ammendment Type",
      description: "",
      table: "data.amendment_type",
      value: "id",
      label: `amendment_type_name`,
      queryAdditions: `WHERE amendment_type_name IS NOT NULL`,
    },
    {
      id: "con",
      name: "contact_option",
      title: "Contact",
      description: "",
      table: "data.contact",
      value: "id",
      label: `concat(contact.last_name, ', ', contact.first_name)`,
      queryAdditions: `WHERE last_name IS NOT NULL`,
    },
    {
      id: "proj",
      name: "project_option",
      title: "Projects",
      description: "",
      table: "data.project",
      value: "id",
      label: `project_number`,
      queryAdditions: `WHERE project_number IS NOT NULL`,
    },
    {
      id: "procurement",
      name: "procurement_method_option",
      title: "Procurement",
      description: "",
      table: "data.procurement_method",
      value: "id",
      label: `procurement_method`,
      queryAdditions: `WHERE procurement_method IS NOT NULL
      AND procurement_method NOT LIKE '%historical%'`,
    },
    {
      id: "lessonscategory",
      name: "lesson_category_option",
      title: "Lessons Category",
      description: "",
      table: "data.lesson_category",
      value: "id",
      label: `lesson_category_name`,
      queryAdditions: `WHERE lesson_category_name IS NOT NULL`,
    },
    {
      id: "resourceoption",
      name: "resource_option",
      title: "Resource",
      description: "",
      table: "data.resource",
      value: "id",
      label: `concat(resource_last_name, ', ', resource_first_name)`,
      queryAdditions: `WHERE resource_last_name IS NOT NULL`,
    },
    {
      id: "supplyrate",
      name: "supplier_rate_option",
      title: "Supplier Rate",
      description: "",
      table: "data.supplier_rate",
      value: "supplier_rate.id",
      label: `concat(resource_type.resource_type, ' ', supplier_rate.competency, ' - ', supplier_rate.rate)`,
      queryAdditions: `JOIN data.resource_type  ON supplier_rate.resource_type_id = resource_type.id WHERE supplier_rate.rate IS NOT NULL`,
    },
    {
      id: "contract",
      name: "contract_option",
      title: "Contract",
      description: "the contract",
      table: "data.contract",
      value: "contract.id",
      label: `co_number`,
      queryAdditions: ``,
    },
    {
      id: "health",
      name: "health_status_option",
      title: "Health Status",
      description: "the Health Status",
      table: "data.health_indicator",
      value: "id",
      label: "health_name",
      queryAdditions: ``,
    },
    {
      id: "projectphase",
      name: "project_phase_option",
      title: "Project Phase",
      description: "the project phase",
      table: "data.project_phase",
      value: "id",
      label: "phase_name",
      queryAdditions: `ORDER BY sort_order ASC`,
    },
    {
      id: "recoveryType",
      name: "recovery_type_option",
      title: "Recovery",
      description: "the recovery type",
      table: "data.recovery_type",
      value: "id",
      label: "recovery_type_name",
      queryAdditions: ``,
      customDefinition: `(SELECT COALESCE(json_agg(recoveryType), '[]')
      FROM(
        SELECT
        recovery_type_name,
        inactive,
        id as value
        FROM data.recovery_type
        ORDER BY id ASC
        ) recoveryType)`,
    },
    {
      id: "resourceType",
      name: "resource_type_option",
      title: "Resource",
      description: "the project resources",
      table: "data.resource_type",
      value: "id",
      label: "resource_type", //The column you want to pull lookup data from
      queryAdditions: ``, //You can leave this blank
    },
    {
      id: "recoveryArea",
      name: "recovery_area_option",
      title: "Recovery",
      description: "the project budget recovery",
      table: "data.portfolio",
      value: "id",
      label: "portfolio_name",
      queryAdditions: ``,
      customDefinition: `(SELECT COALESCE(json_agg(projbudgrecovarea), '[]')
      FROM(
        SELECT
        portfolio_name,
        portfolio_abbrev,
        id as value
        FROM data.portfolio
        ORDER BY id ASC
        ) projbudgrecovarea)`,
    },
    {
      id: "projectCRType",
      name: "cr_type_option",
      title: "Change Request Type",
      description: "the project change request type ",
      table: "data.crtype",
      value: "id",
      label: "label",
      queryAdditions: ``,
      customDefinition: `(SELECT COALESCE(json_agg(projectCRType), '[]')
      FROM (
        SELECT
        crtype_name,
        inactive,
        id AS value
        from data.crtype
      ) as projectCRType)`,
    },
    {
      id: "projectAutoCompleteTable",
      name: "project_autocompletetable_picker",
      title: "Projects",
      description: "",
      table: "data.project",
      value: "id",
      label: `project_number`,
      queryAdditions: ``,
      customDefinition: `(SELECT COALESCE(json_agg(projectAutoCompleteTable), '[]')
      FROM (
        SELECT
        project_number,
        project_name,
        project_status,
        id AS value
        from data.project
      ) as projectAutoCompleteTable)`,
    },
  ];

  if (projectId) {
    pickerOptions.push(
      {
        id: "clientcoding",
        name: "client_coding_option",
        title: "Client Coding",
        description: "",
        table: "data.client_coding",
        value: "client_coding.id",
        label: `COALESCE(client_coding.program_area, client_coding.client)`,
        queryAdditions: getClientCodingQueryAdditions(projectId),
      },
      {
        id: "projdel",
        name: "project_deliverable_option",
        title: "Project Deliverable",
        description: "",
        table: "data.project_deliverable",
        value: "project_deliverable.id",
        label: `project_deliverable.deliverable_name`,
        queryAdditions: getProjectDeliverablesQueryAdditions(projectId),
      },
      {
        id: "projectbudgetcontract",
        name: "budget_contract_option", // To be used in the front end FormConfig.ts file
        title: "Contract", // Title for the frontend if you don't provide a title in the FormConfig
        description: "the contract related to the project budget",
        table: "data.contract", // The table you want to lookup to
        value: "id", // The value for the picker ex: {label:"example", value:contract.id}
        label: "label", // The label for the picker ex: {label:"example", value:contract.id}
        queryAdditions: ``,
        customDefinition: `(SELECT COALESCE(json_agg(projbudgcont), '[]')
          FROM (
            SELECT
              cont.co_number,
              cont.co_version,
              cont.contract_number,
              cont.id AS value
            FROM data.contract as cont
            WHERE cont.project_id = ${projectId}
            ) AS projbudgcont)`,
      },
      {
        id: "reportedby",
        name: "reported_by_contact_id_option",
        title: "Reported By",
        description: "The individual(s) reporting the Project Status",
        table: "data.contact",
        value: "id",
        label: "label",
        queryAdditions: ``,
        customDefinition: `(SELECT COALESCE(json_agg(ps), '[]')
        FROM (
          SELECT
          COALESCE(c.last_name || ', ' || c.first_name, '') AS name,
          min.ministry_short_name AS ministry,
          c.id AS value
          FROM data.contact AS c
          LEFT JOIN data.ministry AS min ON c.ministry_id = min.id
        )ps)`,
      },
      {
        id: "deliverablename",
        name: "project_budget_deliverables_option",
        title: "Deliverable Name",
        description: "the project budget deliverables",
        table: "",
        value: "",
        label: "",
        queryAdditions: ``,
        customDefinition: `(SELECT COALESCE(json_agg(projbudgdelname), '[]')
            FROM (
              SELECT
                prjd.deliverable_name as deliverable_name,
                prjd.id as value,
                prjd.id as deliverable_id
              FROM data.project_deliverable prjd
              WHERE project_id = ${projectId}
            ) projbudgdelname)`,
      },
      {
        id: "programArea",
        name: "program_area_option",
        title: "Program Area",
        description: "the project budget program areas",
        table: "",
        value: "",
        label: "",
        queryAdditions: ``,
        customDefinition: `
          (
            SELECT COALESCE(json_agg(programArea), '[]')
            FROM (
              SELECT DISTINCT ON (financial_contact_name)
                cc.program_area,
                con.first_name || ' ' || con.last_name AS financial_contact_name,
                min.ministry_short_name,
                pb.client_coding_id AS value
              FROM data.project_budget pb
              LEFT JOIN data.client_coding cc ON pb.client_coding_id = cc.id
              LEFT JOIN data.contact con ON cc.contact_id = con.id
              LEFT JOIN data.ministry min ON con.ministry_id = min.id
              WHERE cc.project_id = ${projectId}
            ) as programArea
          )`,
      },
      {
        id: "billingProgramArea",
        name: "billing_program_area_option",
        title: "Program Area",
        description: "the project billing program areas",
        table: "",
        value: "",
        label: "",
        queryAdditions: ``,
        customDefinition: `
        (SELECT COALESCE(json_agg(billingProgramArea), '[]')
        FROM (
          SELECT
            cc.program_area,
            cc.client,
            cc.responsibility_centre,
            cc.service_line,
            cc.stob,
            cc.project_code,
            cc.client_amount,
            cc.id AS value
          from data.client_coding cc
          WHERE cc.project_id= ${projectId}
        ) as billingProgramArea)`,
      }
    );
  }

  if (contractId) {
    pickerOptions.push(
      {
        id: "contractresource",
        name: "contract_resource",
        title: "Contract Resource",
        description: "",
        table: "data.contract_resource",
        value: "contract_resource.id",
        label: `(r.resource_last_name || ', ' || r.resource_first_name)`,
        queryAdditions: getContractResourceQueryAdditions(contractId),
        customDefinition: `
        (SELECT COALESCE(json_agg(contres), '[]')
        FROM (
          SELECT
            (r.resource_last_name || ', ' || r.resource_first_name) AS resource,
            fy.fiscal_year,
            cr.assignment_rate,
            rt.resource_type as assignment_role,
            total_invoiced.total_amount AS total_invoiced,
            ((cr.assignment_rate * cr.hours) - amount_total.sum) AS remaining,
            cr.id as value
            FROM
                data.contract_resource cr
                JOIN data.resource r ON cr.resource_id = r.id
                JOIN data.fiscal_year fy ON cr.fiscal = fy.id
                JOIN data.supplier_rate sr on cr.supplier_rate_id = sr.id 
                JOIN data.resource_type rt on sr.resource_type_id = rt.id
                LEFT JOIN (
                  SELECT
                      contract_resource_id,
                      SUM(unit_amount * rate) AS sum
                  FROM
                      data.invoice_detail
                  GROUP BY
                      contract_resource_id
                 ) AS amount_total ON amount_total.contract_resource_id = cr.id
                LEFT JOIN (
                    SELECT
                        cr.fiscal,
                        SUM(invd.unit_amount * invd.rate) AS total_amount
                    FROM
                        data.invoice_detail invd
                    JOIN data.contract_resource cr ON invd.contract_resource_id = cr.id
                    WHERE
                        cr.contract_id = 585
                        AND cr.fiscal = 13
                    GROUP BY
                        cr.fiscal
                ) AS total_invoiced ON cr.fiscal = total_invoiced.fiscal
        WHERE
            cr.contract_id = ${contractId}
            AND cr.fiscal = ${Number(params.fiscal_id)}
          ) AS contres)`,
      },
      {
        id: "contractdeliverable",
        name: "contract_deliverable",
        title: "Contract Deliverable",
        description: "",
        table: "data.contract_deliverable",
        value: "contract_deliverable.id",
        label: `contract_deliverable.deliverable_name`,
        queryAdditions: getContractDeliverableQueryAdditions(contractId),
      },
      {
        id: "projdel",
        name: "project_deliverable_option",
        title: "Project Deliverable",
        description: `The Deliverable details for this project contract#${contractId}`,
        table: "data.contract_deliverable",
        value: "id",
        label: "label",
        queryAdditions: "",
        customDefinition: `(SELECT COALESCE(json_agg(projdel), '[]')
        FROM (
          SELECT
            cd.deliverable_name,
            cd.deliverable_amount,
            cd.deliverable_status,
            cd.project_deliverable_id
          FROM data.contract_deliverable AS cd
          WHERE cd.contract_id = ${contractId}
        ) AS projdel)`,
      }
    );
  }

  return pickerOptions;
};

/**
 * Gets client coding query additions.
 *
 * @param   {int}    id The project id.
 * @returns {string}
 */
const getClientCodingQueryAdditions = (id) => {
  let query = `ORDER BY client_coding.program_area`;
  if (Number(id) > 0) {
    query = `
      WHERE project_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY client_coding.program_area
      `;
  }
  return query;
};

/**
 * Gets contract resource query additions.
 *
 * @param   {int}    id The contract id.
 * @returns {string}
 */
const getContractResourceQueryAdditions = (id) => {
  let query = `
    LEFT JOIN data.resource AS r on contract_resource.resource_id = r.id
    ORDER BY label ASC
    `;
  if (Number(id) > 0) {
    query = `
      LEFT JOIN data.resource AS r on contract_resource.resource_id = r.id
      WHERE contract_resource.contract_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

/**
 * Gets contract deliverable query additions.
 *
 * @param   {int}    id The contract id.
 * @returns {string}
 */
const getContractDeliverableQueryAdditions = (id) => {
  let query = `ORDER BY label ASC`;
  if (Number(id) > 0) {
    query = `
      WHERE contract_deliverable.contract_id = ${Number(id)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

/**
 * Gets contract deliverable query additions.
 *
 * @param   {int}    projectId The project id.
 * @returns {string}
 */
const getProjectDeliverablesQueryAdditions = (projectId) => {
  let query = `WHERE project_deliverable.deliverable_name IS NOT NULL`;
  if (Number(projectId) > 0) {
    query = `
      WHERE project_deliverable.project_id = ${Number(projectId)}
      GROUP BY label, value
      ORDER BY label ASC
      `;
  }
  return query;
};

const getTableLookups = (projectId, contractId, params) => {
  const unionQueries = [];
  tableLookupValues(projectId, contractId, params).forEach((lookup) => {
    unionQueries.push(knex.pickerOptionSelect(lookup));
  });
  return unionQueries;
};

module.exports = {
  findAll,
  findAllByProject,
  findAllByContract,
};
