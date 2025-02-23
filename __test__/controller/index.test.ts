import request from 'supertest';
import axios from 'axios';
import app from '../../src/app';
import { getQuote } from '../../src/service';

// Mock axios and getQuote
jest.mock('axios');
jest.mock('../../src/service');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGetQuote = getQuote as jest.MockedFunction<typeof getQuote>;

describe('Controllers', () => {
	describe('Integration Controller', () => {
		it('should return integration details', async () => {
			const response = await request(app).get('/integration');

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('data');
			expect(response.body.data).toHaveProperty('descriptions');
			expect(response.body.data.descriptions.app_name).toBe('Break Time');
		});
	});

	describe('Tick Controller', () => {
		beforeEach(() => {
			jest.clearAllMocks();
			process.env.TELEX_URL = 'https://dummy-telex-url.com/webhook';
		});

		it('should successfully process quote and post to TELEX_URL', async () => {
			mockedGetQuote.mockResolvedValueOnce({
				content: 'Test quote',
			});

			mockedAxios.post.mockResolvedValueOnce({ data: {} });

			const payload = {
				settings: {
					label: 'header',
					type: 'text',
					required: true,
					default: 'Test Header',
				},
			};

			const response = await request(app).post('/break').send(payload);

			expect(response.status).toBe(202);
			expect(response.body).toEqual({
				status: 'success',
			});

			expect(mockedAxios.post).toHaveBeenCalledWith(
				process.env.TELEX_URL,
				expect.objectContaining({
					message: 'Test quote',
					username: 'Break Time',
					event_name: 'Test Header',
					status: 'success',
				}),
				expect.any(Object)
			);
		});

		it('should handle errors gracefully', async () => {
			mockedGetQuote.mockRejectedValueOnce(
				new Error('Quote service error')
			);

			const response = await request(app)
				.post('/break')
				.send({
					settings: {
						label: 'header',
						type: 'text',
						required: true,
						default: 'Test Header',
					},
				});

			expect(response.status).toBe(500);
			expect(response.body).toEqual({
				status: 'error',
				message: 'Quote service error',
			});
		});
	});
});
