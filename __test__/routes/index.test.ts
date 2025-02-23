import request from 'supertest';
import app from '../../src/app';

describe('Routes', () => {
	describe('GET /integration', () => {
		it('should be defined and handle GET requests', async () => {
			const response = await request(app).get('/integration');
			expect(response.status).not.toBe(404);
		});
	});

	describe('POST /break', () => {
		it('should be defined and handle POST requests', async () => {
			const response = await request(app)
				.post('/break')
				.send({
					settings: {
						label: 'header',
						type: 'sstring',
						required: true,
						default: 'Test Header',
					},
				});
			expect(response.status).not.toBe(404);
		});
	});
});
