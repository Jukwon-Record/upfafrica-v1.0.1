/**
 * region.js
 * @description :: sequelize model of database table region
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Region = sequelize.define('region',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idRegion:{
    type:DataTypes.INTEGER,
    unique:true
  },
  nameRegion:{ type:DataTypes.STRING },
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
      async function (region,options){
        region.isActive = true;
        region.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (region,options){
        if (region !== undefined && region.length) { 
          for (let index = 0; index < region.length; index++) { 
        
            const element = region[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Region.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Region);
sequelizePaginate.paginate(Region);
module.exports = Region;
