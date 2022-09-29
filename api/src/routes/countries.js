const { Router } = require('express')
const { Country, Activity } = require('../db')
const router = Router()
const axios = require('axios')
const { Op } = require('sequelize')
const {getCountry, getById} = require('../controllers/countries.controller.js')

// get a -> http://localhost:3001/countries/
router.get('/', getCountry)

// get a -> http://localhost:3001/countries/:id
router.get('/:id', getById)


module.exports = router
