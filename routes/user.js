const { Router } = require('express');
const { helloUser, helloParamQuery, } = require('../controllers/user.js')

const router = Router();

router.get('',helloUser);

router.get('/:id', helloParamQuery);

module.exports = router;