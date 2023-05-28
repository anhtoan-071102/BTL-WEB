const express = require('express');

const uploadImage = require('../utils/multer').uploadImage('products');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/get-product-lines', productController.getProductLines);

router.get('/get-all-pdlid', productController.getProductLineIds);

router.post('/add-product-line', productController.addProductline);

router.put(
  '/edit-product-line/:productLineId',
  productController.editProductLine
);

router.get(
  '/get-product-models/:productLineId',
  productController.getProductModels
);

router.post(
  '/add-product-model/:productLineId',
  uploadImage,
  productController.addProductModels
);

router.put(
  '/edit-product-model/:productModelId',
  productController.editProductModel
);

router.put(
  '/edit-product-model-image',
  uploadImage,
  productController.editProductModelImage
);

router.get(
  '/get-factory-warehouse/:factoryId',
  productController.getFactoryWarehouse
);

router.get(
  '/get-agent-warehouse/:agentId',
  productController.getAgentWarehouse
);

router.get(
  '/get-serviceCenter-warehouse/:serviceCenterId',
  productController.getServiceCenterWarehouse
);

router.post(
  '/add-factory-products/:factoryId',
  productController.addFactoryProducts
);

router.get('/get-pdl-name-and-id', productController.getAllPdlNameAndId);

router.get(
  '/get-model-name-and-id-by-pdl/:productLineId',
  productController.getAllModelsNameAndIdByPdl
);

router.get('/get-all-id/:factoryId', productController.getAllProductId);

router.put('/add-agent-products/:agentId', productController.addAgentProducts);

router.get(
  '/get-product-line/:productLineId',
  productController.getProductLine
);

module.exports = router;
