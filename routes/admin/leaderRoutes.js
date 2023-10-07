/**
 * leaderRoutes.js
 * @description :: CRUD API routes for leader
 */

const express = require('express');
const router = express.Router();
const leaderController = require('../../controller/admin/leaderController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/leader/create').post(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.addLeader);
router.route('/admin/leader/list').post(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.findAllLeader);
router.route('/admin/leader/count').post(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.getLeaderCount);
router.route('/admin/leader/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.getLeader);
router.route('/admin/leader/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.updateLeader);    
router.route('/admin/leader/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.partialUpdateLeader);
router.route('/admin/leader/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.softDeleteLeader);
router.route('/admin/leader/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.softDeleteManyLeader);
router.route('/admin/leader/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.bulkInsertLeader);
router.route('/admin/leader/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.bulkUpdateLeader);
router.route('/admin/leader/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.deleteLeader);
router.route('/admin/leader/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,leaderController.deleteManyLeader);

module.exports = router;
