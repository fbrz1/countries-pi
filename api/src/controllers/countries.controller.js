const axios = require('axios')
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

const data = async () => {
  const countries = await axios.get('https://restcountries.com/v3/all')
  const data = countries.data

  const apiData = data.map(e => {
    return {
      id: e.cca3,
      name: e.name.common,
      flagimg: e.flags ? e.flags[0] : 'Este dato no existe',
      subregion: e.subregion ? e.subregion : 'Este dato no existe',
      area: e.area,
      population: e.population,
      capital: e.hasOwnProperty('capital') ? e.capital[0] : 'No capital',
      continent: e.continents ? e.continents[0] : 'Este dato no existe',
      nameSpanish: e.translations.spa.official
    }
  })
  return apiData
}

const getCountry = async (req, res) => {
  const { name, order } = req.query

  const hay = await Country.findAll()

  const apiCountries = await data()

  if (!hay.length) {
    await Country.bulkCreate(apiCountries)
  }

  if (name) {
    // select * from "Countries" where name = $name;
    try {
      const pais = await Country.findAll({
        include: {
          model: Activity
     },
        // Retorna los countries coincidentes por el name, el name en spanish o el id de 3 letras
        where: {
          [Op.or]: { //op or, dice que traiga verificando si el id de la base de datos es igual al name O si el name de la db es igual al name O si el nameSpanish es igual al name pasado por query
            id: {
              [Op.iLike]: name
            },
            name: {
              [Op.iLike]: `%${name}%` //que contenga name, %name que empiece con name, name% que termine con name
            },
            nameSpanish: {
              [Op.iLike]: `%${name}%`
            }
          }
        }
      })
      // Da como respuesta todos los countries coincidentes
      return res.status(200).json(
        pais.length >= 1
          ? pais
          : []
      )
    } catch (error) {
      res.send(error)
    }
  } else {
    try {
      if (!order) {
        const pais = await Country.findAll({
          include: {
            model: Activity
       },
          order: [['nameSpanish', 'ASC']]
        })
        res.status(200).json(pais.length >= 1 ? pais : [])
      } else {
        switch (order) {
          case 'AZ':
            // console.log('estoy funcando')
            pais = await Country.findAll({
              include: {
                model: Activity
              },
              order: [['name', 'ASC']]
            })
            break
          case 'ZA':
            pais = await Country.findAll({
              include: {
                model: Activity
              },
              order: [['name', 'DESC']]
            })
            break
          case 'PopLowToHigh':
            pais = await Country.findAll({
              include: {
                model: Activity
              },
              order: [['population', 'ASC']]
            })
            break
          case 'PopHighToLow':
            pais = await Country.findAll({
              include: {
                model: Activity
              },
              order: [['population', 'DESC']]
            })
            break;
          default:
            pais = await Country.findAll({
              include: {
                model: Activity
              },
              order: [['name', 'ASC']]
            })
            break;
        }
        res.status(200).json(pais.length >= 0 ? pais : [])
      }
    } catch (error) {
      res.send(error)
    }
  } 
}

const getCountry2 = async (id) => {

    try {
      const pais = await Country.findAll({
        include: {
          model: Activity
        },
        where: {id}
      })
      return pais
    } catch (error) {
      console.log(error)
    }
}

const getById = async (req,res) => {
  try {
    const id = req.params.id
    console.log(id)
    const pais = await Country.findAll({
      include: Activity,
      where: {
        id: id.toUpperCase()
      }
    })

    res.status(200).json(pais.length > 0 ? pais[0] : ['No existe ningún país con ese Id'])
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = {
  getCountry,
  getById,
  getCountry2
}
