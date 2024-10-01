const request = require('supertest');
const app = require('../infra/express/Server');

describe('Following Controller', () => {
    it('should get followings for a user', async () => {
        const res = await request(app)
            .get('/api/user1/following/');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);  // Verificar que retorna un array
    });

    it('should get following count for a user', async () => {
        const res = await request(app)
            .get('/api/user1/following/counts/');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('count');
    });

    it('should create a following for a user', async () => {
        const res = await request(app)
            .post('/api/user1/following/')
            .send({ following_username: '@new_following' });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('following_username', '@new_following');
    });

    it('should update a following', async () => {
        const res = await request(app)
            .put('/api/user1/following/')
            .send({ id_following: '1', following_username: '@updated_following' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('following_username', '@updated_following');
    });

    it('should delete a following by ID', async () => {
        const res = await request(app)
            .delete('/api/user1/following/1');
        
        expect(res.statusCode).toEqual(204);
    });
});
