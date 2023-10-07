/**
 * contactValidation.js
 * @description :: validate each post and put request as per contact model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of contact */
exports.schemaKeys = joi.object({
  idContact: joi.number().integer().allow(0),
  idAccount: joi.number().integer().allow(0),
  position: joi.string().allow(null).allow(''),
  organization: joi.string().allow(null).allow(''),
  pointPerson: joi.string().allow(null).allow(''),
  pointEmail: joi.string().allow(null).allow(''),
  facebookId: joi.string().allow(null).allow(''),
  instagramId: joi.string().allow(null).allow(''),
  twitterId: joi.string().allow(null).allow(''),
  ambassadorStatus: joi.number().integer().allow(0),
  ambassadorCertificate: joi.string().allow(null).allow(''),
  otherTag: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of contact for updation */
exports.updateSchemaKeys = joi.object({
  idContact: joi.number().integer().allow(0),
  idAccount: joi.number().integer().allow(0),
  position: joi.string().allow(null).allow(''),
  organization: joi.string().allow(null).allow(''),
  pointPerson: joi.string().allow(null).allow(''),
  pointEmail: joi.string().allow(null).allow(''),
  facebookId: joi.string().allow(null).allow(''),
  instagramId: joi.string().allow(null).allow(''),
  twitterId: joi.string().allow(null).allow(''),
  ambassadorStatus: joi.number().integer().allow(0),
  ambassadorCertificate: joi.string().allow(null).allow(''),
  otherTag: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of contact for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idContact: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      idAccount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      position: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      organization: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pointPerson: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pointEmail: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      facebookId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      instagramId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      twitterId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ambassadorStatus: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ambassadorCertificate: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      otherTag: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
