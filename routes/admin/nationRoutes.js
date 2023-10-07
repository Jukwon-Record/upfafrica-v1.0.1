/**
 * nationRoutes.js
 * @description :: CRUD API routes for nation
 */

const express = require('express');
const router = express.Router();
const nationController = require('../../controller/admin/nationController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/nation/create').post(auth(PLATFORM.ADMIN),checkRolePermission,nationController.addNation);
router.route('/admin/nation/list').post(auth(PLATFORM.ADMIN),checkRolePermission,nationController.findAllNation);
router.route('/admin/nation/count').post(auth(PLATFORM.ADMIN),checkRolePermission,nationController.getNationCount);
router.route('/admin/nation/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,nationController.getNation);
router.route('/admin/nation/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,nationController.updateNation);    
router.route('/admin/nation/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,nationController.partialUpdateNation);
router.route('/admin/nation/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,nationController.softDeleteNation);
router.route('/admin/nation/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,nationController.softDeleteManyNation);
router.route('/admin/nation/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,nationController.bulkInsertNation);
router.route('/admin/nation/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,nationController.bulkUpdateNation);
router.route('/admin/nation/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,nationController.deleteNation);
router.route('/admin/nation/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,nationController.deleteManyNation);

module.exports = router;
