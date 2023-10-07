/**
 * blogcategoryController.js
 * @description :: exports action methods for blogcategory.
 */

const Blogcategory = require('../../../model/blogcategory');
const blogcategorySchemaKey = require('../../../utils/validation/blogcategoryValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Blogcategory in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Blogcategory. {status, message, data}
 */ 
const addBlogcategory = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      blogcategorySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBlogcategory = await dbService.createOne(Blogcategory,dataToCreate);
    return  res.success({ data :createdBlogcategory });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Blogcategory in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Blogcategorys. {status, message, data}
 */
const bulkInsertBlogcategory = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBlogcategory = await dbService.createMany(Blogcategory,dataToCreate); 
      return  res.success({ data :{ count :createdBlogcategory.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Blogcategory from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Blogcategory(s). {status, message, data}
 */
const findAllBlogcategory = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBlogcategory;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      blogcategorySchemaKey.findFilterKeys,
      Blogcategory.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBlogcategory = await dbService.count(Blogcategory, query);
      if (!foundBlogcategory) {
        return res.recordNotFound();
      } 
      foundBlogcategory = { totalRecords: foundBlogcategory };
      return res.success({ data :foundBlogcategory });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBlogcategory = await dbService.paginate( Blogcategory,query,options);
    if (!foundBlogcategory){
      return res.recordNotFound();
    }
    return res.success({ data:foundBlogcategory }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Blogcategory from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Blogcategory. {status, message, data}
 */
const getBlogcategory = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBlogcategory = await dbService.findOne(Blogcategory,{ id :id });
    if (!foundBlogcategory){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBlogcategory });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Blogcategory.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBlogcategoryCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      blogcategorySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBlogcategory = await dbService.count(Blogcategory,where);
    if (!countedBlogcategory){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBlogcategory } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Blogcategory with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Blogcategory.
 * @return {Object} : updated Blogcategory. {status, message, data}
 */
const updateBlogcategory = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      blogcategorySchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBlogcategory = await dbService.update(Blogcategory,query,dataToUpdate);
    return  res.success({ data :updatedBlogcategory }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Blogcategory with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Blogcategorys.
 * @return {Object} : updated Blogcategorys. {status, message, data}
 */
const bulkUpdateBlogcategory = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBlogcategory = await dbService.update(Blogcategory,filter,dataToUpdate);
    if (!updatedBlogcategory){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBlogcategory.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Blogcategory with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Blogcategory.
 * @return {Object} : updated Blogcategory. {status, message, data}
 */
const partialUpdateBlogcategory = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      blogcategorySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBlogcategory = await dbService.update(Blogcategory, query, dataToUpdate);
    if (!updatedBlogcategory) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBlogcategory });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Blogcategory from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Blogcategory.
 * @return {Object} : deactivated Blogcategory. {status, message, data}
 */
const softDeleteBlogcategory = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedBlogcategory = await deleteDependentService.softDeleteBlogcategory(query, updateBody);
    if (!updatedBlogcategory){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedBlogcategory });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Blogcategory from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Blogcategory. {status, message, data}
 */
const deleteBlogcategory = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedBlogcategory = await deleteDependentService.countBlogcategory(query);
      if (!countedBlogcategory){
        return res.recordNotFound();
      }
      return res.success({ data :countedBlogcategory });
    }
    let deletedBlogcategory = await deleteDependentService.deleteUser(query);
    if (!deletedBlogcategory){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedBlogcategory });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Blogcategory in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBlogcategory = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedBlogcategory = await deleteDependentService.countBlogcategory(query);
      if (!countedBlogcategory) {
        return res.recordNotFound();
      }
      return res.success({ data: countedBlogcategory });            
    }
    let deletedBlogcategory = await deleteDependentService.deleteBlogcategory(query);
    if (!deletedBlogcategory) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedBlogcategory });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Blogcategory from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Blogcategory.
 * @return {Object} : number of deactivated documents of Blogcategory. {status, message, data}
 */
const softDeleteManyBlogcategory = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedBlogcategory = await deleteDependentService.softDeleteBlogcategory(query, updateBody);
    if (!updatedBlogcategory) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedBlogcategory });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBlogcategory,
  bulkInsertBlogcategory,
  findAllBlogcategory,
  getBlogcategory,
  getBlogcategoryCount,
  updateBlogcategory,
  bulkUpdateBlogcategory,
  partialUpdateBlogcategory,
  softDeleteBlogcategory,
  deleteBlogcategory,
  deleteManyBlogcategory,
  softDeleteManyBlogcategory,
};
