module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all player perspectives',
        operationId: 'gameGetPlayerPerspectives',
        responses: {
            200: {
                description: 'Player perspectives found successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Items',
                        },
                    },
                },
            },
            500: {
                description: 'Server error',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                    },
                },
            },
        },
    },
};
