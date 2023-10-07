/**
 * contactController.js
 * @description :: exports action methods for contact.
 */

const Contact = require('../../../model/contact');
const contactSchemaKey = require('../../../utils/validation/contactValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Contact in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Contact. {status, message, data}
 */ 
const addContact = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      contactSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdContact = await dbService.createOne(Contact,dataToCreate);
    return  res.success({ data :createdContact });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Contact in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Contacts. {status, message, data}
 */
const bulkInsertContact = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdContact = await dbService.createMany(Contact,dataToCreate); 
      return  res.success({ data :{ count :createdContact.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Contact from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Contact(s). {status, message, data}
 */
const findAllContact = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundContact;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      contactSchemaKey.findFilterKeys,
      Contact.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundContact = await dbService.count(Contact, query);
      if (!foundContact) {
        return res.recordNotFound();
      } 
      foundContact = { totalRecords: foundContact };
      return res.success({ data :foundContact });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundContact = await dbService.paginate( Contact,query,options);
    if (!foundContact){
      return res.recordNotFound();
    }
    return res.success({ data:foundContact }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Contact from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Contact. {status, message, data}
 */
const getContact = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundContact = await dbService.findOne(Contact,{ id :id });
    if (!foundContact){
      return res.recordNotFound();
    }
    return  res.success({ data :foundContact });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Contact.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getContactCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      contactSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedContact = await dbService.count(Contact,where);
    if (!countedContact){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedContact } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Contact with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Contact.
 * @return {Object} : updated Contact. {status, message, data}
 */
const updateContact = async (req, res) => {
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
      contactSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedContact = await dbService.update(Contact,query,dataToUpdate);
    return  res.success({ data :updatedContact }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Contact with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Contacts.
 * @return {Object} : updated Contacts. {status, message, data}
 */
const bulkUpdateContact = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedContact = await dbService.update(Contact,filter,dataToUpdate);
    if (!updatedContact){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedContact.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Contact with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Contact.
 * @return {Object} : updated Contact. {status, message, data}
 */
const partialUpdateContact = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      contactSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedContact = await dbService.update(Contact, query, dataToUpdate);
    if (!updatedContact) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedContact });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Contact from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Contact.
 * @return {Object} : deactivated Contact. {status, message, data}
 */
const softDeleteContact = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Contact, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Contact from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Contact. {status, message, data}
 */
const deleteContact = async (req, res) => {
  const result = await dbService.deleteByPk(Contact, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Contact in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyContact = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedContact = await dbService.destroy(Contact,query);
    return res.success({ data :{ count :deletedContact.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Contact from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Contact.
 * @return {Object} : number of deactivated documents of Contact. {status, message, data}
 */
const softDeleteManyContact = async (req, res) => {
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
    let updatedContact = await dbService.update(Contact,query,updateBody, options);
    if (!updatedContact) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedContact.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addContact,
  bulkInsertContact,
  findAllContact,
  getContact,
  getContactCount,
  updateContact,
  bulkUpdateContact,
  partialUpdateContact,
  softDeleteContact,
  deleteContact,
  deleteManyContact,
  softDeleteManyContact,
};
