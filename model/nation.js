/**
 * nation.js
 * @description :: sequelize model of database table nation
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Nation = sequelize.define('nation',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idNation:{
    type:DataTypes.INTEGER,
    unique:true
  },
  nameNation:{ type:DataTypes.STRING },
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
      async function (nation,options){
        nation.isActive = true;
        nation.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (nation,options){
        if (nation !== undefined && nation.length) { 
          for (let index = 0; index < nation.length; index++) { 
        
            const element = nation[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Nation.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Nation);
sequelizePaginate.paginate(Nation);
module.exports = Nation;
