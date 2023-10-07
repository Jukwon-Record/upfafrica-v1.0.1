/**
 * association.js
 * @description :: sequelize model of database table association
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Association = sequelize.define('association',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idAssociation:{
    type:DataTypes.INTEGER,
    unique:true
  },
  name:{ type:DataTypes.STRING },
  decription:{ type:DataTypes.TEXT },
  tag:{ type:DataTypes.STRING },
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
      async function (association,options){
        association.isActive = true;
        association.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (association,options){
        if (association !== undefined && association.length) { 
          for (let index = 0; index < association.length; index++) { 
        
            const element = association[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Association.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Association);
sequelizePaginate.paginate(Association);
module.exports = Association;
