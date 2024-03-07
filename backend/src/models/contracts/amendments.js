const dbConnection = require("@database/databaseConnection");
const { knex, dataBaseSchemas } = dbConnection();
const contractAmendmentTable = `${dataBaseSchemas().data}.contract_amendment`;
const contractAmendmentTypeTable = `${dataBaseSchemas().data}.contract_amendment_amendment_type`;

// Get all.
const findAll = (contractId) => {
  return knex("data.contract_amendment as cam")
    .select(
      knex.raw("jsonb_agg(amt.amendment_type_name) AS amendment_types"),
      "cam.amendment_number",
      "cam.amendment_date",
      "cam.description",
      "cam.id"
    )
    .leftJoin(
      "data.contract_amendment_amendment_type as caat",
      "cam.id",
      "caat.contract_amendment_id"
    )
    .leftJoin("data.amendment_type as amt", "caat.amendment_type_id", "amt.id")
    .where("cam.contract_id", contractId)
    .groupBy("cam.amendment_number", "cam.amendment_date", "cam.description", "cam.id");
};

// Get specific one by id.
const findById = (contractId, amendmentId) => {
  return knex("data.contract_amendment as cam")
    .select(
      knex.raw(
        "jsonb_agg(jsonb_build_object('value', amt.id, 'label', amt.amendment_type_name)) AS amendment_types"
      ),
      "cam.amendment_number",
      "cam.amendment_date",
      "cam.description",
      { id: amendmentId }
    )
    .leftJoin(
      "data.contract_amendment_amendment_type as caat",
      "cam.id",
      "caat.contract_amendment_id"
    )
    .leftJoin("data.amendment_type as amt", "caat.amendment_type_id", "amt.id")
    .where("cam.contract_id", contractId)
    .where("cam.id", amendmentId)
    .groupBy("cam.amendment_number", "cam.amendment_date", "cam.description")
    .first();
};

// Update one.
const updateOne = (updatedContractAmendment, id) => {
  const { amendment_types, ...body } = updatedContractAmendment;
  // Array to store promises
  const promises = [];
  // Delete existing records
  promises.push(knex(contractAmendmentTypeTable).where("contract_amendment_id", id).del());
  // Insert new records if 'types' is present
  if (amendment_types) {
    for (const amendment_type of amendment_types) {
      promises.push(
        knex(contractAmendmentTypeTable).insert({
          contract_amendment_id: id,
          amendment_type_id: Number(amendment_type.value),
        })
      );
    }
  }

  // Update 'request' if it is present
  if (Object.keys(body).length > 0) {
    promises.push(knex(contractAmendmentTable).where("id", id).update(body));
  }

  // Return a promise that resolves when all promises in the array resolve
  return Promise.all(promises);
};

// Add one.
const addOne = async (newContractAmendment) => {
  const { amendment_types, ...body } = newContractAmendment;
  const promises = [];
  try {
    //Get the next amendment number for the amendments related to the passed contract_id
    const result = await knex
      .max("ca.amendment_number")
      .where("ca.contract_id", newContractAmendment.contract_id)
      .from(`${contractAmendmentTable} as ca`);

    const nextAmendmentNumber = result[0].max !== null ? result[0].max + 1 : 1;

    // Insert a record into the contract_amendments table
    promises.push(
      knex(contractAmendmentTable)
        .insert({
          ...body,
          amendment_number: nextAmendmentNumber,
        })
        .returning("id")
        .then((results) => {
          if (amendment_types) {
            for (const amendment_type of amendment_types) {
              promises.push(
                knex(contractAmendmentTypeTable)
                  .insert({
                    contract_amendment_id: results[0].id,
                    amendment_type_id: Number(amendment_type.value),
                  })
                  .then((results) => {
                    return results;
                  })
                  .catch((err) => {
                    return err;
                  })
              );
            }
          }
          return;
        })
    );

    // Insert new records if 'types' is present

    return Promise.all(promises);
  } catch (error) {
    // Handle error
    console.error("Error adding contract amendment:", error);
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  updateOne,
  addOne,
};
