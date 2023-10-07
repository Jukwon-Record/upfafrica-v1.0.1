/**
 * activityController.js
 * @description :: exports action methods for activity.
 */

const Activity = require('../../../model/activity');
const activitySchemaKey = require('../../../utils/validation/activityValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Activity in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Activity. {status, message, data}
 */ 
const addActivity = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      activitySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdActivity = await dbService.createOne(Activity,dataToCreate);
    return  res.success({ data :createdActivity });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Activity in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Activitys. {status, message, data}
 */
const bulkInsertActivity = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdActivity = await dbService.createMany(Activity,dataToCreate); 
      return  res.success({ data :{ count :createdActivity.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Activity from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Activity(s). {status, message, data}
 */
const findAllActivity = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundActivity;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      activitySchemaKey.findFilterKeys,
      Activity.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundActivity = await dbService.count(Activity, query);
      if (!foundActivity) {
        return res.recordNotFound();
      } 
      foundActivity = { totalRecords: foundActivity };
      return res.success({ data :foundActivity });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundActivity = await dbService.paginate( Activity,query,options);
    if (!foundActivity){
      return res.recordNotFound();
    }
    return res.success({ data:foundActivity }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Activity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Activity. {status, message, data}
 */
const getActivity = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundActivity = await dbService.findOne(Activity,{ id :id });
    if (!foundActivity){
      return res.recordNotFound();
    }
    return  res.success({ data :foundActivity });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Activity.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getActivityCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      activitySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedActivity = await dbService.count(Activity,where);
    if (!countedActivity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedActivity } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Activity with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Activity.
 * @return {Object} : updated Activity. {status, message, data}
 */
const updateActivity = async (req, res) => {
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
      activitySchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedActivity = await dbService.update(Activity,query,dataToUpdate);
    return  res.success({ data :updatedActivity }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Activity with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Activitys.
 * @return {Object} : updated Activitys. {status, message, data}
 */
const bulkUpdateActivity = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedActivity = await dbService.update(Activity,filter,dataToUpdate);
    if (!updatedActivity){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedActivity.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Activity with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Activity.
 * @return {Object} : updated Activity. {status, message, data}
 */
const partialUpdateActivity = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      activitySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedActivity = await dbService.update(Activity, query, dataToUpdate);
    if (!updatedActivity) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedActivity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Activity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Activity.
 * @return {Object} : deactivated Activity. {status, message, data}
 */
const softDeleteActivity = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedActivity = await deleteDependentService.softDeleteActivity(query, updateBody);
    if (!updatedActivity){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedActivity });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Activity from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Activity. {status, message, data}
 */
const deleteActivity = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedActivity = await deleteDependentService.countActivity(query);
      if (!countedActivity){
        return res.recordNotFound();
      }
      return res.success({ data :countedActivity });
    }
    let deletedActivity = await deleteDependentService.deleteUser(query);
    if (!deletedActivity){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedActivity });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Activity in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyActivity = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedActivity = await deleteDependentService.countActivity(query);
      if (!countedActivity) {
        return res.recordNotFound();
      }
      return res.success({ data: countedActivity });            
    }
    let deletedActivity = await deleteDependentService.deleteActivity(query);
    if (!deletedActivity) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedActivity });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Activity from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Activity.
 * @return {Object} : number of deactivated documents of Activity. {status, message, data}
 */
const softDeleteManyActivity = async (req, res) => {
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
    let updatedActivity = await deleteDependentService.softDeleteActivity(query, updateBody);
    if (!updatedActivity) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedActivity });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addActivity,
  bulkInsertActivity,
  findAllActivity,
  getActivity,
  getActivityCount,
  updateActivity,
  bulkUpdateActivity,
  partialUpdateActivity,
  softDeleteActivity,
  deleteActivity,
  deleteManyActivity,
  softDeleteManyActivity,
};
