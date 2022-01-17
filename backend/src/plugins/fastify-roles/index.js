'use strict'

const fp = require('fastify-plugin')
const { getUserInfo } = require('../../facilities/keycloak')

/**
 * Fastify Roles plugin, that inserts user object into the request object for each api call.
 *
 * @param   {[type]}  fastify  [fastify description]
 * @param   {[type]}  opts     [opts description]
 * @todo Add tests after feature is more stable.
 *
 * @return  {[type]}           [return description]
 */
async function fastifyRoles (fastify, opts) {
  opts = opts || {}
  let permission = 'none' // none || read || write
  //let capability = []
  let user = {}
  fastify.addHook('preSerialization', preSerialization)
  fastify.addHook('onRequest', onRequest)

  /**
   * Fastify hook for onRequest, which basically gets the role from the user, and assigns capabilities.
   *
   * @param   {[type]}  request  [request description]
   * @param   {[type]}  reply    [reply description]
   * @param   {[type]}  done     [done description]
   *
   * @return  {[type]}           [return description]
   */
  function onRequest(request, reply, done){
    user = getUserInfo(request);
    if (user) {
      request.user = user
    }
    done()
  }

  /**
   * Fastify hook for preSerialization, which basically is adding permission and capabilities to the payload.
   * It is also putting the payload under data attribute.
   * This might be a temporary hook, but for now, it is informational in the response.
   *
   * @param   {[type]}  request  [request description]
   * @param   {[type]}  reply    [reply description]
   * @param   {[type]}  payload  [payload description]
   * @param   {[type]}  done     [done description]
   *
   * @return  {[type]}           [return description]
   */
  function preSerialization (request, reply, payload, done) {
    const err = null;
    payload = {
      data: payload,
      permission,
      user,
    }
    done(err, payload)
  }
}



module.exports = fp(fastifyRoles, {
  fastify: '3.x',
  name: 'fastify-roles',
})
