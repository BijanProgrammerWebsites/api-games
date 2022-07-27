module.exports = {
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 23,
                    },
                    username: {
                        type: 'string',
                        example: 'BijanProgrammer',
                    },
                    password: {
                        type: 'string',
                        example: '1234',
                    },
                    email: {
                        type: 'string',
                        example: 'bijaneisapour@gmail.com',
                    },
                    phone: {
                        type: 'string',
                        example: '00989123456789',
                    },
                    firstName: {
                        type: 'string',
                        example: 'بیژن',
                    },
                    lastName: {
                        type: 'string',
                        example: 'عیسی پور',
                    },
                    gender: {
                        type: 'boolean',
                        example: true,
                    },
                    dateOfBirth: {
                        type: 'string',
                        example: '2001-02-03',
                    },
                    avatar: {
                        type: 'string',
                        example: 'base64',
                    },
                },
            },
            UserWithoutPassword: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 23,
                    },
                    username: {
                        type: 'string',
                        example: 'BijanProgrammer',
                    },
                    password: {
                        type: 'string',
                        example: '1234',
                    },
                    email: {
                        type: 'string',
                        example: 'bijaneisapour@gmail.com',
                    },
                    phone: {
                        type: 'string',
                        example: '00989123456789',
                    },
                    firstName: {
                        type: 'string',
                        example: 'بیژن',
                    },
                    lastName: {
                        type: 'string',
                        example: 'عیسی پور',
                    },
                    gender: {
                        type: 'boolean',
                        example: true,
                    },
                    dateOfBirth: {
                        type: 'string',
                        example: '2001-02-03',
                    },
                    avatar: {
                        type: 'string',
                        example: 'base64',
                    },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Human-readable error message',
                    },
                    trace: {
                        type: 'string',
                        description: 'Stack trace',
                    },
                },
            },
            idObject: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 123,
                    },
                },
            },
            tokenObject: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 123,
                    },
                    token: {
                        type: 'string',
                        example:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY1ODg4Mjc3Mn0._eFaFDUrI4JL5NS-d6f0J0dTgTyu51oc6AyoS7qHn0U',
                    },
                },
            },
        },
    },
};
