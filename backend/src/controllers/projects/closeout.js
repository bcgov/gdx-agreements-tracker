const useController = require("@controllers/useController");
const model = require("@models/projects/closeout");
const projectModel = require("@models/projects");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);
const useCommonComponents = require("../useCommonComponents/index.js");
const { getUserInfo } = require("@facilities/keycloak");

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

  const projectID = Number(request.params.id);
  const currentUser = await getUserInfo(request);
  const currentProjectData = await projectModel.findById(projectID);
  console.log("currentProjectData", currentProjectData);
  try {
    const message = {
      bodyType: "html", //"text" || "html"  This is the format of the email, can be text or html
      body: `Good day, please complete project close-out <a href=/projects/${projectID}/close-out></a> to the project in the GDX agreement tracker.`, //string The Body of the email
      from: currentUser.email, //string The From Email
      subject: `Project ${currentProjectData.project_number} close-out.`, //string The subject of the email
      to: [currentProjectData.project_manager_email], //string[] The to Email(s) in an array //TODO need to change to send to project manager email
    };

    console.log('message', message)
    // const response = await commonComponentsController.api.post("/email", message);
    // return response;

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
