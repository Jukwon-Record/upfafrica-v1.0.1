/**
 * contactRoutes.js
 * @description :: CRUD API routes for contact
 */

const express = require('express');
const router = express.Router();
const contactController = require('../../../controller/device/v1/contactController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/contact/create').post(auth(PLATFORM.DEVICE),checkRolePermission,contactController.addContact);
router.route('/device/api/v1/contact/list').post(auth(PLATFORM.DEVICE),checkRolePermission,contactController.findAllContact);
router.route('/device/api/v1/contact/count').post(auth(PLATFORM.DEVICE),checkRolePermission,contactController.getContactCount);
router.route('/device/api/v1/contact/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,contactController.getContact);
router.route('/device/api/v1/contact/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,contactController.updateContact);    
router.route('/device/api/v1/contact/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,contactController.partialUpdateContact);
router.route('/device/api/v1/contact/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,contactController.softDeleteContact);
router.route('/device/api/v1/contact/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,contactController.softDeleteManyContact);
router.route('/device/api/v1/contact/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,contactController.bulkInsertContact);
router.route('/device/api/v1/contact/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,contactController.bulkUpdateContact);
router.route('/device/api/v1/contact/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,contactController.deleteContact);
router.route('/device/api/v1/contact/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,contactController.deleteManyContact);

module.exports = router;
