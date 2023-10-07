/**
 * activityRoutes.js
 * @description :: CRUD API routes for activity
 */

const express = require('express');
const router = express.Router();
const activityController = require('../../controller/admin/activityController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/activity/create').post(auth(PLATFORM.ADMIN),checkRolePermission,activityController.addActivity);
router.route('/admin/activity/list').post(auth(PLATFORM.ADMIN),checkRolePermission,activityController.findAllActivity);
router.route('/admin/activity/count').post(auth(PLATFORM.ADMIN),checkRolePermission,activityController.getActivityCount);
router.route('/admin/activity/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,activityController.getActivity);
router.route('/admin/activity/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,activityController.updateActivity);    
router.route('/admin/activity/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,activityController.partialUpdateActivity);
router.route('/admin/activity/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,activityController.softDeleteActivity);
router.route('/admin/activity/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,activityController.softDeleteManyActivity);
router.route('/admin/activity/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,activityController.bulkInsertActivity);
router.route('/admin/activity/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,activityController.bulkUpdateActivity);
router.route('/admin/activity/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,activityController.deleteActivity);
router.route('/admin/activity/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,activityController.deleteManyActivity);

module.exports = router;
