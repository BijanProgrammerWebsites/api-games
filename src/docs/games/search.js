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
                                example: 'red dead',
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
                                    gameModes: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [2, 3],
                                    },
                                    genres: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [5, 12],
                                    },
                                    keywords: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [7, 9, 623],
                                    },
                                    platforms: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [6, 48],
                                    },
                                    playerPerspectives: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [1, 2],
                                    },
                                    themes: {
                                        type: 'array',
                                        items: {
                                            type: 'number',
                                        },
                                        example: [1, 38],
                                    },
                                    minimumRating: {
                                        type: 'number',
                                        example: 23,
                                    },
                                    maximumRating: {
                                        type: 'number',
                                        example: 99,
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
