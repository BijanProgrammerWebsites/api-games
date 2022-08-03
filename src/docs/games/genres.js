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
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 5,
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'Shooter',
                                    },
                                },
                            },
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
