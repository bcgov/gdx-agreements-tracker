const useController = require("@controllers/useController");
const model = require("@models/projects/contacts");
const what = { single: "project contact", plural: "project contacts" };
const controller = useController(model, what, "projects");
const projectsModel = require("@models/projects");

/**
 * Update an item by ID. Use passed info from the request body.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.updateContacts = async (request, reply) => {
  const projectId = Number(request.params.id)
  try {
    let contactsFormatted = [];
    for (const [key, contactsRaw] of Object.entries(request.body)) {
      if (contactsRaw?.value) {
        contactsFormatted.push({
          contact_role: 6, // 6 is the id for the project manager role.
          projectId,
          contact_id: contactsRaw.value,
        });
      } else {
        contactsRaw?.map((row) => {
          contactsFormatted.push({
            contact_role: Number(key),
            projectId,
            contact_id: row.value,
          });
        });
      }
    }
    const projectManager = contactsFormatted.find((contact) => 6 === contact.contact_role); // find the project manager contact using the id for the project manager role.
    if (projectManager) {
      await projectsModel.updateOne(
        {
          project_manager: projectManager.contact_id,
        },
        projectId
      );
    }
    const result = await model.updateOne(contactsFormatted, projectId);
    return result || controller.noQuery(reply, `The ${what.single} could not be updated.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
