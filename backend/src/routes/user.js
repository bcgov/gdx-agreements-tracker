const userController = require('../controllers/user');
const userValidators = require('../validators/user');

const routes = [
    {
        method: 'GET',
        url: '/user',
        handler: userController.getAll
    },
    {
        method: 'GET',
        url: '/user/:id',
        schema: userValidators.getUserValidator,
        handler: userController.getUser
    },
    {
        method: 'POST',
        url: '/user',
        handler: userController.addUser
    },
    {
        method: 'PUT',
        url: '/user/:id',
        handler: userController.updateUser
    },
    {
        method: 'DELETE',
        url: '/user/:id',
        handler: userController.deleteUser
    }
];

const userRoutes = (fastify, options, done) => {
    // Register all the user routes.
    routes.forEach(route => fastify.route(route));
    done();
}

module.exports = userRoutes;
