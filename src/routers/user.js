const express = require('express');
const {auth, register, login, one, alter, changePassword} = require('../controllers/user-controller');

const router = express.Router();

router.get('/one/:id', one);

router.post('/auth', auth);
router.post('/register', register);
router.post('/login', login);
router.post('/alter', alter);
router.post('/change-password', changePassword);

module.exports = router;
