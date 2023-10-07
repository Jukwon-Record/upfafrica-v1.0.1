/**
 * blogcategoryRoutes.js
 * @description :: CRUD API routes for blogcategory
 */

const express = require('express');
const router = express.Router();
const blogcategoryController = require('../../../controller/device/v1/blogcategoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/blogcategory/create').post(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.addBlogcategory);
router.route('/device/api/v1/blogcategory/list').post(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.findAllBlogcategory);
router.route('/device/api/v1/blogcategory/count').post(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.getBlogcategoryCount);
router.route('/device/api/v1/blogcategory/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.getBlogcategory);
router.route('/device/api/v1/blogcategory/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.updateBlogcategory);    
router.route('/device/api/v1/blogcategory/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.partialUpdateBlogcategory);
router.route('/device/api/v1/blogcategory/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.softDeleteBlogcategory);
router.route('/device/api/v1/blogcategory/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.softDeleteManyBlogcategory);
router.route('/device/api/v1/blogcategory/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.bulkInsertBlogcategory);
router.route('/device/api/v1/blogcategory/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.bulkUpdateBlogcategory);
router.route('/device/api/v1/blogcategory/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.deleteBlogcategory);
router.route('/device/api/v1/blogcategory/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,blogcategoryController.deleteManyBlogcategory);

module.exports = router;
