/**
 * donation.js
 * @description :: sequelize model of database table donation
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Donation = sequelize.define('donation',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  idAccount:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (donation,options){
        donation.isActive = true;
        donation.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (donation,options){
        if (donation !== undefined && donation.length) { 
          for (let index = 0; index < donation.length; index++) { 
        
            const element = donation[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Donation.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Donation);
sequelizePaginate.paginate(Donation);
module.exports = Donation;
