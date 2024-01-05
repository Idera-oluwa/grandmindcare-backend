const express = require('express')
const {createApplicant, getApplicant,deleteApplicant} = require('../controllers/applicants')

const router = express.Router()

router.route('/').post(createApplicant).get(getApplicant)
router.route('/:id').delete(deleteApplicant)

module.exports = router;