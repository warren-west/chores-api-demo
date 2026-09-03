const router = require('express').Router()

// a route that crashes the instance
router.get('/', () => {
    throw new Error('App intentionally crashed. 💀')
})

router.get('/exit', () => {
    process.exit(1)
})

router.get('/name', () => {
    firstName = "warren"
})

module.exports = router