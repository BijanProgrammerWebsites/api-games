export default {
    post: {
        tags: ['user'],
        description: "Logs the user in; At least one of the 'username' or 'email' fields has to be present",
        operationId: 'userPostLogin',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            username: {
                                type: 'string',
                                example: 'BijanProgrammer',
                            },
                            email: {
                                type: 'string',
                                example: 'bijaneisapour@gmail.com',
                            },
                            password: {
                                type: 'string',
                                example: '1234',
                            },
                        },
                        required: ['password'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'User logged in successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/tokenObject',
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
