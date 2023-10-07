/**
 * @description : exports authentication strategy for linkedin using passport.js
 * @params {Object} passport : passport object for authentication
 * @return {callback} : returns callback to be used in middleware
 */

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const model = require('../model/index');
const dbService = require('../utils/dbService');
const { USER_TYPES } = require('../constants/authConstant');

const linkedinPassportStrategy = passport => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_CLIENTSECRET,
    callbackURL: process.env.LINKEDIN_CALLBACKURL,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, async function (token, tokenSecret, profile, done) {
    if (profile){
      let userObj = {
        'firstName':profile.name.givenName,
        'lastName':profile.name.familyName,
        'linkedinId': profile.id ,
        'email': profile.emails !== undefined ? profile.emails[0].value : '',
        'password':'',
        'userType':USER_TYPES.User
      };
      let found = await dbService.findOne(model.account,{ 'email': userObj.email });
      if (found) {
        const id = found.id;
        await dbService.update(model.account, { id: id }, userObj);
      }
      else {
        await dbService.createOne(model.account, userObj);
      }
      let user = await dbService.findOne(model.account,{ 'linkedinId':profile.id });
      return done(null, user);
    }
    return done(null, null);
  }
  ));
};

module.exports = { linkedinPassportStrategy };