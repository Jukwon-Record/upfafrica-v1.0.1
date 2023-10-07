/**
 * accountRoutes.js
 * @description :: CRUD API routes for account
 */

const express = require('express');
const router = express.Router();
const accountController = require('../../controller/admin/accountController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/account/me').get(auth(PLATFORM.ADMIN),accountController.getLoggedInUserInfo);
router.route('/admin/account/create').post(auth(PLATFORM.ADMIN),checkRolePermission,accountController.addAccount);
router.route('/admin/account/list').post(auth(PLATFORM.ADMIN),checkRolePermission,accountController.findAllAccount);
router.route('/admin/account/count').post(auth(PLATFORM.ADMIN),checkRolePermission,accountController.getAccountCount);
router.route('/admin/account/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,accountController.getAccount);
router.route('/admin/account/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,accountController.updateAccount);    
router.route('/admin/account/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,accountController.partialUpdateAccount);
router.route('/admin/account/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,accountController.softDeleteAccount);
router.route('/admin/account/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,accountController.softDeleteManyAccount);
router.route('/admin/account/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,accountController.bulkInsertAccount);
router.route('/admin/account/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,accountController.bulkUpdateAccount);
router.route('/admin/account/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,accountController.deleteAccount);
router.route('/admin/account/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,accountController.deleteManyAccount);
router.route('/admin/account/change-password').put(auth(PLATFORM.ADMIN),accountController.changePassword);
router.route('/admin/account/update-profile').put(auth(PLATFORM.ADMIN),accountController.updateProfile);

module.exports = router;
