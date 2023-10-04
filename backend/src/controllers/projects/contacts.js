const useController = require("@controllers/useController");
const model = require("@models/projects/contacts");
const what = { single: "project contact", plural: "project contacts" };
const controller = useController(model, what, "projects");

/**
 * Update an item by ID. Use passed info from the request body.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.updateContacts = async (request, reply) => {
  let contacts = [];
  for (const [key, value] of Object.entries(request.body)) {
    value.map((row) => {
      contacts.push({
        contact_role: Number(key),
        project_id: Number(request.params.id),
        contact_id: row.value,
      });
    });
  }

  try {
    const result = await model.updateOne(contacts, Number(request.params.id));
    return result || controller.noQuery(reply, `The ${what.single} could not be updated.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
