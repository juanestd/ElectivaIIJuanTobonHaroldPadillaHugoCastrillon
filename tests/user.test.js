const request = require('supertest');
const { startServer, app } = require('../src/infrastructure/Server');
const mongoose = require('mongoose');

describe('User API', () => {
  let server;
  const port = 3003;
  let token;

  beforeAll(async () => {
    server = startServer(port);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should register a new user', async () => {
    //Arrange
    const newUser = {
      username: 'testuser22',
      password: 'testpassword',
      email: 'test22@example.com',
      name: 'Test User',
    };

    //Act
    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    //Assert
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.username).toBe(newUser.username);
  });

  it('should not register a new user', async () => {
    //Arrange
    const newUser = {
      username: 'testuser12',
      password: 'testpassword',
      email: 'test2@example.com',
      name: 'Test User',
    };

    //Act
    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'A user with this username already exists');
  });

  it('should log in and get a token', async () => {
    //Arrange
    const loginData = {
      username: 'testuser2',
      password: 'testpassword',
    };

    //Act
    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    //Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.username).toBe('testuser2');

    token = response.body.token;
  });

  it('should log in and not get a token', async () => {
    //Arrange
    const loginData = {
      username: 'testuser-1',
      password: 'testpassword',
    };

    //Act
    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    //Assert
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Authentication failed: User not found.');
  });

  it('should get authenticated user details', async () => {
    //Arrange
    //Act
    const response = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`);

    //Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
  });

  it('should not get authenticated user details', async () => {
    //Arrange
    //Act
    const response = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer Error_Token`);

    //Assert
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  it('should log out the user', async () => {
    //Arrange
    //Act
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    //Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logged out successfully');
  });

  it('should return 400 if authorization header is missing', async () => {
    //Arrange
    //Act
    const response = await request(app)
      .post('/api/auth/logout');

    //Assert
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Authorization header missing');
  });

  it('should return 401 on invalid token', async () => {
    //Arrange
    //Act
    const response = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', 'Bearer invalid-token');

    //Assert
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });
});
