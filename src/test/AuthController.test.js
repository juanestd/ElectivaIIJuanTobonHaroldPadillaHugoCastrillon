const request = require('supertest');
const app = require('../infra/express/Server');  // Asegúrate de que 'app' esté configurado correctamente.

describe('Auth Controller', () => {
    it('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'userTest', password: 'passTest' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    });
});
