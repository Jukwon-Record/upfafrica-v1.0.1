/**
 * activity.js
 * @description :: sequelize model of database table activity
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Activity = sequelize.define('activity',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idActivity:{
    type:DataTypes.INTEGER,
    unique:true
  },
  nameActivity:{ type:DataTypes.STRING },
  type:{ type:DataTypes.STRING },
  theme:{ type:DataTypes.STRING },
  eventScale:{ type:DataTypes.STRING },
  date:{ type:DataTypes.DATE },
  duration:{ type:DataTypes.INTEGER },
  host:{ type:DataTypes.STRING },
  numberParticipant:{ type:DataTypes.INTEGER },
  listParticipant:{ type:DataTypes.TEXT },
  fullReport:{ type:DataTypes.STRING },
  coverImage:{ type:DataTypes.STRING },
  album:{ type:DataTypes.STRING },
  status:{ type:DataTypes.TINYINT },
  idNation:{ type:DataTypes.INTEGER },
  idRegion:{ type:DataTypes.INTEGER },
  idSubRegion:{ type:DataTypes.INTEGER },
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
      async function (activity,options){
        activity.isActive = true;
        activity.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (activity,options){
        if (activity !== undefined && activity.length) { 
          for (let index = 0; index < activity.length; index++) { 
        
            const element = activity[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Activity.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Activity);
sequelizePaginate.paginate(Activity);
module.exports = Activity;
