const express = require('express');
const {one, genres, platforms, gameModes, upcoming, search} = require('../controllers/games-controller');

const router = express.Router();

router.get('/one/:id', one);
router.get('/genres', genres);
router.get('/platforms', platforms);
router.get('/game-modes', gameModes);
router.get('/upcoming', upcoming);
router.post('/search', search);

module.exports = router;
