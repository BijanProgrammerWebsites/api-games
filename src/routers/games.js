const express = require('express');
const {search, one} = require('../controllers/games-controller');

const router = express.Router();

router.get('/one/:id', one);
router.post('/search', search);

module.exports = router;
