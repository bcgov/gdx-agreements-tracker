const getOneValidator = {
    // Request parameters.
    params: {
        id: { type: 'string' }
    },
    // Response validation. 
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    id: { type: 'integer' },
                    name: { type: 'string' }
                },
                permission: { type: 'string' },
                user: { }
            }
        }
    }
}

module.exports = {
  getOneValidator
}
