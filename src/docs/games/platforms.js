module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all platforms',
        operationId: 'gameGetPlatforms',
        responses: {
            200: {
                description: 'Platforms found successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 6,
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'PC (Microsoft Windows)',
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
