const useController = require("@controllers/useController");
const model = require("@models/projects");
const contractsModel = require("@models/contracts/index");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */

controller.getOneWithContracts = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  let output;
  const targetId = Number(request.params.id);
  try {
    const result = await model.findById(targetId);

    if (result) {
      result.contracts = await contractsModel.findByProjectId(targetId);
    }
    output = !result
      ? controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`)
      : result;
  } catch (err) {
    output = controller.failedQuery(reply, err, what);
  }

  return output;
};

/**
 * Add an item based on request body info.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.addNewProject = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);
  try {
    const result = await model.addNewProject();
    return result || controller.noQuery(reply, `The ${what.single} could not be added.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
