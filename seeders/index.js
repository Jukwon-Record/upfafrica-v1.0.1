/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.account,{ 'eMail':'Hildegard_Purdy17@gmail.com' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'userCode':'g8i2trrjtd',
        'isDeleted':false,
        'eMail':'Hildegard_Purdy17@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.account,userToBeInserted);
    } else {
      userToBeInserted = {
        'userCode':'g8i2trrjtd',
        'isDeleted':false,
        'eMail':'Hildegard_Purdy17@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.account, { 'eMail':'Hildegard_Purdy17@gmail.com' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.account,{ 'eMail':'Sydnie86@hotmail.com' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'userCode':'lz39dgmpbg',
        'isDeleted':false,
        'eMail':'Sydnie86@hotmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.account,userToBeInserted);
    } else {
      userToBeInserted = {
        'userCode':'lz39dgmpbg',
        'isDeleted':false,
        'eMail':'Sydnie86@hotmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.account, { 'eMail':'Sydnie86@hotmail.com' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'SG', 'Admin', 'SuperAdmin', 'System_User', 'User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/account/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/account/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/account/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/account/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/account/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/account/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/account/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/account/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/account/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/account/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/account/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/account/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/account/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/account/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/account/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/account/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/account/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/account/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/account/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/account/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/account/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/account/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/account/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/account/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/account/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/account/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/account/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/account/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/account/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/account/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/account/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/account/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/account/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/account/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/account/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/account/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/account/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/account/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/account/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/account/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/account/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/account/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/account/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/account/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/account/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/account/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/account/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/account/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/account/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/account/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/account/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/account/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activity/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/activity/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activity/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/activity/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/activity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activity/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/activity/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/activity/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/activity/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/activity/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/activity/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/activity/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/activity/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activity/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/activity/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/activity/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/activity/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/activity/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/activity/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activity/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/activity/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activity/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/activity/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/activity/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activity/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/activity/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activity/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/activity/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/activity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activity/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/activity/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/activity/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/activity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activity/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/activity/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/activity/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/activity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/asset/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/asset/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/asset/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/asset/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/asset/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/asset/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/asset/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/asset/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/asset/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/asset/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/asset/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/asset/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/asset/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/asset/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/asset/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/asset/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/update/:id',
        role: 'SuperAdmin',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/asset/partial-update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/asset/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/asset/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/asset/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/asset/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/asset/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/asset/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/asset/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/asset/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/asset/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/asset/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/asset/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/asset/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/asset/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/asset/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/asset/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/asset/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/association/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/association/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/association/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/association/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/association/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/association/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/association/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/association/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/association/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/association/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/association/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/association/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/association/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/association/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/association/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/association/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/association/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/association/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/association/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/association/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/association/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/association/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/association/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/association/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/association/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/association/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/association/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/association/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/association/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/association/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/association/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/association/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/association/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/association/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/association/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/association/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/association/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/association/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/association/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/association/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/admin/association/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/association/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/association/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/association/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/association/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/association/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/association/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/blog/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/blog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/blog/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'SuperAdmin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blog/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blog/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/deletemany',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/blogcategory/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/blogcategory/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/blogcategory/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/blogcategory/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/blogcategory/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blogcategory/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/blogcategory/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blogcategory/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/admin/blogcategory/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/blogcategory/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/blogcategory/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blogcategory/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/blogcategory/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/blogcategory/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contact/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/contact/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/contact/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/contact/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contact/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/contact/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/contact/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/contact/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/contact/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/contact/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/contact/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/contact/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/contact/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/contact/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/contact/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/contact/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contact/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/contact/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/contact/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contact/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contact/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contact/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/contact/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/contact/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contact/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/contact/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/contact/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/contact/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/contact/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/contact/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/contact/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contact/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/contact/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/contact/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/donation/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/donation/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/donation/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/donation/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/donation/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/donation/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/donation/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/donation/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/donation/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/donation/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/donation/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/donation/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/donation/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/donation/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/donation/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/donation/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/donation/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/donation/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/donation/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/donation/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/donation/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/donation/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/donation/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/donation/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/donation/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/donation/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/donation/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/donation/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/donation/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/donation/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/donation/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/donation/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/donation/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/donation/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/donation/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/image/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/image/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/image/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/image/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/image/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/image/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/image/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/image/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/image/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/image/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/image/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/image/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'SuperAdmin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/image/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/image/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/image/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/image/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/image/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/image/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/image/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/image/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/image/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/image/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/leader/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/leader/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/leader/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/leader/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/leader/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/leader/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/leader/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/leader/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/leader/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/leader/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/leader/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/leader/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/leader/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/leader/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/leader/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/leader/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/leader/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/leader/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/leader/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/leader/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/leader/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/leader/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/leader/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/leader/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/leader/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/leader/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/leader/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/leader/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/leader/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/leader/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/leader/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/leader/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/leader/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/leader/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/leader/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/leader/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/nation/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/nation/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/nation/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/nation/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/nation/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/nation/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/nation/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/nation/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/nation/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/nation/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/nation/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/nation/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/nation/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/nation/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/nation/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/nation/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/nation/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/nation/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/nation/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/nation/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/nation/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/nation/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/nation/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/nation/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/nation/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/nation/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/nation/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/nation/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/nation/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/nation/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/nation/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/nation/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/nation/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/nation/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/nation/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/nation/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/nation/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/region/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/region/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/region/create',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/region/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/region/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/region/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/region/addbulk',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/region/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/region/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/region/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/region/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/region/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/region/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/region/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/region/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/region/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/region/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/region/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/region/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/region/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/region/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/region/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/region/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/region/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/region/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/region/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/region/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/region/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/region/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/region/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/region/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/region/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/region/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/region/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/region/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/region/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/region/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/region/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/region/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/region/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/region/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/region/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/region/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/region/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/region/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/region/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/region/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/region/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/region/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/region/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/region/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/region/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/region/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/region/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subregion/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/subregion/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subregion/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/subregion/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subregion/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/list',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/admin/subregion/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/subregion/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/subregion/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/admin/subregion/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/subregion/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/count',
        role: 'SuperAdmin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subregion/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/softdelete/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/softdeletemany',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/admin/subregion/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subregion/delete/:id',
        role: 'SG',
        method: 'DELETE' 
      },
      {
        route: '/admin/subregion/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/subregion/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/admin/subregion/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/subregion/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subregion/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/admin/subregion/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/account/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/account/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/account/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/account/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/account/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/account/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/account/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/account/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/activity/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/addbulk',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/activity/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/activity/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/activity/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/activity/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/activity/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activity/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/activity/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activity/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activity/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activity/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activity/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/asset/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/asset/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/asset/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/asset/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/asset/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/asset/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/device/api/v1/asset/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/device/api/v1/asset/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/asset/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/asset/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/asset/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/asset/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/asset/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/asset/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/create',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/addbulk',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/list',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/association/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/association/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/association/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/association/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/association/count',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/association/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/association/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/association/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/association/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/association/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/association/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'SuperAdmin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/create',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/addbulk',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/list',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blogcategory/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blogcategory/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blogcategory/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blogcategory/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blogcategory/count',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blogcategory/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blogcategory/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blogcategory/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blogcategory/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blogcategory/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blogcategory/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/contact/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/contact/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/contact/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/contact/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/contact/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/contact/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contact/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contact/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contact/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contact/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contact/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contact/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contact/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/donation/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/addbulk',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/donation/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/donation/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/donation/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/donation/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/donation/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/donation/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/donation/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/donation/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/donation/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/donation/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/donation/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/donation/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/donation/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/donation/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/image/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'SG',
        method: 'PUT' 
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/leader/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/leader/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/leader/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/leader/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/leader/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/leader/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/leader/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/leader/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/leader/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/leader/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/leader/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/leader/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/nation/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/nation/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/nation/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/nation/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/nation/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/nation/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/nation/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/nation/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/nation/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/nation/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/nation/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/nation/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/create',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/addbulk',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/region/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/region/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/region/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/region/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/region/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/region/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/region/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/region/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/region/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/region/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/region/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/region/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/create',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/create',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/addbulk',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/addbulk',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/list',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/subregion/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/list',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/:id',
        role: 'SG',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/subregion/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/subregion/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/subregion/:id',
        role: 'SuperAdmin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/subregion/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/subregion/count',
        role: 'SG',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/subregion/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/count',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/partial-update/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/partial-update/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/updatebulk',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/updatebulk',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdelete/:id',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdelete/:id',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdeletemany',
        role: 'SG',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdeletemany',
        role: 'SuperAdmin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/subregion/delete/:id',
        role: 'SG',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/subregion/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/subregion/delete/:id',
        role: 'SuperAdmin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/subregion/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/subregion/deletemany',
        role: 'SG',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/deletemany',
        role: 'SuperAdmin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/subregion/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'SG', 'Admin', 'SuperAdmin', 'System_User', 'User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'eMail':'Hildegard_Purdy17@gmail.com',
      'userCode':'g8i2trrjtd'
    },{
      'eMail':'Sydnie86@hotmail.com',
      'userCode':'lz39dgmpbg'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.account, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;