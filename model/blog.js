/**
 * blog.js
 * @description :: sequelize model of database table blog
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Blog = sequelize.define('blog',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  tags:{ type:DataTypes.STRING },
  content:{ type:DataTypes.TEXT },
  photo:{ type:DataTypes.STRING },
  posted:{ type:DataTypes.STRING },
  date:{ type:DataTypes.DATEONLY },
  author:{ type:DataTypes.STRING },
  idBlogCategory:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  idActivity:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (blog,options){
        blog.isActive = true;
        blog.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (blog,options){
        if (blog !== undefined && blog.length) { 
          for (let index = 0; index < blog.length; index++) { 
        
            const element = blog[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Blog.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Blog);
sequelizePaginate.paginate(Blog);
module.exports = Blog;
