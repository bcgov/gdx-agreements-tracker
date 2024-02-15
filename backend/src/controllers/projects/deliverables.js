const useController = require("@controllers/useController");
const model = require("@models/projects/deliverables");
const what = { single: "deliverable", plural: "deliverables" };
const controller = useController(model, what, "projects");

/**
 * Updates one product_deliverable record (by ID) with null dates if the start_date or completion_date are empty strings.
 *
 * @param   {FastifyRequest}  req                      - The request object.
 * @param   {object}          req.body                 - The body of the request.
 * @param   {string}          req.body.start_date      - The start date of the deliverable.
 * @param   {string}          req.body.completion_date - The completion date of the deliverable.
 * @param   {object}          req.params               - The parameters of the request.
 * @param   {string}          req.params.id            - The id of the deliverable to update.
 * @param   {FastifyReply}    reply                    - The reply object.
 * @returns {Promise<object>}                          The result of the add operation, or calls the noQuery or failedQuery methods on the controller.
 * @throws {Error} If there is an error in the query.
 */
controller.updateOneWithNullDates = async ({ body, params }, reply) => {
  const { id: deliverableId } = params;
  const bodyWithNullDates = nullifyDatesIfEmpty(body);

  try {
    const result = await model.updateOne(bodyWithNullDates, deliverableId);
    return result || controller.noQuery(reply, `The ${what.single} could not be updated.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Adds a new record with null dates if the start_date or completion_date is an empty string.
 *
 * @param   {FastifyRequest}  req                      - The request object.
 * @param   {object}          req.body                 - The body of the request.
 * @param   {string}          req.body.start_date      - The start date of the deliverable.
 * @param   {string}          req.body.completion_date - The completion date of the deliverable.
 * @param   {Function}        reply                    - The reply function.
 * @returns {Promise<object>}                          The result of the add operation, or calls the noQuery or failedQuery methods on the controller.
 * @throws {Error} If there is an error in the query.
 */
controller.addOneWithNullDates = async ({ body }, reply) => {
  const bodyWithNullDates = nullifyDatesIfEmpty(body);

  try {
    const result = await model.addOne(bodyWithNullDates);
    return result || controller.noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * This function nullifies the start_date and completion_date in the body if they are empty strings.
 *
 * @function nullifyDatesIfEmpty
 * @param   {object} body                 - The request body object.
 * @param   {string} body.start_date      - The start date of the record.
 * @param   {string} body.completion_date - The completion date of the record.
 * @returns {object}                      The body object with start_date and completion_date nullified if they were empty strings.
 */
const nullifyDatesIfEmpty = (body) => {
  const { start_date, completion_date } = body;
  const nullify = (str) => ("" === str ? null : str);

  return {
    ...body,
    start_date: nullify(start_date),
    completion_date: nullify(completion_date),
  };
};

module.exports = controller;
