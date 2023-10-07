/**
 * associationController.js
 * @description :: exports action methods for association.
 */

const Association = require('../../model/association');
const associationSchemaKey = require('../../utils/validation/associationValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Association in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Association. {status, message, data}
 */ 
const addAssociation = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      associationSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAssociation = await dbService.createOne(Association,dataToCreate);
    return  res.success({ data :createdAssociation });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Association in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Associations. {status, message, data}
 */
const bulkInsertAssociation = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAssociation = await dbService.createMany(Association,dataToCreate); 
      return  res.success({ data :{ count :createdAssociation.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Association from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Association(s). {status, message, data}
 */
const findAllAssociation = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAssociation;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      associationSchemaKey.findFilterKeys,
      Association.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAssociation = await dbService.count(Association, query);
      if (!foundAssociation) {
        return res.recordNotFound();
      } 
      foundAssociation = { totalRecords: foundAssociation };
      return res.success({ data :foundAssociation });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAssociation = await dbService.paginate( Association,query,options);
    if (!foundAssociation){
      return res.recordNotFound();
    }
    return res.success({ data:foundAssociation }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Association from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Association. {status, message, data}
 */
const getAssociation = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAssociation = await dbService.findOne(Association,{ id :id });
    if (!foundAssociation){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAssociation });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Association.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAssociationCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      associationSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAssociation = await dbService.count(Association,where);
    if (!countedAssociation){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAssociation } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Association with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Association.
 * @return {Object} : updated Association. {status, message, data}
 */
const updateAssociation = async (req, res) => {
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
      associationSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAssociation = await dbService.update(Association,query,dataToUpdate);
    return  res.success({ data :updatedAssociation }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Association with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Associations.
 * @return {Object} : updated Associations. {status, message, data}
 */
const bulkUpdateAssociation = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAssociation = await dbService.update(Association,filter,dataToUpdate);
    if (!updatedAssociation){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAssociation.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Association with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Association.
 * @return {Object} : updated Association. {status, message, data}
 */
const partialUpdateAssociation = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      associationSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAssociation = await dbService.update(Association, query, dataToUpdate);
    if (!updatedAssociation) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAssociation });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Association from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Association.
 * @return {Object} : deactivated Association. {status, message, data}
 */
const softDeleteAssociation = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedAssociation = await deleteDependentService.softDeleteAssociation(query, updateBody);
    if (!updatedAssociation){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAssociation });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Association from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Association. {status, message, data}
 */
const deleteAssociation = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedAssociation = await deleteDependentService.countAssociation(query);
      if (!countedAssociation){
        return res.recordNotFound();
      }
      return res.success({ data :countedAssociation });
    }
    let deletedAssociation = await deleteDependentService.deleteUser(query);
    if (!deletedAssociation){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedAssociation });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Association in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAssociation = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedAssociation = await deleteDependentService.countAssociation(query);
      if (!countedAssociation) {
        return res.recordNotFound();
      }
      return res.success({ data: countedAssociation });            
    }
    let deletedAssociation = await deleteDependentService.deleteAssociation(query);
    if (!deletedAssociation) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedAssociation });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Association from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Association.
 * @return {Object} : number of deactivated documents of Association. {status, message, data}
 */
const softDeleteManyAssociation = async (req, res) => {
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
    let updatedAssociation = await deleteDependentService.softDeleteAssociation(query, updateBody);
    if (!updatedAssociation) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAssociation });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAssociation,
  bulkInsertAssociation,
  findAllAssociation,
  getAssociation,
  getAssociationCount,
  updateAssociation,
  bulkUpdateAssociation,
  partialUpdateAssociation,
  softDeleteAssociation,
  deleteAssociation,
  deleteManyAssociation,
  softDeleteManyAssociation,
};
