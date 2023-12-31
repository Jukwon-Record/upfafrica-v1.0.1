/**
 * accountController.js
 * @description :: exports action methods for account.
 */

const Account = require('../../model/account');
const accountSchemaKey = require('../../utils/validation/accountValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const auth = require('../../services/auth');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Account in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Account. {status, message, data}
 */ 
const addAccount = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      accountSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAccount = await dbService.createOne(Account,dataToCreate);
    return  res.success({ data :createdAccount });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Account in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Accounts. {status, message, data}
 */
const bulkInsertAccount = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAccount = await dbService.createMany(Account,dataToCreate); 
      return  res.success({ data :{ count :createdAccount.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Account from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Account(s). {status, message, data}
 */
const findAllAccount = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAccount;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      accountSchemaKey.findFilterKeys,
      Account.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    query.id = { $ne: req.user.id };
    if (dataToFind && dataToFind.isCountOnly){
      foundAccount = await dbService.count(Account, query);
      if (!foundAccount) {
        return res.recordNotFound();
      } 
      foundAccount = { totalRecords: foundAccount };
      return res.success({ data :foundAccount });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAccount = await dbService.paginate( Account,query,options);
    if (!foundAccount){
      return res.recordNotFound();
    }
    return res.success({ data:foundAccount }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Account from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Account. {status, message, data}
 */
const getAccount = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAccount = await dbService.findOne(Account,{ id :id });
    if (!foundAccount){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAccount });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Account.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAccountCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      accountSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAccount = await dbService.count(Account,where);
    if (!countedAccount){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAccount } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Account with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Account.
 * @return {Object} : updated Account. {status, message, data}
 */
const updateAccount = async (req, res) => {
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
      accountSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedAccount = await dbService.update(Account,query,dataToUpdate);
    return  res.success({ data :updatedAccount }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Account with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Accounts.
 * @return {Object} : updated Accounts. {status, message, data}
 */
const bulkUpdateAccount = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAccount = await dbService.update(Account,filter,dataToUpdate);
    if (!updatedAccount){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAccount.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Account with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Account.
 * @return {Object} : updated Account. {status, message, data}
 */
const partialUpdateAccount = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      accountSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = {};
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedAccount = await dbService.update(Account, query, dataToUpdate);
    if (!updatedAccount) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAccount });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Account from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Account.
 * @return {Object} : deactivated Account. {status, message, data}
 */
const softDeleteAccount = async (req, res) => {
  try {
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedAccount = await deleteDependentService.softDeleteAccount(query, updateBody);
    if (!updatedAccount){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAccount });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Account from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Account. {status, message, data}
 */
const deleteAccount = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id: req.params.id };
    query.id.$ne = req.user.id;

    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedAccount = await deleteDependentService.countAccount(query);
      if (!countedAccount){
        return res.recordNotFound();
      }
      return res.success({ data :countedAccount });
    }
    let deletedAccount = await deleteDependentService.deleteUser(query);
    if (!deletedAccount){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedAccount });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Account in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAccount = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                          
    query = {
      'id': {
        $in: dataToDelete.ids,
        $ne: req.user.id
      }
    };
    if (dataToDelete.isWarning){
      let countedAccount = await deleteDependentService.countAccount(query);
      if (!countedAccount) {
        return res.recordNotFound();
      }
      return res.success({ data: countedAccount });            
    }
    let deletedAccount = await deleteDependentService.deleteAccount(query);
    if (!deletedAccount) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedAccount });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Account from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Account.
 * @return {Object} : number of deactivated documents of Account. {status, message, data}
 */
const softDeleteManyAccount = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    query = {
      'id': {
        $in: dataToUpdate.ids,
        $ne: req.user.id
      }
    };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedAccount = await deleteDependentService.softDeleteAccount(query, updateBody);
    if (!updatedAccount) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedAccount });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : change password
 * @param {Object} req : request including user credentials.
 * @param {Object} res : response contains updated user record.
 * @return {Object} : updated user record {status, message, data}
 */
const changePassword = async (req, res) => {
  try {
    let params = req.body;
    if (!params.newPassword || !params.oldPassword) {
      return res.validationError();
    }
    let result = await auth.changePassword({
      ...params,
      userId:req.user.id
    });
    if (result.flag){
      return res.failure({ message :result.data });
    }
    return res.success({ message :result.data });
  } catch (error) {
    return res.internalServerError({ data:error.message }); 
  }
};
/**
 * @description : update user profile.
 * @param {Object} req : request including user profile details to update in request body.
 * @param {Object} res : updated user record.
 * @return {Object} : updated user record. {status, message, data}
 */
const updateProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id:req.user.id
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      accountSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    if (data.password) delete data.password;
    if (data.createdAt) delete data.createdAt;
    if (data.updatedAt) delete data.updatedAt;
    if (data.id) delete data.id;
    let result = await dbService.update(Account, { id :req.user.id } ,data);
    if (!result){
      return res.recordNotFound();
    }            
    return  res.success({ data :result });
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : get information of logged-in User.
 * @param {Object} req : authentication token is required
 * @param {Object} res : Logged-in user information
 * @return {Object} : Logged-in user information {status, message, data}
 */
const getLoggedInUserInfo = async (req, res) => {
  try {
    const query = {
      id: req.user.id,
      isDeleted: false
    };
    query.isActive = true;
    let result = await dbService.findOne(User,query);
    if (!result) {
      return res.recordNotFound();
    }
    return res.success({ data: result });
  } catch (error){
    return res.internalServerError({ data: error.message });
  }
};

module.exports = {
  addAccount,
  bulkInsertAccount,
  findAllAccount,
  getAccount,
  getAccountCount,
  updateAccount,
  bulkUpdateAccount,
  partialUpdateAccount,
  softDeleteAccount,
  deleteAccount,
  deleteManyAccount,
  softDeleteManyAccount,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};
