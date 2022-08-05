module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all game modes',
        operationId: 'gameGetGameModes',
        responses: {
            200: {
                description: 'Game modes found successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 3,
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'Co-operative',
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
