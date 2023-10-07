/**
 * subregionRoutes.js
 * @description :: CRUD API routes for subregion
 */

const express = require('express');
const router = express.Router();
const subregionController = require('../../controller/admin/subregionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/subregion/create').post(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.addSubregion);
router.route('/admin/subregion/list').post(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.findAllSubregion);
router.route('/admin/subregion/count').post(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.getSubregionCount);
router.route('/admin/subregion/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.getSubregion);
router.route('/admin/subregion/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.updateSubregion);    
router.route('/admin/subregion/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.partialUpdateSubregion);
router.route('/admin/subregion/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.softDeleteSubregion);
router.route('/admin/subregion/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.softDeleteManySubregion);
router.route('/admin/subregion/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.bulkInsertSubregion);
router.route('/admin/subregion/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.bulkUpdateSubregion);
router.route('/admin/subregion/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.deleteSubregion);
router.route('/admin/subregion/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,subregionController.deleteManySubregion);

module.exports = router;
