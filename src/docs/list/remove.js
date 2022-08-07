function generateDoc(route) {
    return {
        delete: {
            tags: [route],
            description: 'Remove game from the list',
            operationId: `${route}DeleteRemove`,
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
                    description: 'Game successfully removed from the list',
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
                    description: 'Game not found in the list',
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
