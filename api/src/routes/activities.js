const { Router } = require('express');
const {Activity, Country} = require('../db')
const {getDbActivities} = require('../controllers/activity.controller')
const {getCountry2} = require('../controllers/countries.controller')
const router = Router();

// Se postea algo como esto {
//      "name": "Fly", "difficulty": "5", "duration": "1:00:09", "season": "spring"
// }

// post a -> http://localhost:3001/activity
router.post('/', async (req,res) => {
    // Hago destructuring de la data mandada por body
    const {countries_id, name, difficulty, duration, season} = req.body;
    if(name && countries_id && typeof countries_id === "object") {
            try {
                const countries = await getCountry2(countries_id.map(e=> e.toString().toUpperCase()))
                if (countries.length) {
                    const [activity, created] = await Activity.findOrCreate({
                        where : { name },
                        defaults: {
                            name,
                            difficulty,
                            duration,
                            season
                        },
                    })
                    let nameCountries = []
                    await countries.map(async e => {
                        nameCountries.push(e.dataValues.name)
                        await e.addActivity(activity)
                    })
                    res.status(200).send(`Activity created in ${nameCountries.length===2?nameCountries.join(' and'):nameCountries.join(', ')}.`)
                } else {
                    res.status(404).send(`Countries not found ${countries_id.join(`, `).toUpperCase()}`)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const activities = await getDbActivities()
            res.status(200).send(activities)
        }
    });
// get a -> http://localhost:3001/activity/:id
router.get('/:idActivity', async (req,res) => {
    try{
         const {idActivity} = req.params;
         const activity = await Activity.findAll({
            include: {
                model: Country
            }
         })
         console.log(activity)
         res.json(activity ? activity : []);
    }catch(e){
         res.send(e);
    }
});


module.exports = router; 