/**
 * contact.js
 * @description :: sequelize model of database table contact
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Contact = sequelize.define('contact',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idContact:{ type:DataTypes.INTEGER },
  idAccount:{ type:DataTypes.INTEGER },
  position:{ type:DataTypes.STRING },
  organization:{ type:DataTypes.STRING },
  pointPerson:{ type:DataTypes.STRING },
  pointEmail:{ type:DataTypes.STRING },
  facebookId:{ type:DataTypes.STRING },
  instagramId:{ type:DataTypes.STRING },
  twitterId:{ type:DataTypes.STRING },
  ambassadorStatus:{ type:DataTypes.INTEGER },
  ambassadorCertificate:{ type:DataTypes.STRING },
  otherTag:{ type:DataTypes.STRING },
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
      async function (contact,options){
        contact.isActive = true;
        contact.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (contact,options){
        if (contact !== undefined && contact.length) { 
          for (let index = 0; index < contact.length; index++) { 
        
            const element = contact[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Contact.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Contact);
sequelizePaginate.paginate(Contact);
module.exports = Contact;
