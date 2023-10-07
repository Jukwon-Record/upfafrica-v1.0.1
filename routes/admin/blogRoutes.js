/**
 * blogRoutes.js
 * @description :: CRUD API routes for blog
 */

const express = require('express');
const router = express.Router();
const blogController = require('../../controller/admin/blogController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/blog/create').post(auth(PLATFORM.ADMIN),checkRolePermission,blogController.addBlog);
router.route('/admin/blog/list').post(auth(PLATFORM.ADMIN),checkRolePermission,blogController.findAllBlog);
router.route('/admin/blog/count').post(auth(PLATFORM.ADMIN),checkRolePermission,blogController.getBlogCount);
router.route('/admin/blog/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,blogController.getBlog);
router.route('/admin/blog/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blogController.updateBlog);    
router.route('/admin/blog/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blogController.partialUpdateBlog);
router.route('/admin/blog/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blogController.softDeleteBlog);
router.route('/admin/blog/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,blogController.softDeleteManyBlog);
router.route('/admin/blog/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,blogController.bulkInsertBlog);
router.route('/admin/blog/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,blogController.bulkUpdateBlog);
router.route('/admin/blog/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,blogController.deleteBlog);
router.route('/admin/blog/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,blogController.deleteManyBlog);

module.exports = router;
