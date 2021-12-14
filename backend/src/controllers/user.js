// Dummy data
const users = [
    {
        id: 1,
        name: 'Alex'
    },
    {
        id: 2,
        name: 'Shawn'
    },
    {
        id: 3,
        name: 'Craig'
    },
    {
        id: 4,
        name: 'Adam'
    }
]

/**
 * Get all users.
 * 
 * @returns {Array}
 */
const getAll = async () => {
    return users;
}

/**
 * Get a specific user.
 * 
 * @param {*} req 
 * @returns {Object}
 */
const getUser = async (req) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return user;
}

/**
 * 
 * @param {*} req 
 * @returns {Object}
 */
const addUser = async (req) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    }

    return newUser;
}

/**
 * 
 * @param {*} req 
 * @returns {Object}
 */
const updateUser = async (req) => {
    const updatedUser = {
        id: Number(req.params.id),
        name: req.body.name
    }

    return updatedUser;
}

/**
 * 
 * @param {*} req 
 * @returns {Object}
 */
const deleteUser = async (req) => {
    return { msg: `Deleted user with ID ${req.params.id}` };
}

module.exports = {
    getAll,
    getUser,
    addUser,
    updateUser,
    deleteUser
}
