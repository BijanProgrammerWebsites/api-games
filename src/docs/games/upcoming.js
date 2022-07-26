module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all upcoming games',
        operationId: 'gameGetUpcoming',
        responses: {
            200: {
                description: 'Upcoming games found successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GameArray',
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
