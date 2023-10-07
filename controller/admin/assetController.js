/**
 * assetController.js
 * @description :: exports action methods for asset.
 */

const Asset = require('../../model/asset');
const assetSchemaKey = require('../../utils/validation/assetValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Asset in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Asset. {status, message, data}
 */ 
const addAsset = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      assetSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAsset = await dbService.createOne(Asset,dataToCreate);
    return  res.success({ data :createdAsset });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Asset in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Assets. {status, message, data}
 */
const bulkInsertAsset = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAsset = await dbService.createMany(Asset,dataToCreate); 
      return  res.success({ data :{ count :createdAsset.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Asset from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Asset(s). {status, message, data}
 */
const findAllAsset = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAsset;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      assetSchemaKey.findFilterKeys,
      Asset.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAsset = await dbService.count(Asset, query);
      if (!foundAsset) {
        return res.recordNotFound();
      } 
      foundAsset = { totalRecords: foundAsset };
      return res.success({ data :foundAsset });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAsset = await dbService.paginate( Asset,query,options);
    if (!foundAsset){
      return res.recordNotFound();
    }
    return res.success({ data:foundAsset }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Asset from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Asset. {status, message, data}
 */
const getAsset = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAsset = await dbService.findOne(Asset,{ id :id });
    if (!foundAsset){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAsset });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Asset.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAssetCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      assetSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAsset = await dbService.count(Asset,where);
    if (!countedAsset){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAsset } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Asset with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Asset.
 * @return {Object} : updated Asset. {status, message, data}
 */
const updateAsset = async (req, res) => {
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
      assetSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAsset = await dbService.update(Asset,query,dataToUpdate);
    return  res.success({ data :updatedAsset }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Asset with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Assets.
 * @return {Object} : updated Assets. {status, message, data}
 */
const bulkUpdateAsset = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAsset = await dbService.update(Asset,filter,dataToUpdate);
    if (!updatedAsset){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAsset.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Asset with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Asset.
 * @return {Object} : updated Asset. {status, message, data}
 */
const partialUpdateAsset = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      assetSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAsset = await dbService.update(Asset, query, dataToUpdate);
    if (!updatedAsset) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAsset });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Asset from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Asset.
 * @return {Object} : deactivated Asset. {status, message, data}
 */
const softDeleteAsset = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Asset, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Asset from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Asset. {status, message, data}
 */
const deleteAsset = async (req, res) => {
  const result = await dbService.deleteByPk(Asset, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Asset in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAsset = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAsset = await dbService.destroy(Asset,query);
    return res.success({ data :{ count :deletedAsset.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Asset from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Asset.
 * @return {Object} : number of deactivated documents of Asset. {status, message, data}
 */
const softDeleteManyAsset = async (req, res) => {
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
    let updatedAsset = await dbService.update(Asset,query,updateBody, options);
    if (!updatedAsset) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAsset.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAsset,
  bulkInsertAsset,
  findAllAsset,
  getAsset,
  getAssetCount,
  updateAsset,
  bulkUpdateAsset,
  partialUpdateAsset,
  softDeleteAsset,
  deleteAsset,
  deleteManyAsset,
  softDeleteManyAsset,
};
