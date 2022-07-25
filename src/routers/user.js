const express = require('express');
const {alter, auth, register, login, one} = require('../controllers/user-controller');

const router = express.Router();

router.get('/one/:id', one);

router.post('/auth', auth);
router.post('/register', register);
router.post('/login', login);
router.post('/alter', alter);

module.exports = router;
