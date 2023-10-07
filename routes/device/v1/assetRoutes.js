/**
 * assetRoutes.js
 * @description :: CRUD API routes for asset
 */

const express = require('express');
const router = express.Router();
const assetController = require('../../../controller/device/v1/assetController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/asset/create').post(auth(PLATFORM.DEVICE),checkRolePermission,assetController.addAsset);
router.route('/device/api/v1/asset/list').post(auth(PLATFORM.DEVICE),checkRolePermission,assetController.findAllAsset);
router.route('/device/api/v1/asset/count').post(auth(PLATFORM.DEVICE),checkRolePermission,assetController.getAssetCount);
router.route('/device/api/v1/asset/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,assetController.getAsset);
router.route('/device/api/v1/asset/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,assetController.updateAsset);    
router.route('/device/api/v1/asset/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,assetController.partialUpdateAsset);
router.route('/device/api/v1/asset/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,assetController.softDeleteAsset);
router.route('/device/api/v1/asset/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,assetController.softDeleteManyAsset);
router.route('/device/api/v1/asset/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,assetController.bulkInsertAsset);
router.route('/device/api/v1/asset/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,assetController.bulkUpdateAsset);
router.route('/device/api/v1/asset/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,assetController.deleteAsset);
router.route('/device/api/v1/asset/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,assetController.deleteManyAsset);

module.exports = router;
