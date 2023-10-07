/**
 * subregion.js
 * @description :: sequelize model of database table subregion
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Subregion = sequelize.define('subregion',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idSubRegion:{
    type:DataTypes.INTEGER,
    unique:true
  },
  nameSubRegion:{ type:DataTypes.STRING },
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
      async function (subregion,options){
        subregion.isActive = true;
        subregion.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (subregion,options){
        if (subregion !== undefined && subregion.length) { 
          for (let index = 0; index < subregion.length; index++) { 
        
            const element = subregion[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Subregion.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Subregion);
sequelizePaginate.paginate(Subregion);
module.exports = Subregion;
