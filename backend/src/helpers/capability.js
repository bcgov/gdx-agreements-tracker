/**
* This purpose of capability.js is to get a list of capabilities based on role.
* Capability naming conventions {endpoint}_{action}_{who}.
* The endpoint - is the api endpoint name ie users, reports, projects
* The action - is create | read | update | delete (CRUD)
* The who - is mine | all
*/

/**
 * Returns a list of capabilities based on role type of admin | manager | gdx | subscriber | none.
 * Roles are meant to be hierarchical, meaning the admin will have all the capabilities of manager, gdx, subscriber and none.
 * 
 * @param   {string}  role  The role name admin | manager | gdx | subscriber | none.
 * @param   {Array}  realmAccessRoles  An array of the roles from keycloak, at this time should only be [pmo-sys-admin] | [].
 * @todo Add tests once methods are more defined for use.
 *
 * @return  {Array}        An array of the capabilities a role has.
 */
const getCapability = (role, realmAccessRoles) => {
  let capability = []
  if ( realmAccessRoles.includes('pmo-sys-admin') || 'admin' === role ){
    capability = getAdminRoles();
  } else if ('manager' === role){
    capability = getManagerRoles();
  } else if ('gdx' === role) {
    capability = getGdxRoles();
  } else if ('subscriber' === role){
    capability = getSubscriberRoles();
  } else {
    capability = getNoneRoles();
  }
  return capability;
}

/**
 * The capabilities for admin.
 *
 * @return  {Array}
 */
const getAdminRoles = () => {
  const adminRoles = [
    'users_create_all',
    'users_read_all',
    'users_update_all',
    'users_delete_all',
  ];
  return [...adminRoles, ...getManagerRoles(), ...getGdxRoles(), ...getSubscriberRoles(), ...getNoneRoles()];
}


/**
 * The capabilities for manager.
 *
 * @return {Array}
 */
const getManagerRoles = () => {
  const managerRoles = [];
  return [...managerRoles, ...getGdxRoles(), ...getSubscriberRoles(), ...getNoneRoles()];
}

/**
 * The capabilities for gdx.
 *
 * @return {Array}
 */

const getGdxRoles = () =>  {
  const gdxRoles = [
    'reports_read_all'
  ];
  return [...gdxRoles, ...getSubscriberRoles(), ...getNoneRoles()];
}
/**
 * The capabilities for subscriber.
 *
 * @return {Array}
 */
const getSubscriberRoles = () => {
  const subscriberRoles = [
    'users_read_mine'
  ];
  return [...subscriberRoles, ...getNoneRoles()];
}

/**
 * The capabilities for none.
 *
 * @return {Array}
 */
const getNoneRoles = () => {
  const noneRoles = [];
  return noneRoles;
} 


module.exports = {
    getCapability
}