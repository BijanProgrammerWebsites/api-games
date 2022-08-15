module.exports = {
    post: {
        tags: ['user'],
        description: "Changes user's password",
        operationId: 'userPostChangePassword',
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
                            currentPassword: {
                                type: 'string',
                                example: '1234',
                            },
                            newPassword: {
                                type: 'string',
                                example: '5678',
                            },
                        },
                        required: ['token', 'currentPassword', 'newPassword'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: "User's password changed successfully",
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
