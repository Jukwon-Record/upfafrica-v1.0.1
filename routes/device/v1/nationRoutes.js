/**
 * nationRoutes.js
 * @description :: CRUD API routes for nation
 */

const express = require('express');
const router = express.Router();
const nationController = require('../../../controller/device/v1/nationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/nation/create').post(auth(PLATFORM.DEVICE),checkRolePermission,nationController.addNation);
router.route('/device/api/v1/nation/list').post(auth(PLATFORM.DEVICE),checkRolePermission,nationController.findAllNation);
router.route('/device/api/v1/nation/count').post(auth(PLATFORM.DEVICE),checkRolePermission,nationController.getNationCount);
router.route('/device/api/v1/nation/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,nationController.getNation);
router.route('/device/api/v1/nation/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,nationController.updateNation);    
router.route('/device/api/v1/nation/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,nationController.partialUpdateNation);
router.route('/device/api/v1/nation/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,nationController.softDeleteNation);
router.route('/device/api/v1/nation/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,nationController.softDeleteManyNation);
router.route('/device/api/v1/nation/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,nationController.bulkInsertNation);
router.route('/device/api/v1/nation/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,nationController.bulkUpdateNation);
router.route('/device/api/v1/nation/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,nationController.deleteNation);
router.route('/device/api/v1/nation/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,nationController.deleteManyNation);

module.exports = router;
