/**
 * blogcategoryValidation.js
 * @description :: validate each post and put request as per blogcategory model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of blogcategory */
exports.schemaKeys = joi.object({
  idBlogCategory: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  description: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of blogcategory for updation */
exports.updateSchemaKeys = joi.object({
  idBlogCategory: joi.number().integer().allow(0),
  name: joi.string().allow(null).allow(''),
  description: joi.any(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of blogcategory for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idBlogCategory: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
