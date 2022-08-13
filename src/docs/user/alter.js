module.exports = {
    post: {
        tags: ['user'],
        description: "Changes user's info; At least one field is required",
        operationId: 'userPostAlter',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            token: {
                                type: 'string',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYwMzY3NjAyfQ.bBsG3w_tmAfMUGQCNMrbkfZteozxfpL3eq03WlJ_FSA',
                            },
                            username: {
                                type: 'string',
                                example: 'Test',
                            },
                            password: {
                                type: 'string',
                                example: '5678',
                            },
                            email: {
                                type: 'string',
                                example: 'test@gmail.com',
                            },
                            phone: {
                                type: 'string',
                                example: '00989876543210',
                            },
                            firstName: {
                                type: 'string',
                                example: 'یارو',
                            },
                            lastName: {
                                type: 'string',
                                example: 'فلانی',
                            },
                            gender: {
                                type: 'boolean',
                                example: true,
                            },
                            dateOfBirth: {
                                type: 'date',
                                example: '2021-08-04',
                            },
                            avatar: {
                                type: 'string',
                                example: 'base64',
                            },
                            credit: {
                                type: 'number',
                                example: 2147483647,
                            },
                        },
                        required: ['token'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: "User's info changed successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
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
