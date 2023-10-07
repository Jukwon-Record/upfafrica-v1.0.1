/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Activity = require('../model/activity');
let Subregion = require('../model/subregion');
let Region = require('../model/region');
let Nation = require('../model/nation');
let Leader = require('../model/leader');
let Image = require('../model/image');
let Donation = require('../model/donation');
let Contact = require('../model/contact');
let Blogcategory = require('../model/blogcategory');
let Blog = require('../model/blog');
let Association = require('../model/association');
let Asset = require('../model/asset');
let Account = require('../model/account');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let PushNotification = require('../model/pushNotification');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteActivity = async (filter) =>{
  try {
    let activity = await dbService.findAll(Activity,filter);
    if (activity && activity.length){
      activity = activity.map((obj) => obj.id);

      const blogFilter = { $or: [{ idActivity : { $in : activity } }] };
      const blogCnt = await dbService.destroy(Blog,blogFilter);

      let deleted  = await dbService.destroy(Activity,filter);
      let response = { blog :blogCnt.length, };
      return response; 
    } else {
      return {  activity : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSubregion = async (filter) =>{
  try {
    let subregion = await dbService.findAll(Subregion,filter);
    if (subregion && subregion.length){
      subregion = subregion.map((obj) => obj.id);

      const activityFilter = { $or: [{ idSubRegion : { $in : subregion } }] };
      const activityCnt = await dbService.destroy(Activity,activityFilter);

      const nationFilter = { $or: [{ idSubRegion : { $in : subregion } }] };
      const nationCnt = await dbService.destroy(Nation,nationFilter);

      const assetFilter = { $or: [{ idSubRegion : { $in : subregion } }] };
      const assetCnt = await dbService.destroy(Asset,assetFilter);

      let deleted  = await dbService.destroy(Subregion,filter);
      let response = {
        activity :activityCnt.length,
        nation :nationCnt.length,
        asset :assetCnt.length,
      };
      return response; 
    } else {
      return {  subregion : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRegion = async (filter) =>{
  try {
    let region = await dbService.findAll(Region,filter);
    if (region && region.length){
      region = region.map((obj) => obj.id);

      const activityFilter = { $or: [{ idRegion : { $in : region } }] };
      const activityCnt = await dbService.destroy(Activity,activityFilter);

      const subregionFilter = { $or: [{ idRegion : { $in : region } }] };
      const subregionCnt = await dbService.destroy(Subregion,subregionFilter);

      const nationFilter = { $or: [{ idRegion : { $in : region } }] };
      const nationCnt = await dbService.destroy(Nation,nationFilter);

      const assetFilter = { $or: [{ idRegion : { $in : region } }] };
      const assetCnt = await dbService.destroy(Asset,assetFilter);

      let deleted  = await dbService.destroy(Region,filter);
      let response = {
        activity :activityCnt.length,
        subregion :subregionCnt.length,
        nation :nationCnt.length,
        asset :assetCnt.length,
      };
      return response; 
    } else {
      return {  region : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNation = async (filter) =>{
  try {
    let nation = await dbService.findAll(Nation,filter);
    if (nation && nation.length){
      nation = nation.map((obj) => obj.id);

      const activityFilter = { $or: [{ idNation : { $in : nation } }] };
      const activityCnt = await dbService.destroy(Activity,activityFilter);

      const assetFilter = { $or: [{ idNation : { $in : nation } }] };
      const assetCnt = await dbService.destroy(Asset,assetFilter);

      const accountFilter = { $or: [{ idNation : { $in : nation } }] };
      const accountCnt = await dbService.destroy(Account,accountFilter);

      let deleted  = await dbService.destroy(Nation,filter);
      let response = {
        activity :activityCnt.length,
        asset :assetCnt.length,
        account :accountCnt.length,
      };
      return response; 
    } else {
      return {  nation : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteLeader = async (filter) =>{
  try {
    let response  = await dbService.destroy(Leader,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteImage = async (filter) =>{
  try {
    let image = await dbService.findAll(Image,filter);
    if (image && image.length){
      image = image.map((obj) => obj.id);

      const accountFilter = { $or: [{ idImage : { $in : image } }] };
      const accountCnt = await dbService.destroy(Account,accountFilter);

      let deleted  = await dbService.destroy(Image,filter);
      let response = { account :accountCnt.length, };
      return response; 
    } else {
      return {  image : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDonation = async (filter) =>{
  try {
    let response  = await dbService.destroy(Donation,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteContact = async (filter) =>{
  try {
    let response  = await dbService.destroy(Contact,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlogcategory = async (filter) =>{
  try {
    let blogcategory = await dbService.findAll(Blogcategory,filter);
    if (blogcategory && blogcategory.length){
      blogcategory = blogcategory.map((obj) => obj.id);

      const blogFilter = { $or: [{ idBlogCategory : { $in : blogcategory } }] };
      const blogCnt = await dbService.destroy(Blog,blogFilter);

      let deleted  = await dbService.destroy(Blogcategory,filter);
      let response = { blog :blogCnt.length, };
      return response; 
    } else {
      return {  blogcategory : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.destroy(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAssociation = async (filter) =>{
  try {
    let association = await dbService.findAll(Association,filter);
    if (association && association.length){
      association = association.map((obj) => obj.id);

      const leaderFilter = { $or: [{ idAssociation : { $in : association } }] };
      const leaderCnt = await dbService.destroy(Leader,leaderFilter);

      const accountFilter = { $or: [{ idAssociation : { $in : association } }] };
      const accountCnt = await dbService.destroy(Account,accountFilter);

      let deleted  = await dbService.destroy(Association,filter);
      let response = {
        leader :leaderCnt.length,
        account :accountCnt.length,
      };
      return response; 
    } else {
      return {  association : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAsset = async (filter) =>{
  try {
    let response  = await dbService.destroy(Asset,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAccount = async (filter) =>{
  try {
    let account = await dbService.findAll(Account,filter);
    if (account && account.length){
      account = account.map((obj) => obj.id);

      const activityFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const activityCnt = await dbService.destroy(Activity,activityFilter);

      const subregionFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const subregionCnt = await dbService.destroy(Subregion,subregionFilter);

      const regionFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const regionCnt = await dbService.destroy(Region,regionFilter);

      const nationFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const nationCnt = await dbService.destroy(Nation,nationFilter);

      const leaderFilter = { $or: [{ idAccount : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const leaderCnt = await dbService.destroy(Leader,leaderFilter);

      const imageFilter = { $or: [{ idAccount : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const imageCnt = await dbService.destroy(Image,imageFilter);

      const donationFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } },{ idAccount : { $in : account } }] };
      const donationCnt = await dbService.destroy(Donation,donationFilter);

      const contactFilter = { $or: [{ idAccount : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const contactCnt = await dbService.destroy(Contact,contactFilter);

      const blogcategoryFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const blogcategoryCnt = await dbService.destroy(Blogcategory,blogcategoryFilter);

      const blogFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const blogCnt = await dbService.destroy(Blog,blogFilter);

      const associationFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const associationCnt = await dbService.destroy(Association,associationFilter);

      const assetFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const assetCnt = await dbService.destroy(Asset,assetFilter);

      const accountFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const accountCnt = await dbService.destroy(Account,accountFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : account } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Account,filter);
      let response = {
        activity :activityCnt.length,
        subregion :subregionCnt.length,
        region :regionCnt.length,
        nation :nationCnt.length,
        leader :leaderCnt.length,
        image :imageCnt.length,
        donation :donationCnt.length,
        contact :contactCnt.length,
        blogcategory :blogcategoryCnt.length,
        blog :blogCnt.length,
        association :associationCnt.length,
        asset :assetCnt.length,
        account :accountCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  account : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePushNotification = async (filter) =>{
  try {
    let response  = await dbService.destroy(PushNotification,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countActivity = async (filter) =>{
  try {
    let activity = await dbService.findAll(Activity,filter);
    if (activity && activity.length){
      activity = activity.map((obj) => obj.id);

      const blogFilter = { $or: [{ idActivity : { $in : activity } }] };
      const blogCnt =  await dbService.count(Blog,blogFilter);

      let response = { blog : blogCnt, };
      return response; 
    } else {
      return {  activity : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countSubregion = async (filter) =>{
  try {
    let subregion = await dbService.findAll(Subregion,filter);
    if (subregion && subregion.length){
      subregion = subregion.map((obj) => obj.id);

      const activityFilter = { $or: [{ idSubRegion : { $in : subregion } }] };
      const activityCnt =  await dbService.count(Activity,activityFilter);

      const nationFilter = { $or: [{ idSubRegion : { $in : subregion } }] };
      const nationCnt =  await dbService.count(Nation,nationFilter);

      const assetFilter = { $or: [{ idSubRegion : { $in : subregion } }] };
      const assetCnt =  await dbService.count(Asset,assetFilter);

      let response = {
        activity : activityCnt,
        nation : nationCnt,
        asset : assetCnt,
      };
      return response; 
    } else {
      return {  subregion : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRegion = async (filter) =>{
  try {
    let region = await dbService.findAll(Region,filter);
    if (region && region.length){
      region = region.map((obj) => obj.id);

      const activityFilter = { $or: [{ idRegion : { $in : region } }] };
      const activityCnt =  await dbService.count(Activity,activityFilter);

      const subregionFilter = { $or: [{ idRegion : { $in : region } }] };
      const subregionCnt =  await dbService.count(Subregion,subregionFilter);

      const nationFilter = { $or: [{ idRegion : { $in : region } }] };
      const nationCnt =  await dbService.count(Nation,nationFilter);

      const assetFilter = { $or: [{ idRegion : { $in : region } }] };
      const assetCnt =  await dbService.count(Asset,assetFilter);

      let response = {
        activity : activityCnt,
        subregion : subregionCnt,
        nation : nationCnt,
        asset : assetCnt,
      };
      return response; 
    } else {
      return {  region : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countNation = async (filter) =>{
  try {
    let nation = await dbService.findAll(Nation,filter);
    if (nation && nation.length){
      nation = nation.map((obj) => obj.id);

      const activityFilter = { $or: [{ idNation : { $in : nation } }] };
      const activityCnt =  await dbService.count(Activity,activityFilter);

      const assetFilter = { $or: [{ idNation : { $in : nation } }] };
      const assetCnt =  await dbService.count(Asset,assetFilter);

      const accountFilter = { $or: [{ idNation : { $in : nation } }] };
      const accountCnt =  await dbService.count(Account,accountFilter);

      let response = {
        activity : activityCnt,
        asset : assetCnt,
        account : accountCnt,
      };
      return response; 
    } else {
      return {  nation : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countLeader = async (filter) =>{
  try {
    const leaderCnt =  await dbService.count(Leader,filter);
    return { leader : leaderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countImage = async (filter) =>{
  try {
    let image = await dbService.findAll(Image,filter);
    if (image && image.length){
      image = image.map((obj) => obj.id);

      const accountFilter = { $or: [{ idImage : { $in : image } }] };
      const accountCnt =  await dbService.count(Account,accountFilter);

      let response = { account : accountCnt, };
      return response; 
    } else {
      return {  image : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countDonation = async (filter) =>{
  try {
    const donationCnt =  await dbService.count(Donation,filter);
    return { donation : donationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countContact = async (filter) =>{
  try {
    const contactCnt =  await dbService.count(Contact,filter);
    return { contact : contactCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlogcategory = async (filter) =>{
  try {
    let blogcategory = await dbService.findAll(Blogcategory,filter);
    if (blogcategory && blogcategory.length){
      blogcategory = blogcategory.map((obj) => obj.id);

      const blogFilter = { $or: [{ idBlogCategory : { $in : blogcategory } }] };
      const blogCnt =  await dbService.count(Blog,blogFilter);

      let response = { blog : blogCnt, };
      return response; 
    } else {
      return {  blogcategory : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
    const blogCnt =  await dbService.count(Blog,filter);
    return { blog : blogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAssociation = async (filter) =>{
  try {
    let association = await dbService.findAll(Association,filter);
    if (association && association.length){
      association = association.map((obj) => obj.id);

      const leaderFilter = { $or: [{ idAssociation : { $in : association } }] };
      const leaderCnt =  await dbService.count(Leader,leaderFilter);

      const accountFilter = { $or: [{ idAssociation : { $in : association } }] };
      const accountCnt =  await dbService.count(Account,accountFilter);

      let response = {
        leader : leaderCnt,
        account : accountCnt,
      };
      return response; 
    } else {
      return {  association : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAsset = async (filter) =>{
  try {
    const assetCnt =  await dbService.count(Asset,filter);
    return { asset : assetCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAccount = async (filter) =>{
  try {
    let account = await dbService.findAll(Account,filter);
    if (account && account.length){
      account = account.map((obj) => obj.id);

      const activityFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const activityCnt =  await dbService.count(Activity,activityFilter);

      const subregionFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const subregionCnt =  await dbService.count(Subregion,subregionFilter);

      const regionFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const regionCnt =  await dbService.count(Region,regionFilter);

      const nationFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const nationCnt =  await dbService.count(Nation,nationFilter);

      const leaderFilter = { $or: [{ idAccount : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const leaderCnt =  await dbService.count(Leader,leaderFilter);

      const imageFilter = { $or: [{ idAccount : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const imageCnt =  await dbService.count(Image,imageFilter);

      const donationFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } },{ idAccount : { $in : account } }] };
      const donationCnt =  await dbService.count(Donation,donationFilter);

      const contactFilter = { $or: [{ idAccount : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const contactCnt =  await dbService.count(Contact,contactFilter);

      const blogcategoryFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const blogcategoryCnt =  await dbService.count(Blogcategory,blogcategoryFilter);

      const blogFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const blogCnt =  await dbService.count(Blog,blogFilter);

      const associationFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const associationCnt =  await dbService.count(Association,associationFilter);

      const assetFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const assetCnt =  await dbService.count(Asset,assetFilter);

      const accountFilter = { $or: [{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const accountCnt =  await dbService.count(Account,accountFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : account } },{ addedBy : { $in : account } },{ updatedBy : { $in : account } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : account } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        activity : activityCnt,
        subregion : subregionCnt,
        region : regionCnt,
        nation : nationCnt,
        leader : leaderCnt,
        image : imageCnt,
        donation : donationCnt,
        contact : contactCnt,
        blogcategory : blogcategoryCnt,
        blog : blogCnt,
        association : associationCnt,
        asset : assetCnt,
        account : accountCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  account : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPushNotification = async (filter) =>{
  try {
    const pushNotificationCnt =  await dbService.count(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteActivity = async (filter,updateBody) =>{  
  try {
    let activity = await dbService.findAll(Activity,filter, { id:1 });
    if (activity.length){
      activity = activity.map((obj) => obj.id);

      const blogFilter = { '$or': [{ idActivity : { '$in' : activity } }] };
      const blogCnt = await dbService.update(Blog,blogFilter,updateBody);
      let updated = await dbService.update(Activity,filter,updateBody);

      let response = { blog :blogCnt.length, };
      return response;
    } else {
      return {  activity : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSubregion = async (filter,updateBody) =>{  
  try {
    let subregion = await dbService.findAll(Subregion,filter, { id:1 });
    if (subregion.length){
      subregion = subregion.map((obj) => obj.id);

      const activityFilter = { '$or': [{ idSubRegion : { '$in' : subregion } }] };
      const activityCnt = await dbService.update(Activity,activityFilter,updateBody);

      const nationFilter = { '$or': [{ idSubRegion : { '$in' : subregion } }] };
      const nationCnt = await dbService.update(Nation,nationFilter,updateBody);

      const assetFilter = { '$or': [{ idSubRegion : { '$in' : subregion } }] };
      const assetCnt = await dbService.update(Asset,assetFilter,updateBody);
      let updated = await dbService.update(Subregion,filter,updateBody);

      let response = {
        activity :activityCnt.length,
        nation :nationCnt.length,
        asset :assetCnt.length,
      };
      return response;
    } else {
      return {  subregion : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRegion = async (filter,updateBody) =>{  
  try {
    let region = await dbService.findAll(Region,filter, { id:1 });
    if (region.length){
      region = region.map((obj) => obj.id);

      const activityFilter = { '$or': [{ idRegion : { '$in' : region } }] };
      const activityCnt = await dbService.update(Activity,activityFilter,updateBody);

      const subregionFilter = { '$or': [{ idRegion : { '$in' : region } }] };
      const subregionCnt = await dbService.update(Subregion,subregionFilter,updateBody);

      const nationFilter = { '$or': [{ idRegion : { '$in' : region } }] };
      const nationCnt = await dbService.update(Nation,nationFilter,updateBody);

      const assetFilter = { '$or': [{ idRegion : { '$in' : region } }] };
      const assetCnt = await dbService.update(Asset,assetFilter,updateBody);
      let updated = await dbService.update(Region,filter,updateBody);

      let response = {
        activity :activityCnt.length,
        subregion :subregionCnt.length,
        nation :nationCnt.length,
        asset :assetCnt.length,
      };
      return response;
    } else {
      return {  region : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNation = async (filter,updateBody) =>{  
  try {
    let nation = await dbService.findAll(Nation,filter, { id:1 });
    if (nation.length){
      nation = nation.map((obj) => obj.id);

      const activityFilter = { '$or': [{ idNation : { '$in' : nation } }] };
      const activityCnt = await dbService.update(Activity,activityFilter,updateBody);

      const assetFilter = { '$or': [{ idNation : { '$in' : nation } }] };
      const assetCnt = await dbService.update(Asset,assetFilter,updateBody);

      const accountFilter = { '$or': [{ idNation : { '$in' : nation } }] };
      const accountCnt = await dbService.update(Account,accountFilter,updateBody);
      let updated = await dbService.update(Nation,filter,updateBody);

      let response = {
        activity :activityCnt.length,
        asset :assetCnt.length,
        account :accountCnt.length,
      };
      return response;
    } else {
      return {  nation : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteLeader = async (filter,updateBody) =>{  
  try {
    const leaderCnt =  await dbService.update(Leader,filter);
    return { leader : leaderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteImage = async (filter,updateBody) =>{  
  try {
    let image = await dbService.findAll(Image,filter, { id:1 });
    if (image.length){
      image = image.map((obj) => obj.id);

      const accountFilter = { '$or': [{ idImage : { '$in' : image } }] };
      const accountCnt = await dbService.update(Account,accountFilter,updateBody);
      let updated = await dbService.update(Image,filter,updateBody);

      let response = { account :accountCnt.length, };
      return response;
    } else {
      return {  image : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDonation = async (filter,updateBody) =>{  
  try {
    const donationCnt =  await dbService.update(Donation,filter);
    return { donation : donationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteContact = async (filter,updateBody) =>{  
  try {
    const contactCnt =  await dbService.update(Contact,filter);
    return { contact : contactCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlogcategory = async (filter,updateBody) =>{  
  try {
    let blogcategory = await dbService.findAll(Blogcategory,filter, { id:1 });
    if (blogcategory.length){
      blogcategory = blogcategory.map((obj) => obj.id);

      const blogFilter = { '$or': [{ idBlogCategory : { '$in' : blogcategory } }] };
      const blogCnt = await dbService.update(Blog,blogFilter,updateBody);
      let updated = await dbService.update(Blogcategory,filter,updateBody);

      let response = { blog :blogCnt.length, };
      return response;
    } else {
      return {  blogcategory : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody) =>{  
  try {
    const blogCnt =  await dbService.update(Blog,filter);
    return { blog : blogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAssociation = async (filter,updateBody) =>{  
  try {
    let association = await dbService.findAll(Association,filter, { id:1 });
    if (association.length){
      association = association.map((obj) => obj.id);

      const leaderFilter = { '$or': [{ idAssociation : { '$in' : association } }] };
      const leaderCnt = await dbService.update(Leader,leaderFilter,updateBody);

      const accountFilter = { '$or': [{ idAssociation : { '$in' : association } }] };
      const accountCnt = await dbService.update(Account,accountFilter,updateBody);
      let updated = await dbService.update(Association,filter,updateBody);

      let response = {
        leader :leaderCnt.length,
        account :accountCnt.length,
      };
      return response;
    } else {
      return {  association : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAsset = async (filter,updateBody) =>{  
  try {
    const assetCnt =  await dbService.update(Asset,filter);
    return { asset : assetCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAccount = async (filter,updateBody) =>{  
  try {
    let account = await dbService.findAll(Account,filter, { id:1 });
    if (account.length){
      account = account.map((obj) => obj.id);

      const activityFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const activityCnt = await dbService.update(Activity,activityFilter,updateBody);

      const subregionFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const subregionCnt = await dbService.update(Subregion,subregionFilter,updateBody);

      const regionFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const regionCnt = await dbService.update(Region,regionFilter,updateBody);

      const nationFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const nationCnt = await dbService.update(Nation,nationFilter,updateBody);

      const leaderFilter = { '$or': [{ idAccount : { '$in' : account } },{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const leaderCnt = await dbService.update(Leader,leaderFilter,updateBody);

      const imageFilter = { '$or': [{ idAccount : { '$in' : account } },{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const imageCnt = await dbService.update(Image,imageFilter,updateBody);

      const donationFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } },{ idAccount : { '$in' : account } }] };
      const donationCnt = await dbService.update(Donation,donationFilter,updateBody);

      const contactFilter = { '$or': [{ idAccount : { '$in' : account } },{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const contactCnt = await dbService.update(Contact,contactFilter,updateBody);

      const blogcategoryFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const blogcategoryCnt = await dbService.update(Blogcategory,blogcategoryFilter,updateBody);

      const blogFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const blogCnt = await dbService.update(Blog,blogFilter,updateBody);

      const associationFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const associationCnt = await dbService.update(Association,associationFilter,updateBody);

      const assetFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const assetCnt = await dbService.update(Asset,assetFilter,updateBody);

      const accountFilter = { '$or': [{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const accountCnt = await dbService.update(Account,accountFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : account } },{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : account } },{ addedBy : { '$in' : account } },{ updatedBy : { '$in' : account } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : account } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Account,filter,updateBody);

      let response = {
        activity :activityCnt.length,
        subregion :subregionCnt.length,
        region :regionCnt.length,
        nation :nationCnt.length,
        leader :leaderCnt.length,
        image :imageCnt.length,
        donation :donationCnt.length,
        contact :contactCnt.length,
        blogcategory :blogcategoryCnt.length,
        blog :blogCnt.length,
        association :associationCnt.length,
        asset :assetCnt.length,
        account :accountCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  account : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePushNotification = async (filter,updateBody) =>{  
  try {
    const pushNotificationCnt =  await dbService.update(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteActivity,
  deleteSubregion,
  deleteRegion,
  deleteNation,
  deleteLeader,
  deleteImage,
  deleteDonation,
  deleteContact,
  deleteBlogcategory,
  deleteBlog,
  deleteAssociation,
  deleteAsset,
  deleteAccount,
  deleteUserAuthSettings,
  deleteUserTokens,
  deletePushNotification,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countActivity,
  countSubregion,
  countRegion,
  countNation,
  countLeader,
  countImage,
  countDonation,
  countContact,
  countBlogcategory,
  countBlog,
  countAssociation,
  countAsset,
  countAccount,
  countUserAuthSettings,
  countUserTokens,
  countPushNotification,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteActivity,
  softDeleteSubregion,
  softDeleteRegion,
  softDeleteNation,
  softDeleteLeader,
  softDeleteImage,
  softDeleteDonation,
  softDeleteContact,
  softDeleteBlogcategory,
  softDeleteBlog,
  softDeleteAssociation,
  softDeleteAsset,
  softDeleteAccount,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeletePushNotification,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
