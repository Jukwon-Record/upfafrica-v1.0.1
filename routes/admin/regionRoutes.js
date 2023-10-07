/**
 * regionRoutes.js
 * @description :: CRUD API routes for region
 */

const express = require('express');
const router = express.Router();
const regionController = require('../../controller/admin/regionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/region/create').post(auth(PLATFORM.ADMIN),checkRolePermission,regionController.addRegion);
router.route('/admin/region/list').post(auth(PLATFORM.ADMIN),checkRolePermission,regionController.findAllRegion);
router.route('/admin/region/count').post(auth(PLATFORM.ADMIN),checkRolePermission,regionController.getRegionCount);
router.route('/admin/region/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,regionController.getRegion);
router.route('/admin/region/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,regionController.updateRegion);    
router.route('/admin/region/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,regionController.partialUpdateRegion);
router.route('/admin/region/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,regionController.softDeleteRegion);
router.route('/admin/region/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,regionController.softDeleteManyRegion);
router.route('/admin/region/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,regionController.bulkInsertRegion);
router.route('/admin/region/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,regionController.bulkUpdateRegion);
router.route('/admin/region/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,regionController.deleteRegion);
router.route('/admin/region/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,regionController.deleteManyRegion);

module.exports = router;
