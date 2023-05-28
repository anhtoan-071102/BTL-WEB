const express = require('express');

const factoryController = require('../controllers/factory');

const router = express.Router();

router.get('/get-factories', factoryController.getFactories);

router.get('/get-all-id', factoryController.getFactoryIds);

router.get('/get-all-names-and-ids', factoryController.getNamesAndIds);

router.get('/get-factory/:factoryId', factoryController.getFactory);

router.post('/add-factory', factoryController.addFactory);

router.put('/edit-factory/:factoryId', factoryController.editFactory);

module.exports = router;
