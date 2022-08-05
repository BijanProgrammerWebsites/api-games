module.exports = {
    post: {
        tags: ['game'],
        description: 'Searches for the games that contain searchPhrase',
        operationId: 'gamePostSearch',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            searchPhrase: {
                                type: 'string',
                                example: 'Red Dead',
                            },
                            pageSize: {
                                type: 'number',
                                example: 5,
                            },
                            offset: {
                                type: 'number',
                                example: 0,
                            },
                            sort: {
                                type: 'number',
                                enum: [0, 1, 2, 3, 4],
                                example: 2,
                            },
                            filters: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'boolean',
                                        nullable: true,
                                        example: true,
                                    },
                                    genres: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [5],
                                    },
                                    platforms: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [6],
                                    },
                                    gameModes: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [3],
                                    },
                                    minimumRating: {
                                        type: 'number',
                                        example: 23,
                                    },
                                    maximumRating: {
                                        type: 'number',
                                        example: 90,
                                    },
                                },
                            },
                        },
                        required: [],
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'List of found games',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/gameArray',
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
