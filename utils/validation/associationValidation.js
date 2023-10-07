/**
 * associationValidation.js
 * @description :: validate each post and put request as per association model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of association */
exports.schemaKeys = joi.object({
  idAssociation: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  decription: joi.any(),
  tag: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of association for updation */
exports.updateSchemaKeys = joi.object({
  idAssociation: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  decription: joi.any(),
  tag: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of association for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idAssociation: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      decription: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      tag: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
