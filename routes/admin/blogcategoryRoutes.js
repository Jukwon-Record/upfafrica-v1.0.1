/**
 * blogcategoryRoutes.js
 * @description :: CRUD API routes for blogcategory
 */

const express = require('express');
const router = express.Router();
const blogcategoryController = require('../../controller/admin/blogcategoryController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/blogcategory/create').post(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.addBlogcategory);
router.route('/admin/blogcategory/list').post(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.findAllBlogcategory);
router.route('/admin/blogcategory/count').post(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.getBlogcategoryCount);
router.route('/admin/blogcategory/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.getBlogcategory);
router.route('/admin/blogcategory/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.updateBlogcategory);    
router.route('/admin/blogcategory/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.partialUpdateBlogcategory);
router.route('/admin/blogcategory/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.softDeleteBlogcategory);
router.route('/admin/blogcategory/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.softDeleteManyBlogcategory);
router.route('/admin/blogcategory/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.bulkInsertBlogcategory);
router.route('/admin/blogcategory/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.bulkUpdateBlogcategory);
router.route('/admin/blogcategory/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.deleteBlogcategory);
router.route('/admin/blogcategory/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,blogcategoryController.deleteManyBlogcategory);

module.exports = router;
