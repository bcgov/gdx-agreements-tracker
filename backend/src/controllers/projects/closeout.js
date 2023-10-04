const useController = require("@controllers/useController");
const model = require("@models/projects/closeout");
const what = { single: "project", plural: "projects" };
const controller = useController(model, what);

controller.notify = async (request, reply) => {
  try {
    const message = {
      body: "[User/contact X closed out project Y]",
      from: "?",
      subject: "?",
      to: "gax.pmo@gov.bc.ca",
    };
    const result = message;
    return result ? result : controller.noQuery(reply, `Notification could not be sent.`);
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = controller;
