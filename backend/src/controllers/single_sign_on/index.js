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
controller.getUser = async (request, reply) => {
  // Using Axios to call api endpoint with Bearer token
  const allRoles = await controller.api.get(
    `/integrations/${SINGLE_SIGN_ON_INTEGRATION_ID}/${SINGLE_SIGN_ON_ENVIRONMENT}/roles`
  );
  const compositeRoles = allRoles.filter((roleDetails) => roleDetails.composite);

  // Use Promise.all to wait for all the promises to resolve
  const allUsers = await Promise.all(
    compositeRoles.map(async (role) => {
      const usersByRole = await controller.api.get(
        `/integrations/${SINGLE_SIGN_ON_INTEGRATION_ID}/${SINGLE_SIGN_ON_ENVIRONMENT}/roles/${role.name}/users`
      );
      const selectedUser = usersByRole.find((user) => user.email === request.query.email);
      if (selectedUser) {
        selectedUser.role = role;
        return selectedUser;
      }
    })
  );

  const selectedUsers = allUsers.filter((user) => user); // Filter out undefined values

  const combinedData = selectedUsers.reduce((acc, obj) => {
    const key = "user";
    if (!acc[key]) {
      acc[key] = { ...obj, role: [obj.role.name] };
    } else {
      acc[key].role.push(obj.role.name);
    }
    return acc;
  }, {});

  return combinedData;
};

module.exports = controller;
