module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all themes',
        operationId: 'gameGetThemes',
        responses: {
            200: {
                description: 'Themes found successfully',
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
