/**
 * account.js
 * @description :: sequelize model of database table account
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const bcrypt = require('bcrypt');
let Account = sequelize.define('account',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  userType:{ type:DataTypes.INTEGER },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  idAccount:{
    type:DataTypes.INTEGER,
    unique:true
  },
  firstName:{ type:DataTypes.STRING },
  middleName:{ type:DataTypes.STRING },
  lastName:{ type:DataTypes.STRING },
  gender:{ type:DataTypes.STRING },
  birthDate:{ type:DataTypes.DATE },
  eMail:{ type:DataTypes.STRING },
  userCode:{ type:DataTypes.STRING },
  officePhone:{ type:DataTypes.STRING },
  homePhone:{ type:DataTypes.STRING },
  religion:{ type:DataTypes.STRING },
  street:{ type:DataTypes.STRING },
  city:{ type:DataTypes.STRING },
  idNation:{ type:DataTypes.INTEGER },
  idImage:{ type:DataTypes.INTEGER },
  biography:{ type:DataTypes.TEXT },
  email:{ type:DataTypes.STRING },
  mobileNo:{ type:DataTypes.STRING },
  linkedinId:{ type:DataTypes.STRING },
  googleId:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (account,options){
        if (account.userCode){ account.userCode =
          await bcrypt.hash(account.userCode, 8);}
        account.isActive = true;
        account.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (account,options){
        if (account !== undefined && account.length) { 
          for (let index = 0; index < account.length; index++) { 
            const element = account[index];
            if (element.userCode){ 
              element.userCode = await bcrypt.hash(element.userCode, 8);
            }
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
    afterCreate: [
      async function (account,options){
        sequelize.model('userAuthSettings').create({ userId:account.id });
      },
    ],
  }
}
);
Account.prototype.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.userCode);
};
Account.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.userCode;
  return values;
};
sequelizeTransforms(Account);
sequelizePaginate.paginate(Account);
module.exports = Account;
