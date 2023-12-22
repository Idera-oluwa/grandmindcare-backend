const express = require('express')
const {createUser, getUser,deleteUser} = require('../controllers/register')

const router = express.Router()

router.route('/').post(createUser).get(getUser)
router.route('/:id').delete(deleteUser)

module.exports = router;