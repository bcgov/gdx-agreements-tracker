const useController = require("@controllers/useController");
const model = require("@models/projects/closeout");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);
const useCommonComponents = require("../useCommonComponents/index.js");

/**
 * Sends notification email when a project is closed out.
 *
 * @todo This should send email via CHES API. Also needs email content.
 * @see https://bcgov.github.io/common-service-showcase/services/ches.html
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.notify = async (request, reply) => {
  const commonComponentsController = useCommonComponents("ches");
  // Record whether the user can edit the closeout table
  // and add it to the result object.

  // const user = await getUserInfo(request)
  try {
    const message = {
      // TODO these will be updated in future tickets
      bodyType: "text", //"text" || "html"  This is the format of the email, can be text or html
      body: "Placeholder", //string The Body of the email
      from: "Placeholder", //string The From Email
      subject: "Placeholder", //string The subject of the email
      to: ["Placeholder"], //string[] The to Email(s) in an array
    };
    const response = await commonComponentsController.api.post("/email", message);
    return response;

    // return !result ? controller.noQuery(reply, `Notification could not be sent.`) : result;
  } catch (err) {
    console.error("err", err);
    return controller.failedQuery(reply, err, what);
  }
};

/**
 * Get a specific item by ID.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getOneById = async (request, reply) => {
  const targetId = Number(request.params.id);
  try {
    const result = await model.findById(targetId);

    if (result) {
      return result;
    } else {
      return controller.noQuery(reply, `The ${what.single} with the specified id does not exist.`);
    }
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
