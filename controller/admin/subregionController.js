/**
 * subregionController.js
 * @description :: exports action methods for subregion.
 */

const Subregion = require('../../model/subregion');
const subregionSchemaKey = require('../../utils/validation/subregionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Subregion in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Subregion. {status, message, data}
 */ 
const addSubregion = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      subregionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdSubregion = await dbService.createOne(Subregion,dataToCreate);
    return  res.success({ data :createdSubregion });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Subregion in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Subregions. {status, message, data}
 */
const bulkInsertSubregion = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdSubregion = await dbService.createMany(Subregion,dataToCreate); 
      return  res.success({ data :{ count :createdSubregion.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Subregion from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Subregion(s). {status, message, data}
 */
const findAllSubregion = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundSubregion;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      subregionSchemaKey.findFilterKeys,
      Subregion.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundSubregion = await dbService.count(Subregion, query);
      if (!foundSubregion) {
        return res.recordNotFound();
      } 
      foundSubregion = { totalRecords: foundSubregion };
      return res.success({ data :foundSubregion });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundSubregion = await dbService.paginate( Subregion,query,options);
    if (!foundSubregion){
      return res.recordNotFound();
    }
    return res.success({ data:foundSubregion }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Subregion from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Subregion. {status, message, data}
 */
const getSubregion = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundSubregion = await dbService.findOne(Subregion,{ id :id });
    if (!foundSubregion){
      return res.recordNotFound();
    }
    return  res.success({ data :foundSubregion });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Subregion.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getSubregionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      subregionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedSubregion = await dbService.count(Subregion,where);
    if (!countedSubregion){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedSubregion } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Subregion with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Subregion.
 * @return {Object} : updated Subregion. {status, message, data}
 */
const updateSubregion = async (req, res) => {
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
      subregionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedSubregion = await dbService.update(Subregion,query,dataToUpdate);
    return  res.success({ data :updatedSubregion }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Subregion with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Subregions.
 * @return {Object} : updated Subregions. {status, message, data}
 */
const bulkUpdateSubregion = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedSubregion = await dbService.update(Subregion,filter,dataToUpdate);
    if (!updatedSubregion){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedSubregion.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Subregion with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Subregion.
 * @return {Object} : updated Subregion. {status, message, data}
 */
const partialUpdateSubregion = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      subregionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedSubregion = await dbService.update(Subregion, query, dataToUpdate);
    if (!updatedSubregion) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedSubregion });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Subregion from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Subregion.
 * @return {Object} : deactivated Subregion. {status, message, data}
 */
const softDeleteSubregion = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedSubregion = await deleteDependentService.softDeleteSubregion(query, updateBody);
    if (!updatedSubregion){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedSubregion });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Subregion from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Subregion. {status, message, data}
 */
const deleteSubregion = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedSubregion = await deleteDependentService.countSubregion(query);
      if (!countedSubregion){
        return res.recordNotFound();
      }
      return res.success({ data :countedSubregion });
    }
    let deletedSubregion = await deleteDependentService.deleteUser(query);
    if (!deletedSubregion){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedSubregion });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Subregion in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManySubregion = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedSubregion = await deleteDependentService.countSubregion(query);
      if (!countedSubregion) {
        return res.recordNotFound();
      }
      return res.success({ data: countedSubregion });            
    }
    let deletedSubregion = await deleteDependentService.deleteSubregion(query);
    if (!deletedSubregion) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedSubregion });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Subregion from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Subregion.
 * @return {Object} : number of deactivated documents of Subregion. {status, message, data}
 */
const softDeleteManySubregion = async (req, res) => {
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
    let updatedSubregion = await deleteDependentService.softDeleteSubregion(query, updateBody);
    if (!updatedSubregion) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedSubregion });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addSubregion,
  bulkInsertSubregion,
  findAllSubregion,
  getSubregion,
  getSubregionCount,
  updateSubregion,
  bulkUpdateSubregion,
  partialUpdateSubregion,
  softDeleteSubregion,
  deleteSubregion,
  deleteManySubregion,
  softDeleteManySubregion,
};
