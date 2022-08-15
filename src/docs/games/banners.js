module.exports = {
    get: {
        tags: ['game'],
        description: 'Get all banners',
        operationId: 'gameGetBanners',
        responses: {
            200: {
                description: 'Banners found successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: 138949,
                                    },
                                    genres: {
                                        type: 'string',
                                        example: 'ابرقهرمان و اکشن',
                                    },
                                    image: {
                                        type: 'string',
                                        example: '/images/spider-man.webp',
                                    },
                                    name: {
                                        type: 'string',
                                        example: 'Spider-Man',
                                    },
                                    rating: {
                                        type: 'number',
                                        example: 82,
                                    },
                                    releaseDate: {
                                        type: 'number',
                                        example: 2021,
                                    },
                                    sgeLimit: {
                                        type: 'number',
                                        example: 13,
                                    },
                                },
                            },
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
