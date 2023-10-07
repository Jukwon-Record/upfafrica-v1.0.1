/**
 * accountRoutes.js
 * @description :: CRUD API routes for account
 */

const express = require('express');
const router = express.Router();
const accountController = require('../../../controller/device/v1/accountController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/account/me').get(auth(PLATFORM.DEVICE),accountController.getLoggedInUserInfo);
router.route('/device/api/v1/account/change-password').put(auth(PLATFORM.DEVICE),accountController.changePassword);
router.route('/device/api/v1/account/update-profile').put(auth(PLATFORM.DEVICE),accountController.updateProfile);

module.exports = router;
