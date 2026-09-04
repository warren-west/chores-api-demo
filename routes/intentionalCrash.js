const router = require('express').Router()

// a route that crashes the instance
router.get('/exit', () => {
    process.exit(1)
})

module.exports = router