/**
 * subregionRoutes.js
 * @description :: CRUD API routes for subregion
 */

const express = require('express');
const router = express.Router();
const subregionController = require('../../../controller/device/v1/subregionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/subregion/create').post(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.addSubregion);
router.route('/device/api/v1/subregion/list').post(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.findAllSubregion);
router.route('/device/api/v1/subregion/count').post(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.getSubregionCount);
router.route('/device/api/v1/subregion/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.getSubregion);
router.route('/device/api/v1/subregion/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.updateSubregion);    
router.route('/device/api/v1/subregion/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.partialUpdateSubregion);
router.route('/device/api/v1/subregion/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.softDeleteSubregion);
router.route('/device/api/v1/subregion/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.softDeleteManySubregion);
router.route('/device/api/v1/subregion/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.bulkInsertSubregion);
router.route('/device/api/v1/subregion/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.bulkUpdateSubregion);
router.route('/device/api/v1/subregion/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.deleteSubregion);
router.route('/device/api/v1/subregion/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,subregionController.deleteManySubregion);

module.exports = router;
