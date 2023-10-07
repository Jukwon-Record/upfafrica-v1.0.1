/**
 * accountValidation.js
 * @description :: validate each post and put request as per account model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  

/** validation keys and properties of account */
exports.schemaKeys = joi.object({
  userType: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  idAccount: joi.number().integer().allow(0),
  firstName: joi.string().allow(null).allow(''),
  middleName: joi.string().allow(null).allow(''),
  lastName: joi.string().allow(null).allow(''),
  gender: joi.string().allow(null).allow(''),
  birthDate: joi.date().options({ convert: true }).allow(null).allow(''),
  eMail: joi.string().allow(null).allow(''),
  userCode: joi.string().allow(null).allow(''),
  officePhone: joi.string().allow(null).allow(''),
  homePhone: joi.string().allow(null).allow(''),
  religion: joi.string().allow(null).allow(''),
  street: joi.string().allow(null).allow(''),
  city: joi.string().allow(null).allow(''),
  idNation: joi.number().integer().allow(0),
  idImage: joi.number().integer().allow(0),
  biography: joi.any(),
  email: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  ssoAuth: joi.object({
    linkedinId:joi.string(),
    googleId:joi.string()
  })
}).unknown(true);

/** validation keys and properties of account for updation */
exports.updateSchemaKeys = joi.object({
  userType: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  idAccount: joi.number().integer().allow(0),
  firstName: joi.string().allow(null).allow(''),
  middleName: joi.string().allow(null).allow(''),
  lastName: joi.string().allow(null).allow(''),
  gender: joi.string().allow(null).allow(''),
  birthDate: joi.date().options({ convert: true }).allow(null).allow(''),
  eMail: joi.string().allow(null).allow(''),
  userCode: joi.string().allow(null).allow(''),
  officePhone: joi.string().allow(null).allow(''),
  homePhone: joi.string().allow(null).allow(''),
  religion: joi.string().allow(null).allow(''),
  street: joi.string().allow(null).allow(''),
  city: joi.string().allow(null).allow(''),
  idNation: joi.number().integer().allow(0),
  idImage: joi.number().integer().allow(0),
  biography: joi.any(),
  email: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  ssoAuth: joi.object({
    linkedinId:joi.string(),
    googleId:joi.string()
  }),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of account for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      userType: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      idAccount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      firstName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      middleName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      lastName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      gender: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      birthDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      eMail: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      userCode: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      officePhone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      homePhone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      religion: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      street: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      city: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      idNation: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      idImage: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      biography: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ssoAuth: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
