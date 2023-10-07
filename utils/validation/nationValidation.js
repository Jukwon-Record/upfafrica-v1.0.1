/**
 * nationValidation.js
 * @description :: validate each post and put request as per nation model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of nation */
exports.schemaKeys = joi.object({
  idNation: joi.number().integer().allow(0),
  nameNation: joi.string().allow(null).allow(''),
  idSubRegion: joi.number().integer().allow(0),
  idRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of nation for updation */
exports.updateSchemaKeys = joi.object({
  idNation: joi.number().integer().allow(0),
  nameNation: joi.string().allow(null).allow(''),
  idSubRegion: joi.number().integer().allow(0),
  idRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of nation for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idNation: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      nameNation: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      idSubRegion: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      idRegion: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
