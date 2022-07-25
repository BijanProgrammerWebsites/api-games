module.exports = {
    post: {
        tags: ['user'],
        description: 'Registers the user; "firstName" and "lastName" are optional',
        operationId: 'userPostRegister',
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
                            firstName: {
                                type: 'string',
                                example: 'بیژن',
                            },
                            lastName: {
                                type: 'string',
                                example: 'عیسی پور',
                            },
                        },
                        required: ['username', 'email', 'password'],
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'User created successfully',
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
