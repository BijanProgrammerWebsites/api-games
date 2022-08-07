function generateDoc(route) {
    return {
        post: {
            tags: [route],
            description: 'Add game to the list',
            operationId: `${route}PostAdd`,
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
                                gameId: {
                                    type: 'number',
                                    example: 25076,
                                },
                            },
                            required: ['token', 'gameId'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Game successfully added to the list',
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
