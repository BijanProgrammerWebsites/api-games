const GENRES = {
    2: {name: 'Point-and-click'},
    4: {name: 'Fighting'},
    5: {name: 'Shooter'},
    7: {name: 'Music'},
    8: {name: 'Platform'},
    9: {name: 'Puzzle'},
    10: {name: 'Racing'},
    11: {name: 'Real Time Strategy (RTS)'},
    12: {name: 'Role-playing (RPG)'},
    13: {name: 'Simulator'},
    14: {name: 'Sport'},
    15: {name: 'Strategy'},
    16: {name: 'Turn-based strategy (TBS)'},
    24: {name: 'Tactical'},
    25: {name: "Hack and slash/Beat 'em up"},
    26: {name: 'Quiz/Trivia'},
    30: {name: 'Pinball'},
    31: {name: 'Adventure'},
    32: {name: 'Indie'},
    33: {name: 'Arcade'},
    34: {name: 'Visual Novel'},
    35: {name: 'Card & Board Game'},
    36: {name: 'MOBA'},
};

const GENRES_ARRAY = Object.entries(GENRES).map(([id, info]) => ({id: +id, ...info}));

module.exports = {GENRES, GENRES_ARRAY};
