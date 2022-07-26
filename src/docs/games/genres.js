module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all genres',
        operationId: 'gameGetGenres',
        responses: {
            200: {
                description: 'Genres found successfully',
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
