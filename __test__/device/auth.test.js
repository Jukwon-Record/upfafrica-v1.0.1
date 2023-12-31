/**
 * auth.test.js
 * @description :: contains test cases of APIs for authentication module.
 */

const dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = 'test';
const request = require('supertest');
const db = require('../../config/dbConnection');
const app = require('../../app');
const authConstant = require('../../constants/authConstant');
const routes = require('../../routes');
app.use(routes);

beforeAll(async function () {
  await db.sync({});
});

afterAll(async function (){
  await db.dropAllSchemas();
  await db.drop();
  await db.close();
});

// test cases

describe('POST /register -> if email and username is given', () => {
  test('should register a account', async () => {
    let registeredUser = await request(app)
      .post('/device/auth/register')
      .send({
        'userType':authConstant.USER_TYPES.User,
        'idAccount':488,
        'firstName':'Rickey Zemlak',
        'middleName':'Sheldon Klein',
        'lastName':'Roger Hintz',
        'gender':'Neither',
        'birthDate':'2024-03-07T22:20:27.008Z',
        'eMail':'Elvera.Ziemann@hotmail.com',
        'userCode':'interactive',
        'officePhone':'Gorgeous',
        'homePhone':'explicit',
        'religion':'Fantastic',
        'street':'Producer',
        'city':'Integrated',
        'idNation':969,
        'idImage':966,
        'idAssociation':371,
        'biography':'Dynamic',
        'email':'Adelle33@gmail.com',
        'mobileNo':'(450) 259-9838'
      });
    expect(registeredUser.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(registeredUser.body.status).toBe('SUCCESS');
    expect(registeredUser.body.data).toMatchObject({ id: expect.any(Number) });
    expect(registeredUser.statusCode).toBe(200);
  });
});

describe('POST /forgot-password -> if email has not passed from request body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let user = await request(app)
      .post('/device/auth/forgot-password')
      .send({ email: '' });
    
    expect(user.statusCode).toBe(400);
    expect(user.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email passed from request body is not available in database', () => {
  test('should return record not found status', async () => {
    let user = await request(app)
      .post('/device/auth/forgot-password')
      .send({ 'email': 'unavailable.email@hotmail.com', });
    
    expect(user.statusCode).toBe(404);
    expect(user.body.status).toBe('RECORD_NOT_FOUND');
  });
});

describe('POST /forgot-password -> if email passed from request body is valid and OTP sent successfully', () => {
  test('should return success message', async () => {
    let user = await request(app)
      .post('/device/auth/forgot-password')
      .send({ 'email':'Adelle33@gmail.com', });
    
    expect(user.statusCode).toBe(200);
    expect(user.body.status).toBe('SUCCESS');
  });
});

describe('POST /validate-otp -> otp is sent in request body and OTP is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/device/auth/login')
      .send(
        {
          username: 'Elvera.Ziemann@hotmail.com',
          password: 'interactive'
        }).then(login => () => {
        return request(app)
          .get(`/device/api/v1/account/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .post('/device/auth/validate-otp')
              .send({ 'otp': foundUser.body.data.resetPasswordLink.code, }).then(account => {
                expect(account.statusCode).toBe(200);
                expect(account.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('POST /validate-otp -> if OTP is incorrect or OTP has expired', () => {
  test('should return invalid OTP', async () => {
    let account = await request(app)
      .post('/device/auth/validate-otp')
      .send({ 'otp': '12334' });
    expect(account.statusCode).toBe(200);
    expect(account.body.status).toBe('FAILURE');
  });
});

describe('POST /validate-otp -> if request body is empty or otp has not been sent in body', () => {
  test('should return insufficient parameter', async () => {
    let account = await request(app)
      .post('/device/auth/validate-otp')
      .send({});

    expect(account.statusCode).toBe(400);
    expect(account.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> code is sent in request body and code is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/device/auth/login')
      .send(
        {
          username: 'Elvera.Ziemann@hotmail.com',
          password: 'interactive'
        }).then(login => () => {
        return request(app)
          .get(`/device/api/v1/account/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .put('/device/auth/validate-otp')
              .send({
                'code': foundUser.body.data.resetPasswordLink.code,
                'newPassword':'newPassword'
              }).then(account => {
                expect(account.statusCode).toBe(200);
                expect(account.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('PUT /reset-password -> if request body is empty or code/newPassword is not given', () => {
  test('should return insufficient parameter', async () => {
    let account = await request(app)
      .put('/device/auth/reset-password')
      .send({});

    expect(account.statusCode).toBe(400);
    expect(account.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> if code is invalid', () => {
  test('should return invalid code', async () => {
    let account = await request(app)
      .put('/device/auth/reset-password')
      .send({
        'code': '123',
        'newPassword': 'testPassword'
      });

    expect(account.body.status).toBe('FAILURE');
    expect(account.statusCode).toBe(200);
  });
});
