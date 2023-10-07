/**
 * leaderController.js
 * @description :: exports action methods for leader.
 */

const Leader = require('../../model/leader');
const leaderSchemaKey = require('../../utils/validation/leaderValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Leader in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Leader. {status, message, data}
 */ 
const addLeader = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      leaderSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdLeader = await dbService.createOne(Leader,dataToCreate);
    return  res.success({ data :createdLeader });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Leader in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Leaders. {status, message, data}
 */
const bulkInsertLeader = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdLeader = await dbService.createMany(Leader,dataToCreate); 
      return  res.success({ data :{ count :createdLeader.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Leader from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Leader(s). {status, message, data}
 */
const findAllLeader = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundLeader;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      leaderSchemaKey.findFilterKeys,
      Leader.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundLeader = await dbService.count(Leader, query);
      if (!foundLeader) {
        return res.recordNotFound();
      } 
      foundLeader = { totalRecords: foundLeader };
      return res.success({ data :foundLeader });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundLeader = await dbService.paginate( Leader,query,options);
    if (!foundLeader){
      return res.recordNotFound();
    }
    return res.success({ data:foundLeader }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Leader from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Leader. {status, message, data}
 */
const getLeader = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundLeader = await dbService.findOne(Leader,{ id :id });
    if (!foundLeader){
      return res.recordNotFound();
    }
    return  res.success({ data :foundLeader });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Leader.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getLeaderCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      leaderSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedLeader = await dbService.count(Leader,where);
    if (!countedLeader){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedLeader } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Leader with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Leader.
 * @return {Object} : updated Leader. {status, message, data}
 */
const updateLeader = async (req, res) => {
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
      leaderSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedLeader = await dbService.update(Leader,query,dataToUpdate);
    return  res.success({ data :updatedLeader }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Leader with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Leaders.
 * @return {Object} : updated Leaders. {status, message, data}
 */
const bulkUpdateLeader = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedLeader = await dbService.update(Leader,filter,dataToUpdate);
    if (!updatedLeader){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedLeader.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Leader with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Leader.
 * @return {Object} : updated Leader. {status, message, data}
 */
const partialUpdateLeader = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      leaderSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedLeader = await dbService.update(Leader, query, dataToUpdate);
    if (!updatedLeader) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedLeader });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Leader from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Leader.
 * @return {Object} : deactivated Leader. {status, message, data}
 */
const softDeleteLeader = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Leader, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Leader from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Leader. {status, message, data}
 */
const deleteLeader = async (req, res) => {
  const result = await dbService.deleteByPk(Leader, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Leader in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyLeader = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedLeader = await dbService.destroy(Leader,query);
    return res.success({ data :{ count :deletedLeader.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Leader from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Leader.
 * @return {Object} : number of deactivated documents of Leader. {status, message, data}
 */
const softDeleteManyLeader = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedLeader = await dbService.update(Leader,query,updateBody, options);
    if (!updatedLeader) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedLeader.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addLeader,
  bulkInsertLeader,
  findAllLeader,
  getLeader,
  getLeaderCount,
  updateLeader,
  bulkUpdateLeader,
  partialUpdateLeader,
  softDeleteLeader,
  deleteLeader,
  deleteManyLeader,
  softDeleteManyLeader,
};
