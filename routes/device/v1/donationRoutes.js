/**
 * donationRoutes.js
 * @description :: CRUD API routes for donation
 */

const express = require('express');
const router = express.Router();
const donationController = require('../../../controller/device/v1/donationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/donation/create').post(auth(PLATFORM.DEVICE),checkRolePermission,donationController.addDonation);
router.route('/device/api/v1/donation/list').post(auth(PLATFORM.DEVICE),checkRolePermission,donationController.findAllDonation);
router.route('/device/api/v1/donation/count').post(auth(PLATFORM.DEVICE),checkRolePermission,donationController.getDonationCount);
router.route('/device/api/v1/donation/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,donationController.getDonation);
router.route('/device/api/v1/donation/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,donationController.updateDonation);    
router.route('/device/api/v1/donation/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,donationController.partialUpdateDonation);
router.route('/device/api/v1/donation/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,donationController.softDeleteDonation);
router.route('/device/api/v1/donation/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,donationController.softDeleteManyDonation);
router.route('/device/api/v1/donation/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,donationController.bulkInsertDonation);
router.route('/device/api/v1/donation/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,donationController.bulkUpdateDonation);
router.route('/device/api/v1/donation/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,donationController.deleteDonation);
router.route('/device/api/v1/donation/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,donationController.deleteManyDonation);

module.exports = router;
