const useController = require("../useController/index.js");
const what = { single: "glossary", plural: "glossary" };
const controller = useController(null, what);
const path = require("path");
const fs = require("fs");

/**
 * Get all glossary terms. Uses fastify-markdown plugin to parse glossary markdown into HTML.
 *
 * @see https://github.com/freezestudio/fastify-markdown
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
const getAll = async (request, reply) => {
  controller.userRequires(request, "PMO-Manager-Edit-Capability", reply);

  try {
    const stream = fs.createReadStream(
      path.join(__dirname, "..", "..", "..", "docs", "Glossary", "Glossary.html"),
      "utf8"
    );
    const result = await reply.header("Content-Type", "application/octet-stream").send(stream);
    return result;
  } catch (err) {
    return controller.failedQuery(reply, err, what);
  }
};

module.exports = { getAll };
