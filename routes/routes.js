const { Router } = require('express')
const router = Router()

const { get_users, get_user, create_user, update_user, delete_user } = require('./db/users')

router.get('/users', get_users)
router.get('/users/:id', get_user)
router.post('/users', create_user)
router.put('/users/:id', update_user)
router.delete('/users/:id', delete_user)

module.exports = router