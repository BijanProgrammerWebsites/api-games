import express from 'express';
import {alter, auth, register, login, one} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/one/:id', one);

router.post('/auth', auth);
router.post('/register', register);
router.post('/login', login);
router.post('/alter', alter);

export default router;
