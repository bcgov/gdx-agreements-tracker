const useSingleSignOn = require("../useSingleSignOn/index.js");
require("dotenv").config({ path: ".env" });

const controller = useSingleSignOn();

const { SINGLE_SIGN_ON_INTEGRATION_ID, SINGLE_SIGN_ON_ENVIRONMENT } = process.env;

/**
 * Get a dictionary of supported input template file types and output file types.
 *
 * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
 * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
 * @returns {object}
 */
controller.getUsers = async (request, reply) => {
  // Using Axios to call api endpoint with Bearer token
  const allRoles = await controller.api.get(
    `/integrations/${SINGLE_SIGN_ON_INTEGRATION_ID}/${SINGLE_SIGN_ON_ENVIRONMENT}/roles`
  );
  const compositeRoles = allRoles.filter((roleDetails) => true === roleDetails.composite);
  const response = await Promise.all(
    compositeRoles.map(async (role) => {
      const usersByRole = await controller.api.get(
        `/integrations/${SINGLE_SIGN_ON_INTEGRATION_ID}/${SINGLE_SIGN_ON_ENVIRONMENT}/roles/${role.name}/users`
      );
      return usersByRole.map(({ firstName, lastName, email }) => {
        return {
          firstName,
          role: role.name,
          lastName,
          email,
          id: Math.random(),
        };
      });
    })
  );
  return [].concat(...response);
};

module.exports = controller;
