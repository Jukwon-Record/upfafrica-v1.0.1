/**
 * leaderValidation.js
 * @description :: validate each post and put request as per leader model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of leader */
exports.schemaKeys = joi.object({
  idLeader: joi.number().integer().allow(0),
  idAccount: joi.number().integer().allow(0),
  currentPosition: joi.string().allow(null).allow(''),
  appointmentDate: joi.any(),
  previousPosition: joi.string().allow(null).allow(''),
  highestEducation: joi.string().allow(null).allow(''),
  idAssociation: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of leader for updation */
exports.updateSchemaKeys = joi.object({
  idLeader: joi.number().integer().allow(0),
  idAccount: joi.number().integer().allow(0),
  currentPosition: joi.string().allow(null).allow(''),
  appointmentDate: joi.any(),
  previousPosition: joi.string().allow(null).allow(''),
  highestEducation: joi.string().allow(null).allow(''),
  idAssociation: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of leader for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idLeader: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      idAccount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      currentPosition: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      appointmentDate: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      previousPosition: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      highestEducation: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      idAssociation: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
