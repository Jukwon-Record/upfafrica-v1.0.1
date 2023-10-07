/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./activityRoutes'));
router.use(require('./subregionRoutes'));
router.use(require('./regionRoutes'));
router.use(require('./nationRoutes'));
router.use(require('./leaderRoutes'));
router.use(require('./imageRoutes'));
router.use(require('./donationRoutes'));
router.use(require('./contactRoutes'));
router.use(require('./blogcategoryRoutes'));
router.use(require('./blogRoutes'));
router.use(require('./associationRoutes'));
router.use(require('./assetRoutes'));
router.use(require('./accountRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
