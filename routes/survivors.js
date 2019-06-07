var express = require('express');
var router = express.Router();
var model = require('../models/index');

// GET method route
router.get('/', function(req, res) {
    model.Survivor.findAll()
        .then(survivors => res.json({
            error: false,
            data: survivors
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});



/**
 * Function POST for Survivor
 * { String } ""
 * { Function } (req, res)
 */
router.post('/', function(req, res) {
    var survivor;
    model.Survivor.create(req.body)
        .then(function(_survivor) {
            survivor = _survivor.get({ plain: true });
            var inventory = {
                SurvivorId: survivor.id,
                water: req.body.inventory.water,
                food: req.body.inventory.food,
                medication: req.body.inventory.medication,
                ammunition: req.body.inventory.ammunition,
            };

            return model.Inventory.create(inventory)
        })
        .then(function(inventory) {
            var data = survivor;
            data.inventory = inventory.get({ plain: true });;
            console.log(data)

            return res.status(201).json({
                error: false,
                data: data,
                message: 'New Survivor has been saved!'
            })
        })
        .catch(error => res.json({
            hasErrors: true,
            data: [],
            error: error
        }));
});


/**
 * // PUT method route
 */
router.put('/:id', function(req, res, next) {
    const user_id = req.params.id;
    const { name, age, gender, latitude, longitude } = req.body;
    model.Survivor.update({
            name: name,
            age: age,
            gender: gender,
            latitude: latitude,
            longitude: longitude
        }, {
            where: {
                id: user_id
            }
        })
        .then(users => res.status(201).json({
            error: false,
            message: 'Survivor has been updated!'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));

});


/**
 * // DELETE method route
 */
router.delete('/:id', function(req, res, next) {
    const user_id = req.params.id;
    model.Survivor.destroy({
            where: {
                id: user_id
            }
        })
        .then(status => res.status(201).json({
            error: false,
            message: 'Survivor has been delete!'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
});

module.exports = router;