const express = require('express');
const {all, add, remove} = require('../controllers/list-controller');

const router = express.Router();

router.post('/all', all);
router.post('/add', add);
router.delete('/remove', remove);

module.exports = router;
