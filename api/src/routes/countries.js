const { Router } = require('express')
const { Country, Activity } = require('../db')
const router = Router()
const axios = require('axios')
const { Op } = require('sequelize')
const {getCountry, getById} = require('../controllers/countries.controller.js')

router.get('/', getCountry)

router.get('/:id', getById)


module.exports = router
