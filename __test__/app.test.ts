import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
	describe('GET /', () => {
		it('should retrun welcome message', async () => {
			const res = await request(app).get('/');

			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				message: 'Welcome to this site!',
			});
		});
	});
});
