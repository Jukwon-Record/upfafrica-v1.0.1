/**
 * subregionValidation.js
 * @description :: validate each post and put request as per subregion model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of subregion */
exports.schemaKeys = joi.object({
  idSubRegion: joi.number().integer().allow(0),
  nameSubRegion: joi.string().allow(null).allow(''),
  idRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of subregion for updation */
exports.updateSchemaKeys = joi.object({
  idSubRegion: joi.number().integer().allow(0),
  nameSubRegion: joi.string().allow(null).allow(''),
  idRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of subregion for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idSubRegion: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      nameSubRegion: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
