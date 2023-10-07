/**
 * activityValidation.js
 * @description :: validate each post and put request as per activity model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of activity */
exports.schemaKeys = joi.object({
  idActivity: joi.number().integer().allow(0),
  nameActivity: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  theme: joi.string().allow(null).allow(''),
  eventScale: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  duration: joi.number().integer().allow(0),
  host: joi.string().allow(null).allow(''),
  numberParticipant: joi.number().integer().allow(0),
  listParticipant: joi.any(),
  fullReport: joi.string().allow(null).allow(''),
  coverImage: joi.string().allow(null).allow(''),
  album: joi.string().allow(null).allow(''),
  status: joi.any(),
  idNation: joi.number().integer().allow(0),
  idRegion: joi.number().integer().allow(0),
  idSubRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of activity for updation */
exports.updateSchemaKeys = joi.object({
  idActivity: joi.number().integer().allow(0),
  nameActivity: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  theme: joi.string().allow(null).allow(''),
  eventScale: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  duration: joi.number().integer().allow(0),
  host: joi.string().allow(null).allow(''),
  numberParticipant: joi.number().integer().allow(0),
  listParticipant: joi.any(),
  fullReport: joi.string().allow(null).allow(''),
  coverImage: joi.string().allow(null).allow(''),
  album: joi.string().allow(null).allow(''),
  status: joi.any(),
  idNation: joi.number().integer().allow(0),
  idRegion: joi.number().integer().allow(0),
  idSubRegion: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of activity for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      idActivity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      nameActivity: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      theme: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      eventScale: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      duration: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      host: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      numberParticipant: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      listParticipant: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      fullReport: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      coverImage: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      album: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      idNation: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      idRegion: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      idSubRegion: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
