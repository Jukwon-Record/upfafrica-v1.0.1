/**
 * associationRoutes.js
 * @description :: CRUD API routes for association
 */

const express = require('express');
const router = express.Router();
const associationController = require('../../../controller/device/v1/associationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/association/create').post(auth(PLATFORM.DEVICE),checkRolePermission,associationController.addAssociation);
router.route('/device/api/v1/association/list').post(auth(PLATFORM.DEVICE),checkRolePermission,associationController.findAllAssociation);
router.route('/device/api/v1/association/count').post(auth(PLATFORM.DEVICE),checkRolePermission,associationController.getAssociationCount);
router.route('/device/api/v1/association/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,associationController.getAssociation);
router.route('/device/api/v1/association/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,associationController.updateAssociation);    
router.route('/device/api/v1/association/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,associationController.partialUpdateAssociation);
router.route('/device/api/v1/association/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,associationController.softDeleteAssociation);
router.route('/device/api/v1/association/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,associationController.softDeleteManyAssociation);
router.route('/device/api/v1/association/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,associationController.bulkInsertAssociation);
router.route('/device/api/v1/association/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,associationController.bulkUpdateAssociation);
router.route('/device/api/v1/association/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,associationController.deleteAssociation);
router.route('/device/api/v1/association/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,associationController.deleteManyAssociation);

module.exports = router;
