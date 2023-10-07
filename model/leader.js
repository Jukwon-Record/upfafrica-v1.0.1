/**
 * leader.js
 * @description :: sequelize model of database table leader
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Leader = sequelize.define('leader',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idLeader:{ type:DataTypes.INTEGER },
  idAccount:{ type:DataTypes.INTEGER },
  currentPosition:{ type:DataTypes.STRING },
  appointmentDate:{ type:DataTypes.DATEONLY },
  previousPosition:{ type:DataTypes.STRING },
  highestEducation:{ type:DataTypes.STRING },
  idAssociation:{ type:DataTypes.INTEGER },
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
      async function (leader,options){
        leader.isActive = true;
        leader.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (leader,options){
        if (leader !== undefined && leader.length) { 
          for (let index = 0; index < leader.length; index++) { 
        
            const element = leader[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Leader.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Leader);
sequelizePaginate.paginate(Leader);
module.exports = Leader;
