const request = require('supertest');
const app = require('../infra/express/Server');

describe('Post Controller', () => {
    it('should create a post', async () => {
        const res = await request(app)
            .post('/api/user1/posts')
            .send({ message: 'This is a test post' });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'This is a test post');
    });

    it('should return posts for a user', async () => {
        const res = await request(app)
            .get('/api/user1/posts');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('posts');
    });

    it('should return a post by ID', async () => {
        const res = await request(app)
            .get('/api/user1/posts/1');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('should update a post', async () => {
        const res = await request(app)
            .put('/api/user1/posts')
            .send({ id_post: '1', message: 'Updated message' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Updated message');
    });

    it('should delete a post', async () => {
        const res = await request(app)
            .delete('/api/user1/posts/1');
        
        expect(res.statusCode).toEqual(204);
    });
});
