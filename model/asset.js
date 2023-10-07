/**
 * asset.js
 * @description :: sequelize model of database table asset
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Asset = sequelize.define('asset',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idAsset:{ type:DataTypes.INTEGER },
  nameAsset:{ type:DataTypes.STRING },
  typeAsset:{ type:DataTypes.STRING },
  assetImage:{ type:DataTypes.STRING },
  nameOwner:{ type:DataTypes.STRING },
  dateEstablishment:{ type:DataTypes.DATEONLY },
  dateAcquired:{ type:DataTypes.DATEONLY },
  purposeUse:{ type:DataTypes.TEXT },
  purchaseValue:{ type:DataTypes.DOUBLE },
  currentValue:{ type:DataTypes.DOUBLE },
  recordsLegalDocs:{ type:DataTypes.TEXT },
  legalDocs:{ type:DataTypes.STRING },
  idNation:{ type:DataTypes.INTEGER },
  idSubRegion:{ type:DataTypes.INTEGER },
  idRegion:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (asset,options){
        asset.isActive = true;
        asset.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (asset,options){
        if (asset !== undefined && asset.length) { 
          for (let index = 0; index < asset.length; index++) { 
        
            const element = asset[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Asset.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Asset);
sequelizePaginate.paginate(Asset);
module.exports = Asset;
