/**
 * blogRoutes.js
 * @description :: CRUD API routes for blog
 */

const express = require('express');
const router = express.Router();
const blogController = require('../../../controller/device/v1/blogController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/blog/create').post(auth(PLATFORM.DEVICE),checkRolePermission,blogController.addBlog);
router.route('/device/api/v1/blog/list').post(auth(PLATFORM.DEVICE),checkRolePermission,blogController.findAllBlog);
router.route('/device/api/v1/blog/count').post(auth(PLATFORM.DEVICE),checkRolePermission,blogController.getBlogCount);
router.route('/device/api/v1/blog/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,blogController.getBlog);
router.route('/device/api/v1/blog/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blogController.updateBlog);    
router.route('/device/api/v1/blog/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blogController.partialUpdateBlog);
router.route('/device/api/v1/blog/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blogController.softDeleteBlog);
router.route('/device/api/v1/blog/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,blogController.softDeleteManyBlog);
router.route('/device/api/v1/blog/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,blogController.bulkInsertBlog);
router.route('/device/api/v1/blog/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,blogController.bulkUpdateBlog);
router.route('/device/api/v1/blog/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,blogController.deleteBlog);
router.route('/device/api/v1/blog/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,blogController.deleteManyBlog);

module.exports = router;
