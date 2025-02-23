import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Payload, Quote, TelexData } from '../types';
import axios from 'axios';
import { getQuote } from '../service';

export const integrationController = async (
	req: Request,
	res: Response
): Promise<void> => {
	const baseUrl = `${req.protocol}s://${req.get('host')}`;

	res.status(StatusCodes.OK).json({
		data: {
			date: {
				created_at: '2025-02-22',
				updated_at: '2025-02-22',
			},
			descriptions: {
				app_name: 'Break Time',
				app_description: 'Break TIme',
				app_logo:
					'https://as1.ftcdn.net/jpg/02/00/33/96/240_F_200339666_fZhsLAgpYkd5ogjTpFmSYOPcslpNezYA.jpg',
				app_url: `${baseUrl}`,
				background_color: '#fff',
			},
			is_active: true,
			integration_type: 'interval',
			integration_category: 'Human Resources & Payroll',
			key_features: ['break', 'quotes'],
			author: 'PeePee',
			settings: [
				{
					label: 'interval',
					type: 'text',
					required: true,
					default: '* */1 * * *',
				},

				{
					label: 'header',
					type: 'text',
					required: true,
					default: '',
				},
			],
			target_url: 'none',
			tick_url: `${baseUrl}/break`,
		},
	});
};

export const tickController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { settings }: Payload = req.body;

		if (!process.env.TELEX_URL) {
			throw new Error('TELEX_URL environment variable should be set');
		}

		const quote: Quote = await getQuote();

		const eventName = (): string => {
			if (settings.label === 'header') return settings.default;
			return 'Take Break';
		};

		const data: TelexData = {
			message: quote.content,
			username: 'Break Time',
			event_name: eventName(),
			status: 'success',
		};

		await axios.post(process.env.TELEX_URL, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		res.status(StatusCodes.ACCEPTED).json({ status: data.status });
	} catch (error: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			status: 'error',
			message: error.message,
		});
	}
};
