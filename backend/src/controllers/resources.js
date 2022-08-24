const Model = require("../models/resources.js");
const what = { single: "resource", plural: "resources" };
const { failedQuery, noQuery, userRequires } = require("./admin_form");

/**
 * Get all resources.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  let output;
  userRequires(request, what, "admin_form_read_all");
  try {
    const result = await Model.findAll();
    output = result || [];
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Get a specific resource by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getOne = async (request, reply) => {
  userRequires(request, what, "admin_form_read_all");
  let output;
  const targetId = Number(request.params.id);
  try {
    const result = await Model.findById(targetId);
    output =
      !result || !result.length
        ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
        : result[0];
  } catch (err) {
    failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Update a resource by ID. Use passed info from the request body.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const updateOne = async (request, reply) => {
  userRequires(request, what, "admin_form_update_all");
  let output;
  try {
    const result = await Model.updateOne(request.body, request.params.id);
    output = result || noQuery(reply, `The ${what.single} could not be updated.`);
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

/**
 * Add a resource based on request body info.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */

const addOne = async (request, reply) => {
  userRequires(request, what, "admin_form_update_all");
  let output;
  try {
    /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
    // todo: autogenerate resource_id (fixing schema/using code)
    // todo: autogenerate created_date (fixing schema/using code)
    request.body.resource_id = 0;
    const result = await Model.addOne(request.body);
    output = result || noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    output = failedQuery(reply, err, what);
  }
  return output;
};

module.exports = {
  getAll,
  getOne,
  updateOne,
  addOne,
};
