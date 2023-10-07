/**
 * donationRoutes.js
 * @description :: CRUD API routes for donation
 */

const express = require('express');
const router = express.Router();
const donationController = require('../../controller/admin/donationController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/donation/create').post(auth(PLATFORM.ADMIN),checkRolePermission,donationController.addDonation);
router.route('/admin/donation/list').post(auth(PLATFORM.ADMIN),checkRolePermission,donationController.findAllDonation);
router.route('/admin/donation/count').post(auth(PLATFORM.ADMIN),checkRolePermission,donationController.getDonationCount);
router.route('/admin/donation/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,donationController.getDonation);
router.route('/admin/donation/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,donationController.updateDonation);    
router.route('/admin/donation/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,donationController.partialUpdateDonation);
router.route('/admin/donation/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,donationController.softDeleteDonation);
router.route('/admin/donation/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,donationController.softDeleteManyDonation);
router.route('/admin/donation/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,donationController.bulkInsertDonation);
router.route('/admin/donation/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,donationController.bulkUpdateDonation);
router.route('/admin/donation/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,donationController.deleteDonation);
router.route('/admin/donation/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,donationController.deleteManyDonation);

module.exports = router;
