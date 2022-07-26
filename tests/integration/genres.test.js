const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([{ name: 'genre1' }, { name: 'genre2' }]);
      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid ID is passed', async () => {
      const genre = await new Genre({ name: 'genre1' });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 404 if the genre with the given ID was not found', async () => {
      const res = await request(server).get(`/api/genres/1`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 401 if client is not logged in', async () => {
      const res = await request(server).post('/api/genres').send({ name: 'genre1' });
      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: '1234' });
      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join('a');
      const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name });
      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: 'genre1' });
      const genre = await Genre.find({ name: 'genre1' });
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server).post('/api/genres').set('x-auth-token', token).send({ name: 'genre1' });
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genre1');
    });
  });
});
