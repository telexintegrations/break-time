import axios from 'axios';
import { Quote, QuotableResponse } from './types';

export const getQuote = async (): Promise<Quote> => {
	try {
		const response = await axios.get<QuotableResponse[]>(
			'http://api.quotable.io/quotes/random'
		);

		if (!response.data || response.data.length === 0) {
			return { content: 'No quote available' };
		}

		const { content } = response.data[0];

		return { content };
	} catch (error) {
		return { content: 'Error fetching quote!' };
	}
};
