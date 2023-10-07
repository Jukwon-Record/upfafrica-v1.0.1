/**
 * assetValidation.js
 * @description :: validate each post and put request as per asset model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of asset */
exports.schemaKeys = joi.object({
  idAsset: joi.number().integer().allow(0),
  nameAsset: joi.string().allow(null).allow(''),
  typeAsset: joi.string().allow(null).allow(''),
  assetImage: joi.string().allow(null).allow(''),
  nameOwner: joi.string().allow(null).allow(''),
  dateEstablishment: joi.any(),
  dateAcquired: joi.any(),
  purposeUse: joi.any(),
  purchaseValue: joi.any(),
  currentValue: joi.any(),
  recordsLegalDocs: joi.any(),
  legalDocs: joi.string().allow(null).allow(''),
  idNation: joi.number().integer().allow(0),
  idSubRegion: joi.number().integer().allow(0),
  idRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of asset for updation */
exports.updateSchemaKeys = joi.object({
  idAsset: joi.number().integer().allow(0),
  nameAsset: joi.string().allow(null).allow(''),
  typeAsset: joi.string().allow(null).allow(''),
  assetImage: joi.string().allow(null).allow(''),
  nameOwner: joi.string().allow(null).allow(''),
  dateEstablishment: joi.any(),
  dateAcquired: joi.any(),
  purposeUse: joi.any(),
  purchaseValue: joi.any(),
  currentValue: joi.any(),
  recordsLegalDocs: joi.any(),
  legalDocs: joi.string().allow(null).allow(''),
  idNation: joi.number().integer().allow(0),
  idSubRegion: joi.number().integer().allow(0),
  idRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of asset for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idAsset: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      nameAsset: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      typeAsset: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      assetImage: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      nameOwner: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      dateEstablishment: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      dateAcquired: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      purposeUse: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      purchaseValue: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      currentValue: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      recordsLegalDocs: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      legalDocs: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      idNation: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
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
