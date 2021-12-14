const userController = require('../controllers/user');
const userValidators = require('../validators/user');

const routes = [
    {
        method: 'GET',
        url: '/api/user',
        handler: userController.getAll
    },
    {
        method: 'GET',
        url: '/api/user/:id',
        schema: userValidators.getUserValidator,
        handler: userController.getUser
    },
    {
        method: 'POST',
        url: '/api/user',
        handler: userController.addUser
    },
    {
        method: 'PUT',
        url: '/api/user/:id',
        handler: userController.updateUser
    },
    {
        method: 'DELETE',
        url: '/api/user/:id',
        handler: userController.deleteUser
    }
]

module.exports = routes;