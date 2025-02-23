import axios from 'axios';
import { getQuote } from '../src/service';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Quote Service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return a quote when API call is successful', async () => {
		// Mock successful API response
		mockedAxios.get.mockResolvedValueOnce({
			data: [
				{
					_id: '123',
					content: 'Test quote',
					author: 'Test Author',
				},
			],
		});

		const result = await getQuote();

		expect(result).toEqual({ content: 'Test quote' });
		expect(mockedAxios.get).toHaveBeenCalledWith(
			'http://api.quotable.io/quotes/random'
		);
	});

	it('should return default message when API returns empty data', async () => {
		// Mock empty response
		mockedAxios.get.mockResolvedValueOnce({ data: [] });

		const result = await getQuote();

		expect(result).toEqual({ content: 'No quote available' });
	});

	it('should return default message when API call fails', async () => {
		// Mock API failure
		mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

		const result = await getQuote();

		expect(result).toEqual({ content: 'Error fetching quote!' });
	});
});
