const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const { dateFormat } = require("../../helpers/standards");
const table = `${dataBaseSchemas().data}.resource`;
const supplierTable = `${dataBaseSchemas().data}.supplier`;
const subcontractorTable = `${dataBaseSchemas().data}.subcontractor`;

/**
 * Gets all the resources.
 *
 * @returns {object}
 */
const findAll = () => {
  return knex(`${table} as r`)
    .columns(
      "r.id",
      { last_name: "r.resource_last_name" },
      { first_name: "r.resource_first_name" },
      { supplier: "supplier.supplier_name" },
      { subcontractor: "subcontractor.subcontractor_name" },
      { created_date: knex.raw(`TO_CHAR(r.created_date :: DATE, '${dateFormat}')`) }
    )
    .select()
    .leftJoin(supplierTable, { "r.supplier_id": `${supplierTable}.id` })
    .leftJoin(subcontractorTable, { "r.subcontractor_id": `${subcontractorTable}.id` })
    .orderBy([
      { column: "r.resource_last_name", order: "asc" },
      { column: "r.resource_first_name", order: "asc" },
    ]);
};

/**
 * Gets a specific resource by id.
 *
 * @param   {integer} id The id of the resource to get.
 * @returns {object}
 */
const findById = (id) => {
  return knex
    .select(
      "resource.id",
      "resource.resource_last_name",
      "resource.resource_first_name",
      knex.raw(
        "(SELECT json_build_object('value', COALESCE(resource.supplier_id,0), 'label', COALESCE(supplier.supplier_name,''))) AS supplier_id"
      ),
      knex.raw(
        "(SELECT json_build_object('value', COALESCE(resource.subcontractor_id,0), 'label', COALESCE(subcontractor.subcontractor_name,''))) AS subcontractor_id"
      ),
      knex.raw("TO_CHAR(resource.created_date :: DATE, 'dd-MON-yyyy') as created_date_formatted"),
      "resource.created_date"
    )
    .from(table)
    .leftJoin(supplierTable, { "resource.supplier_id": `${supplierTable}.id` })
    .leftJoin(subcontractorTable, { "resource.subcontractor_id": `${subcontractorTable}.id` })
    .where("resource.id", id)
    .first();
};

/**
 * Updates a resource based on the id.
 *
 * @param   {object}  body The object to update.
 * @param   {integer} id   The id of the resource to update.
 * @returns {object}
 */
const updateOne = (body, id) => {
  return knex(table).where("id", id).update(body);
};

/**
 * Adds a new resource.
 *
 * @param   {object} newResource The object of the new resource.
 * @returns {object}
 */
const addOne = (newResource) => {
  return knex(table).insert(newResource);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
