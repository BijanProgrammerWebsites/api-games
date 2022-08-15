const express = require('express');
const {
    one,
    genres,
    platforms,
    gameModes,
    playerPerspectives,
    themes,
    upcoming,
    search,
    banners,
} = require('../controllers/games-controller');

const router = express.Router();

router.get('/one/:id', one);
router.get('/genres', genres);
router.get('/platforms', platforms);
router.get('/game-modes', gameModes);
router.get('/player-perspectives', playerPerspectives);
router.get('/themes', themes);
router.get('/upcoming', upcoming);
router.post('/search', search);

router.get('/banners', banners);

module.exports = router;
