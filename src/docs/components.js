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
                    ageRatings: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number',
                                    example: 23550,
                                },
                                category: {
                                    type: 'number',
                                    example: 1,
                                },
                                rating: {
                                    type: 'number',
                                    example: 11,
                                },
                            },
                        },
                        example: [
                            {
                                id: 23550,
                                category: 1,
                                rating: 11,
                            },
                            {
                                id: 26094,
                                category: 2,
                                rating: 5,
                            },
                        ],
                    },
                    cover: {
                        $ref: '#/components/schemas/Image',
                        example: {
                            id: 'co1q1f',
                            width: 600,
                            height: 800,
                        },
                    },
                    gameModes: {
                        $ref: '#/components/schemas/Items',
                        example: [
                            {
                                id: 1,
                                name: 'Single player',
                            },
                            {
                                id: 2,
                                name: 'Multiplayer',
                            },
                            {
                                id: 3,
                                name: 'Co-operative',
                            },
                        ],
                    },
                    genres: {
                        $ref: '#/components/schemas/Items',
                        example: [
                            {
                                id: 5,
                                name: 'Shooter',
                            },
                            {
                                id: 12,
                                name: 'Role-playing (RPG)',
                            },
                            {
                                id: 31,
                                name: 'Adventure',
                            },
                        ],
                    },
                    involvedCompanies: {
                        $ref: '#/components/schemas/InvolvedCompanies',
                        examples: [
                            {
                                id: 40855,
                                company: {
                                    id: 139,
                                    country: 840,
                                    description:
                                        'Headquartered in New York City, Take-Two Interactive Software, Inc. is a leading developer, marketer and publisher of interactive entertainment for consumers around the globe. The Company develops and publishes products through its two wholly-owned labels Rockstar Games and 2K. Our products are designed for console systems, handheld gaming systems and personal computers, including smartphones and tablets, and are delivered through physical retail, digital download, online platforms and cloud streaming services. The Company’s common stock is publicly traded on NASDAQ under the symbol TTWO.',
                                    logo: {
                                        id: 37,
                                        height: 358,
                                        image_id: 'aqtxrprtkcftl7m8yn0t',
                                        width: 500,
                                    },
                                    name: 'Take-Two Interactive',
                                    url: 'https://www.igdb.com/companies/take-two-interactive',
                                    websites: [
                                        {
                                            id: 784,
                                            category: 1,
                                            trusted: false,
                                            url: 'http://www.take2games.com/',
                                        },
                                    ],
                                },
                                developer: false,
                                porting: false,
                                publisher: true,
                                supporting: false,
                            },
                            {
                                id: 98112,
                                company: {
                                    id: 29,
                                    country: 840,
                                    logo: {
                                        id: 6,
                                        height: 1840,
                                        image_id: 'wcqgg7udjjtzxjsqfnfi',
                                        width: 2000,
                                    },
                                    name: 'Rockstar Games',
                                    url: 'https://www.igdb.com/companies/rockstar-games',
                                    websites: [
                                        {
                                            id: 401,
                                            category: 1,
                                            trusted: false,
                                            url: 'http://www.rockstargames.com/',
                                        },
                                        {
                                            id: 4311,
                                            category: 1,
                                            trusted: false,
                                            url: 'https://www.rockstargames.com',
                                        },
                                    ],
                                },
                                developer: true,
                                porting: false,
                                publisher: true,
                                supporting: false,
                            },
                        ],
                    },
                    keywords: {
                        $ref: '#/components/schemas/Items',
                        example: [
                            {
                                id: 7,
                                name: 'cowboys',
                            },
                            {
                                id: 9,
                                name: 'western',
                            },
                            {
                                id: 623,
                                name: 'horse',
                            },
                        ],
                    },
                    name: {
                        type: 'string',
                        example: 'Red Dead Redemption 2',
                    },
                    platforms: {
                        $ref: '#/components/schemas/Items',
                        example: [
                            {
                                id: 6,
                                name: 'PC (Microsoft Windows)',
                            },
                            {
                                id: 48,
                                name: 'PlayStation 4',
                            },
                            {
                                id: 49,
                                name: 'Xbox One',
                            },
                            {
                                id: 170,
                                name: 'Google Stadia',
                            },
                        ],
                    },
                    playerPerspectives: {
                        $ref: '#/components/schemas/Items',
                        example: [
                            {
                                id: 1,
                                name: 'First person',
                            },
                            {
                                id: 2,
                                name: 'Third person',
                            },
                        ],
                    },
                    rating: {
                        type: 'number',
                        example: 93,
                    },
                    ratingCount: {
                        type: 'number',
                        example: 1451,
                    },
                    releaseDate: {
                        type: 'number',
                        example: 1540512000000,
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
                    themes: {
                        $ref: '#/components/schemas/Items',
                        example: [
                            {
                                id: 1,
                                name: 'Action',
                            },
                            {
                                id: 31,
                                name: 'Drama',
                            },
                            {
                                id: 38,
                                name: 'Open world',
                            },
                        ],
                    },
                    videos: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Video',
                        },
                        example: [
                            {
                                id: 'HVRzx17WHVk',
                                name: 'Launch Trailer',
                            },
                            {
                                id: 'Dw_oH5oiUSE',
                                name: 'Trailer',
                            },
                            {
                                id: '9_GsrTCslQ4',
                                name: 'Official Trailer 3',
                            },
                        ],
                    },
                    websites: {
                        $ref: '#/components/schemas/Websites',
                        example: [
                            {
                                id: 50776,
                                category: 1,
                                trusted: false,
                                url: 'https://www.rockstargames.com/reddeadredemption2/',
                            },
                            {
                                id: 50777,
                                category: 2,
                                trusted: false,
                                url: 'http://reddead.wikia.com/wiki/Red_Dead_Redemption_2',
                            },
                            {
                                id: 50778,
                                category: 3,
                                trusted: true,
                                url: 'https://en.wikipedia.org/wiki/Red_Dead_Redemption_2',
                            },
                        ],
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
            Video: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: 'HVRzx17WHVk',
                    },
                    name: {
                        type: 'string',
                        example: 'Launch Trailer',
                    },
                },
            },
            Items: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            example: 5,
                        },
                        name: {
                            type: 'string',
                            example: 'Shooter',
                        },
                    },
                },
            },
            Company: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 139,
                    },
                    country: {
                        type: 'number',
                        example: 840,
                    },
                    description: {
                        type: 'string ',
                        example:
                            'Headquartered in New York City, Take-Two Interactive Software, Inc. is a leading developer, marketer and publisher of interactive entertainment for consumers around the globe. The Company develops and publishes products through its two wholly-owned labels Rockstar Games and 2K. Our products are designed for console systems, handheld gaming systems and personal computers, including smartphones and tablets, and are delivered through physical retail, digital download, online platforms and cloud streaming services. The Company’s common stock is publicly traded on NASDAQ under the symbol TTWO.',
                    },
                    logo: {
                        $ref: '#/components/schemas/Image',
                    },
                    name: {
                        type: 'string',
                        example: 'Take-Two Interactive',
                    },
                    url: {
                        type: 'string',
                        example: 'https://www.igdb.com/companies/take-two-interactive',
                    },
                    websites: {
                        $ref: '#/components/schemas/Websites',
                    },
                },
            },
            InvolvedCompanies: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            example: 40855,
                        },
                        developer: {
                            type: 'boolean',
                            example: false,
                        },
                        porting: {
                            type: 'boolean',
                            example: false,
                        },
                        publisher: {
                            type: 'boolean',
                            example: true,
                        },
                        supporting: {
                            type: 'boolean',
                            example: false,
                        },
                        company: {
                            $ref: '#/components/schemas/Company',
                        },
                    },
                },
            },
            Website: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        example: 784,
                    },
                    category: {
                        type: 'number',
                        example: 1,
                    },
                    trusted: {
                        type: 'boolean',
                        example: false,
                    },
                    url: {
                        type: 'string',
                        example: 'https://www.igdb.com/companies/take-two-interactive',
                    },
                },
            },
            Websites: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Website',
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
