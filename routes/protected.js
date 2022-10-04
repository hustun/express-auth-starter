const express = require('express');

const protectedController = require('../controllers/secret');
const { verify } = require('../middlewares/verify');

const router = express.Router();

router.get('/', verify, protectedController.secret);

router.get('/me', verify, protectedController.me);

module.exports = router;
