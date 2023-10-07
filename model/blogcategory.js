/**
 * blogcategory.js
 * @description :: sequelize model of database table blogcategory
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Blogcategory = sequelize.define('blogcategory',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  idBlogCategory:{
    type:DataTypes.INTEGER,
    unique:true
  },
  name:{ type:DataTypes.STRING },
  description:{ type:DataTypes.TEXT },
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
      async function (blogcategory,options){
        blogcategory.isActive = true;
        blogcategory.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (blogcategory,options){
        if (blogcategory !== undefined && blogcategory.length) { 
          for (let index = 0; index < blogcategory.length; index++) { 
        
            const element = blogcategory[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Blogcategory.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Blogcategory);
sequelizePaginate.paginate(Blogcategory);
module.exports = Blogcategory;
