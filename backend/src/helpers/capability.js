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
 * @todo Add tests once methods are more defined for use.
 *
 * @return  {Array}        An array of the capabilities a role has.
 */
const getCapability = (role) => {
  let capability = []
  switch (role) {
    case 'admin':
      capability = capability.concat(roleAdmin)
    case 'manager':
      capability = capability.concat(roleManager)
    case 'gdx':
      capability = capability.concat(roleGdx) 
    case 'subscriber':
      capability = capability.concat(roleSubscriber)
    case 'none':
      capability = capability.concat(roleNone)
      break;
    default:
      break;
  }
  return capability;
}

/**
 * The capabilities for admin.
 *
 * @var {Array}
 */
const roleAdmin =  [
  'users_create_all',
  'users_read_all',
  'users_update_all',
  'users_delete_all',
]

/**
 * The capabilities for manager.
 *
 * @var {Array}
 */
const roleManager = []

/**
 * The capabilities for gdx.
 *
 * @var {Array}
 */

const roleGdx = [
  'reports_read_all'
]

/**
 * The capabilities for subscriber.
 *
 * @var {Array}
 */
const roleSubscriber = [
  'users_read_mine'
]

/**
 * The capabilities for none.
 *
 * @var {Array}
 */
const roleNone = [

]


module.exports = {
    getCapability
}