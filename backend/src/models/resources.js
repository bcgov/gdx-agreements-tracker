const DatabaseConnection = require("../database/databaseConnection");
const dbConnection = new DatabaseConnection();
const db = dbConnection.knex;

const table = `${dbConnection.dataBaseSchemas().data}.resource`;
const supplierTable = `${dbConnection.dataBaseSchemas().data}.supplier`;
const subcontractorTable = `${dbConnection.dataBaseSchemas().data}.subcontractor`;

/**
 * Gets all the resources.
 *
 * @returns {object}
 */
const findAll = () => {
  return db
    .select(
      "resource.id",
      "resource.resource_last_name as Last Name",
      "resource.resource_first_name as First Name",
      "supplier.supplier_name as Supplier",
      "subcontractor.subcontractor_name as Subcontractor",
      db.raw("TO_CHAR(resource.created_date :: DATE, 'dd-MON-yyyy') as created_date")
    )
    .from(table)
    .leftJoin(supplierTable, { "resource.supplier_id": `${supplierTable}.id` })
    .leftJoin(subcontractorTable, { "resource.subcontractor_id": `${subcontractorTable}.id` });
};

/**
 * Gets a specific resource by id.
 *
 * @param   {integer} id The id of the resource to get.
 * @returns {object}
 */
const findById = (id) => {
  return db
    .select(
      "resource.id",
      "resource.resource_last_name",
      "resource.resource_first_name",
      db.raw(
        "(SELECT json_build_object('value', COALESCE(resource.supplier_id,0), 'label', COALESCE(supplier.supplier_name,''))) AS supplier_id"
      ),
      db.raw(
        "(SELECT json_build_object('value', COALESCE(resource.subcontractor_id,0), 'label', COALESCE(subcontractor.subcontractor_name,''))) AS subcontractor_id"
      ),
      db.raw("TO_CHAR(resource.created_date :: DATE, 'dd-MON-yyyy') as created_date_formatted"),
      "resource.created_date"
    )
    .from(table)
    .leftJoin(supplierTable, { "resource.supplier_id": `${supplierTable}.id` })
    .leftJoin(subcontractorTable, { "resource.subcontractor_id": `${subcontractorTable}.id` })
    .where("resource.id", id);
};

/**
 * Updates a resource based on the id.
 *
 * @param   {object}  body The object to update.
 * @param   {integer} id   The id of the resource to update.
 * @returns {object}
 */
const updateOne = (body, id) => {
  return db(table).where("id", id).update(body);
};

/**
 * Adds a new resource.
 *
 * @param   {object} newResource The object of the new resource.
 * @returns {object}
 */
const addOne = (newResource) => {
  return db(table).insert(newResource);
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
