/**
 * activityRoutes.js
 * @description :: CRUD API routes for activity
 */

const express = require('express');
const router = express.Router();
const activityController = require('../../../controller/device/v1/activityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/activity/create').post(auth(PLATFORM.DEVICE),checkRolePermission,activityController.addActivity);
router.route('/device/api/v1/activity/list').post(auth(PLATFORM.DEVICE),checkRolePermission,activityController.findAllActivity);
router.route('/device/api/v1/activity/count').post(auth(PLATFORM.DEVICE),checkRolePermission,activityController.getActivityCount);
router.route('/device/api/v1/activity/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,activityController.getActivity);
router.route('/device/api/v1/activity/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,activityController.updateActivity);    
router.route('/device/api/v1/activity/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,activityController.partialUpdateActivity);
router.route('/device/api/v1/activity/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,activityController.softDeleteActivity);
router.route('/device/api/v1/activity/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,activityController.softDeleteManyActivity);
router.route('/device/api/v1/activity/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,activityController.bulkInsertActivity);
router.route('/device/api/v1/activity/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,activityController.bulkUpdateActivity);
router.route('/device/api/v1/activity/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,activityController.deleteActivity);
router.route('/device/api/v1/activity/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,activityController.deleteManyActivity);

module.exports = router;
