module.exports = {
    get: {
        tags: ['user'],
        description: 'Get one user with id',
        operationId: 'userGetOne',
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'number',
                    example: 23,
                },
                required: true,
            },
        ],
        responses: {
            200: {
                description: 'User found successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UserWithoutPassword',
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
                description: 'User not found',
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
