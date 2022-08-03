module.exports = {
    get: {
        tags: ['game'],
        description: 'Get one game with id',
        operationId: 'gameGetOne',
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'number',
                    example: 25076,
                },
                required: true,
            },
        ],
        responses: {
            200: {
                description: 'Game found successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Game',
                        },
                    },
                },
            },
            400: {
                description: 'Bad request',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                    },
                },
            },
            404: {
                description: 'Game not found',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
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
