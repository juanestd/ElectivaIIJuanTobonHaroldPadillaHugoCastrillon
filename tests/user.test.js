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
            username: 'testuser',
            password: 'testpassword',
            email: 'test@example.com',
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
            username: 'testuser',
            password: 'testpassword',
            email: 'test@example.com',
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
});
