/**
 * associationRoutes.js
 * @description :: CRUD API routes for association
 */

const express = require('express');
const router = express.Router();
const associationController = require('../../controller/admin/associationController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/association/create').post(auth(PLATFORM.ADMIN),checkRolePermission,associationController.addAssociation);
router.route('/admin/association/list').post(auth(PLATFORM.ADMIN),checkRolePermission,associationController.findAllAssociation);
router.route('/admin/association/count').post(auth(PLATFORM.ADMIN),checkRolePermission,associationController.getAssociationCount);
router.route('/admin/association/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,associationController.getAssociation);
router.route('/admin/association/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,associationController.updateAssociation);    
router.route('/admin/association/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,associationController.partialUpdateAssociation);
router.route('/admin/association/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,associationController.softDeleteAssociation);
router.route('/admin/association/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,associationController.softDeleteManyAssociation);
router.route('/admin/association/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,associationController.bulkInsertAssociation);
router.route('/admin/association/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,associationController.bulkUpdateAssociation);
router.route('/admin/association/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,associationController.deleteAssociation);
router.route('/admin/association/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,associationController.deleteManyAssociation);

module.exports = router;
