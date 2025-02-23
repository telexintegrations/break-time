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
				app_logo: 'http://127.0.0.1/api/v1/relax',
				app_url: `${baseUrl}`,
				background_color: '#fff',
			},
			is_active: true,
			integration_type: 'interval',
			integration_category: 'Human Resources & Payroll',
			key_features: ['break'],
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
			tick_url: `${baseUrl}/tick`,
		},
	});
};

export const tickController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { return_url, settings }: Payload = req.body;

		if (!return_url) {
			res.status(StatusCodes.BAD_REQUEST).json({
				status: 'error',
				message: 'return_url is required',
			});
			return;
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
		console.log(data);
		await axios.post(return_url, data, {
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
