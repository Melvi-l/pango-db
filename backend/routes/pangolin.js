const express = require('express')
const router = express.Router()

const authMiddleware = require('../auth_middleware');
router.use(authMiddleware)

module.exports = router
