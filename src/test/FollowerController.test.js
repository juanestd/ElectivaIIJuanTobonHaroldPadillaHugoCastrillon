const request = require('supertest');
const app = require('../infra/express/Server');

describe('Follower Controller', () => {
    it('should get followers for a user', async () => {
        const res = await request(app)
            .get('/api/user1/followers/');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);  // Verificar que retorna un array
    });

    it('should get follower count for a user', async () => {
        const res = await request(app)
            .get('/api/user1/followers/counts/');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('count');
    });

    it('should create a follower for a user', async () => {
        const res = await request(app)
            .post('/api/user1/followers/')
            .send({ follower_username: '@new_follower' });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('follower_username', '@new_follower');
    });

    it('should update a follower', async () => {
        const res = await request(app)
            .put('/api/user1/followers/')
            .send({ id_follower: '1', follower_username: '@updated_follower' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('follower_username', '@updated_follower');
    });

    it('should delete a follower by ID', async () => {
        const res = await request(app)
            .delete('/api/user1/followers/1');
        
        expect(res.statusCode).toEqual(204);
    });
});
