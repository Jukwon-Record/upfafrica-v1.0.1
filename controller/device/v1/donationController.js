/**
 * donationController.js
 * @description :: exports action methods for donation.
 */

const Donation = require('../../../model/donation');
const donationSchemaKey = require('../../../utils/validation/donationValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Donation in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Donation. {status, message, data}
 */ 
const addDonation = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      donationSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdDonation = await dbService.createOne(Donation,dataToCreate);
    return  res.success({ data :createdDonation });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Donation in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Donations. {status, message, data}
 */
const bulkInsertDonation = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdDonation = await dbService.createMany(Donation,dataToCreate); 
      return  res.success({ data :{ count :createdDonation.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Donation from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Donation(s). {status, message, data}
 */
const findAllDonation = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundDonation;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      donationSchemaKey.findFilterKeys,
      Donation.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundDonation = await dbService.count(Donation, query);
      if (!foundDonation) {
        return res.recordNotFound();
      } 
      foundDonation = { totalRecords: foundDonation };
      return res.success({ data :foundDonation });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundDonation = await dbService.paginate( Donation,query,options);
    if (!foundDonation){
      return res.recordNotFound();
    }
    return res.success({ data:foundDonation }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Donation from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Donation. {status, message, data}
 */
const getDonation = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundDonation = await dbService.findOne(Donation,{ id :id });
    if (!foundDonation){
      return res.recordNotFound();
    }
    return  res.success({ data :foundDonation });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Donation.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getDonationCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      donationSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedDonation = await dbService.count(Donation,where);
    if (!countedDonation){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedDonation } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Donation with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Donation.
 * @return {Object} : updated Donation. {status, message, data}
 */
const updateDonation = async (req, res) => {
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
      donationSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedDonation = await dbService.update(Donation,query,dataToUpdate);
    return  res.success({ data :updatedDonation }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Donation with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Donations.
 * @return {Object} : updated Donations. {status, message, data}
 */
const bulkUpdateDonation = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedDonation = await dbService.update(Donation,filter,dataToUpdate);
    if (!updatedDonation){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedDonation.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Donation with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Donation.
 * @return {Object} : updated Donation. {status, message, data}
 */
const partialUpdateDonation = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      donationSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedDonation = await dbService.update(Donation, query, dataToUpdate);
    if (!updatedDonation) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedDonation });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Donation from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Donation.
 * @return {Object} : deactivated Donation. {status, message, data}
 */
const softDeleteDonation = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Donation, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Donation from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Donation. {status, message, data}
 */
const deleteDonation = async (req, res) => {
  const result = await dbService.deleteByPk(Donation, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Donation in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyDonation = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedDonation = await dbService.destroy(Donation,query);
    return res.success({ data :{ count :deletedDonation.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Donation from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Donation.
 * @return {Object} : number of deactivated documents of Donation. {status, message, data}
 */
const softDeleteManyDonation = async (req, res) => {
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
    let updatedDonation = await dbService.update(Donation,query,updateBody, options);
    if (!updatedDonation) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedDonation.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addDonation,
  bulkInsertDonation,
  findAllDonation,
  getDonation,
  getDonationCount,
  updateDonation,
  bulkUpdateDonation,
  partialUpdateDonation,
  softDeleteDonation,
  deleteDonation,
  deleteManyDonation,
  softDeleteManyDonation,
};
