const express = require('express');

const serviceCenterController = require('../controllers/serviceCenter');

const router = express.Router();

router.get('/get-serviceCenters', serviceCenterController.getServiceCenters);

router.get('/get-all-id', serviceCenterController.getServiceCenterIds);

router.get('/get-all-names-and-ids', serviceCenterController.getNamesAndIds);

router.get(
  '/get-serviceCenter/:serviceCenterId',
  serviceCenterController.getServiceCenter
);

router.post('/add-serviceCenter', serviceCenterController.addServiceCenter);

router.put(
  '/edit-serviceCenter/:serviceCenterId',
  serviceCenterController.editServiceCenter
);

module.exports = router;
