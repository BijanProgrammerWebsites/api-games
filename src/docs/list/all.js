function generateDoc(route) {
    return {
        post: {
            tags: [route],
            description: 'Get all games in the list',
            operationId: `${route}PostAll`,
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                    example:
                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY1ODg4Mjc3Mn0._eFaFDUrI4JL5NS-d6f0J0dTgTyu51oc6AyoS7qHn0U',
                                },
                            },
                            required: ['token'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Games found successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/GameArray',
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
                    description: 'Games not found',
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
}

module.exports = {generateDoc};
