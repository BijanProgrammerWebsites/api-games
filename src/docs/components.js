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
            Game: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 25076,
                    },
                    cover: {
                        $ref: '#/components/schemas/Image',
                        example: {
                            id: 'co1q1f',
                            width: 600,
                            height: 800,
                        },
                    },
                    releaseDate: {
                        type: 'number',
                        example: 1540512000000,
                    },
                    genres: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        example: ['Shooter', 'Role-playing (RPG)', 'Adventure'],
                    },
                    name: {
                        type: 'string',
                        example: 'Red Dead Redemption 2',
                    },
                    platforms: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        example: ['PC (Microsoft Windows)', 'PlayStation 4', 'Xbox One', 'Google Stadia'],
                    },
                    rating: {
                        type: 'number',
                        example: 92.36,
                    },
                    ratingCount: {
                        type: 'number',
                        example: 1422,
                    },
                    screenshots: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Image',
                        },
                        example: [
                            {
                                id: 'xegpfnsvlyeld0zkjnrc',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'c9xalka7stjkx4mes7kp',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'qg7gx276z3hsqlr9xpt6',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'x8xczj2a0y6g9rnhboko',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'dhw6ucx9laj5esv6rngn',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'h8f9uojkzvaau8pxsyxi',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'tdxv4zzkqyjnm9pmwxw0',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'kcfpf8wa8esalk0qkpo5',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'uyaminfh8sugglvt247u',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'banftd8fgfytbsfx6mjz',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'dorsz0jbcecmkxvzi3t8',
                                width: 1920,
                                height: 1080,
                            },
                            {
                                id: 'mptosgjarjlyqxy7lqsm',
                                width: 1920,
                                height: 1080,
                            },
                        ],
                    },
                    storyline: {
                        type: 'string',
                        example:
                            'America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed.\n\nAfter a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.',
                    },
                    summary: {
                        type: 'string',
                        example:
                            'Red Dead Redemption 2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age.',
                    },
                },
            },
            GameArray: {
                type: 'object',
                properties: {
                    games: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Game',
                        },
                    },
                },
            },
            Image: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'co1q1f',
                    },
                    width: {
                        type: 'number',
                        example: 600,
                    },
                    height: {
                        type: 'number',
                        example: 800,
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
