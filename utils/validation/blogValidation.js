/**
 * blogValidation.js
 * @description :: validate each post and put request as per blog model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of blog */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  tags: joi.string().allow(null).allow(''),
  content: joi.any(),
  photo: joi.string().allow(null).allow(''),
  posted: joi.string().allow(null).allow(''),
  date: joi.any(),
  author: joi.string().allow(null).allow(''),
  idBlogCategory: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  idActivity: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of blog for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  tags: joi.string().allow(null).allow(''),
  content: joi.any(),
  photo: joi.string().allow(null).allow(''),
  posted: joi.string().allow(null).allow(''),
  date: joi.any(),
  author: joi.string().allow(null).allow(''),
  idBlogCategory: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  idActivity: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of blog for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tags: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      content: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      photo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      posted: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      date: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      author: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      idBlogCategory: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      idActivity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
