const request = require('supertest');
const { startServer, app } = require('../src/infrastructure/Server');
const mongoose = require('mongoose');

describe('Follow API', () => {
    let server;
    const port = 3001;
    let token;

    beforeAll(async () => {
        server = startServer(port);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    it('should log in and get a token', async () => {
        //Arrange
        const loginData = {
            username: 'testuser',
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

    // Cambiar el username cada vez que se ejecute esta prueba
    it('should follow a user by username', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .post('/api/Prueba12/follow')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Now following user');
    });

    it('should return already following the user by username', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .post('/api/testuser2/follow')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Already following this user');
    });

    it('should return user not found when trying to follow', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .post('/api/testser2/follow')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('should get the follower count of a user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser2/followers/count')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('followers', 1);
    });

    it('should return error when trying to get follower count for a non-existent user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser-2/followers/count')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'An error occurred while retrieving the follower count');
    });

    it('should get the following count of a user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser2/following/count')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('following', 6);
    });

    it('should return error when trying to get following count for a non-existent user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser-2/following/count')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'An error occurred while retrieving the following count');
    });

    it('should get the list of users the user is following', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser2/following')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('following', [
            { "name": "Test User", "username": "testuser2" },
            { "name": "Test User", "username": "testuser9" },
            { "name": "Test User", "username": "testuser10" },
            { "name": "Test User", "username": "testuser19" },
            { "name": "Test User", "username": "testuser20" },
            { "name": "Test User", "username": "testuser3" }
        ]);
    });

    it('should return error when trying to get the following list for a non-existent user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser-2/following')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'An error occurred while retrieving following users');
    });

    it('should get the list of followers of the user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser2/followers')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('followers', [
            { "following": true, "name": "Test User", "username": "testuser2" }
        ]);
    });

    it('should return error when trying to get the followers list for a non-existent user', async () => {
        //Arrange
        //Act
        const response = await request(app)
            .get('/api/testuser-2/followers')
            .set('Authorization', `Bearer ${token}`);

        //Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'An error occurred while retrieving followers');
    });
});
