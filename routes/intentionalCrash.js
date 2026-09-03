const router = require('express').Router()

// a route that crashes the instance
router.get('/', () => {
    throw new Error('App intentionally crashed. 💀')
    return
})


module.exports = router