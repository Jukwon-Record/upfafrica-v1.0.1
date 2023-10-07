/**
 * leaderRoutes.js
 * @description :: CRUD API routes for leader
 */

const express = require('express');
const router = express.Router();
const leaderController = require('../../../controller/device/v1/leaderController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/leader/create').post(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.addLeader);
router.route('/device/api/v1/leader/list').post(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.findAllLeader);
router.route('/device/api/v1/leader/count').post(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.getLeaderCount);
router.route('/device/api/v1/leader/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.getLeader);
router.route('/device/api/v1/leader/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.updateLeader);    
router.route('/device/api/v1/leader/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.partialUpdateLeader);
router.route('/device/api/v1/leader/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.softDeleteLeader);
router.route('/device/api/v1/leader/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.softDeleteManyLeader);
router.route('/device/api/v1/leader/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.bulkInsertLeader);
router.route('/device/api/v1/leader/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.bulkUpdateLeader);
router.route('/device/api/v1/leader/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.deleteLeader);
router.route('/device/api/v1/leader/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,leaderController.deleteManyLeader);

module.exports = router;
