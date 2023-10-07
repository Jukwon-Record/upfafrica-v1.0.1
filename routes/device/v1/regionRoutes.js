/**
 * regionRoutes.js
 * @description :: CRUD API routes for region
 */

const express = require('express');
const router = express.Router();
const regionController = require('../../../controller/device/v1/regionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/region/create').post(auth(PLATFORM.DEVICE),checkRolePermission,regionController.addRegion);
router.route('/device/api/v1/region/list').post(auth(PLATFORM.DEVICE),checkRolePermission,regionController.findAllRegion);
router.route('/device/api/v1/region/count').post(auth(PLATFORM.DEVICE),checkRolePermission,regionController.getRegionCount);
router.route('/device/api/v1/region/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,regionController.getRegion);
router.route('/device/api/v1/region/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,regionController.updateRegion);    
router.route('/device/api/v1/region/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,regionController.partialUpdateRegion);
router.route('/device/api/v1/region/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,regionController.softDeleteRegion);
router.route('/device/api/v1/region/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,regionController.softDeleteManyRegion);
router.route('/device/api/v1/region/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,regionController.bulkInsertRegion);
router.route('/device/api/v1/region/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,regionController.bulkUpdateRegion);
router.route('/device/api/v1/region/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,regionController.deleteRegion);
router.route('/device/api/v1/region/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,regionController.deleteManyRegion);

module.exports = router;
