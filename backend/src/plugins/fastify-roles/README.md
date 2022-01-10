# Fastify Roles plugin

## Description
The role of this plugin, might change in the future, but it does the following.
* gets the user from the request token
* adds the user to the request object so that the controllers have a user object with capabilities.
* the payload now becomes an object with attributes of 
```
{
    data: payload,
    permission: '{none|read|write}',
    user: {
        role: '{admin|manager|gdx|subscriber|none}, /* This is the database role */
        roles: [ pmo-sys-admin ], /* This is the keycloak role */
        capability: [] /* This is the capabilities determined by the capability.js rules based on the role.
    }
}