export default {
    post: {
        tags: ['user'],
        description: 'Checks to see if user has been logged in',
        operationId: 'userGetAuth',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            token: {
                                type: 'string',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjI3OTEyNzAwfQ.92gveaQ9UGZEEi5epNrhg-2MldXUk9MaI09vUZvCKtU',
                            },
                        },
                        required: ['token'],
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'User is logged in',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/idObject',
                        },
                    },
                },
            },
            401: {
                description: 'Authentication failed',
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
