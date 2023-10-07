/**
 * regionController.js
 * @description :: exports action methods for region.
 */

const Region = require('../../../model/region');
const regionSchemaKey = require('../../../utils/validation/regionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Region in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Region. {status, message, data}
 */ 
const addRegion = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      regionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRegion = await dbService.createOne(Region,dataToCreate);
    return  res.success({ data :createdRegion });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Region in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Regions. {status, message, data}
 */
const bulkInsertRegion = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRegion = await dbService.createMany(Region,dataToCreate); 
      return  res.success({ data :{ count :createdRegion.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Region from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Region(s). {status, message, data}
 */
const findAllRegion = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRegion;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      regionSchemaKey.findFilterKeys,
      Region.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRegion = await dbService.count(Region, query);
      if (!foundRegion) {
        return res.recordNotFound();
      } 
      foundRegion = { totalRecords: foundRegion };
      return res.success({ data :foundRegion });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRegion = await dbService.paginate( Region,query,options);
    if (!foundRegion){
      return res.recordNotFound();
    }
    return res.success({ data:foundRegion }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Region from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Region. {status, message, data}
 */
const getRegion = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRegion = await dbService.findOne(Region,{ id :id });
    if (!foundRegion){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRegion });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Region.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRegionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      regionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRegion = await dbService.count(Region,where);
    if (!countedRegion){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRegion } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Region with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Region.
 * @return {Object} : updated Region. {status, message, data}
 */
const updateRegion = async (req, res) => {
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
      regionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRegion = await dbService.update(Region,query,dataToUpdate);
    return  res.success({ data :updatedRegion }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Region with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Regions.
 * @return {Object} : updated Regions. {status, message, data}
 */
const bulkUpdateRegion = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRegion = await dbService.update(Region,filter,dataToUpdate);
    if (!updatedRegion){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRegion.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Region with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Region.
 * @return {Object} : updated Region. {status, message, data}
 */
const partialUpdateRegion = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      regionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRegion = await dbService.update(Region, query, dataToUpdate);
    if (!updatedRegion) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRegion });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Region from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Region.
 * @return {Object} : deactivated Region. {status, message, data}
 */
const softDeleteRegion = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedRegion = await deleteDependentService.softDeleteRegion(query, updateBody);
    if (!updatedRegion){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedRegion });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Region from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Region. {status, message, data}
 */
const deleteRegion = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedRegion = await deleteDependentService.countRegion(query);
      if (!countedRegion){
        return res.recordNotFound();
      }
      return res.success({ data :countedRegion });
    }
    let deletedRegion = await deleteDependentService.deleteUser(query);
    if (!deletedRegion){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedRegion });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Region in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRegion = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedRegion = await deleteDependentService.countRegion(query);
      if (!countedRegion) {
        return res.recordNotFound();
      }
      return res.success({ data: countedRegion });            
    }
    let deletedRegion = await deleteDependentService.deleteRegion(query);
    if (!deletedRegion) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedRegion });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Region from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Region.
 * @return {Object} : number of deactivated documents of Region. {status, message, data}
 */
const softDeleteManyRegion = async (req, res) => {
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
    let updatedRegion = await deleteDependentService.softDeleteRegion(query, updateBody);
    if (!updatedRegion) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedRegion });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRegion,
  bulkInsertRegion,
  findAllRegion,
  getRegion,
  getRegionCount,
  updateRegion,
  bulkUpdateRegion,
  partialUpdateRegion,
  softDeleteRegion,
  deleteRegion,
  deleteManyRegion,
  softDeleteManyRegion,
};
