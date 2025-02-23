# Break Time

This showcases an Integration with Telex that sends break time notifications with random quotes to keep users motivated and productive. It uses a Interval Type of integration.

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Environment Variables](#environment-variables)
-   [API Documentation](#api-documentation)
-   [Testing](#testing)
-   [Project Structure](#project-structure)
-   [Technologies Used](#technologies-used)

## Features

-   Integration with external quote service
-   Scheduled break notifications
-   Customizable break intervals
-   Random motivational quotes
-   RESTful API endpoints
-   Integraatioi with Telex

## Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)
-   TypeScript (v4 or higher)

## Installation

1. Clone the repository

```bash
git clone https://github.com/telexintegrations/break-time.git
cd break-time
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file in the root direstory. It should contain:

```bash
PORT=3000
TELEX_URL=<your-telex-channel-webhook>
NODE_ENV=development
```

4. Start the development server

```bash
pnpm run dev # console log message Server successfully running on port: 3000
```

## Environment Variables

| Variable  | Description                         | Required | Default     |
| --------- | ----------------------------------- | -------- | ----------- |
| PORT      | Port number for the server          | No       | 3000        |
| TELEX_URL | Telex webhook URL for notifications | Yes      | -           |
| NODE_ENV  | Application environment             | No       | development |

-   **PORT**: The port number where the server will run
-   **TELEX_URL**: Your Telex channel webhook URL for sending notifications
-   **NODE_ENV**: Current environment (development/production/test)

## API Documentation

### Integration Endpoint

-   GET `/integration`
    -   Returns the integration details and configuration

#### Response Example

```json
{
	"data": {
		"date": {
			"created_at": "2025-02-22",
			"updated_at": "2025-02-22"
		},
		"descriptions": {
			"app_name": "Break Time",
			"app_description": "Break TIme",
			"app_logo": "https://as1.ftcdn.net/jpg/02/00/33/96/240_F_200339666_fZhsLAgpYkd5ogjTpFmSYOPcslpNezYA.jpg",
			"app_url": "https://localhost:3000",
			"background_color": "#fff"
		},
		"is_active": true,
		"integration_type": "interval",
		"integration_category": "Human Resources & Payroll",
		"key_features": ["break", "quotes"],
		"author": "Paul Ajijola",
		"settings": [
			{
				"label": "interval",
				"type": "text",
				"required": true,
				"default": "* */1 * * *"
			},
			{
				"label": "header",
				"type": "text",
				"required": true,
				"default": ""
			}
		],
		"target_url": "",
		"tick_url": "https://localhost:3000/break"
	}
}
```

### Break Time Endpoint

-   POST `/break`
    -   Triggers a break notification with a random quote
    -   Requires settings in the request body

#### Request Body Example

```json
{
	"settings": {
		"label": "header",
		"type": "text",
		"required": true,
		"default": "Break Time!"
	}
}
```

### Testing

Run the test suite:

```bash
pnpm run test
```

Watch for changes in tests files:

```bash
pnpm run test:watch
```

## Project Structure

break-time/
├── src/
│ ├── controller/
│ │ └── index.ts
│ ├── routes/
│ │ └── index.ts
│ ├── types/
│ │ └── index.d.ts
│ ├── service.ts
│ └── app.ts
├── **test**/
│ ├── controller/
│ │ └── index.test.ts
│ └── routes/
│ └── index.test.ts
| └── app.test.ts
| └── service.test.ts
├── .gitignore
├── jest.config.ts
├── LICENSE
└── package.json
└── pnpm-lock.yaml
└── README.md
├── tsconfig.json

### Technologies Used

-   Express.js
-   TypeScript
-   Jest
-   ts-jest
-   Cors
-   Dotenv
-   HTTP Status Codes
-   Axios

### License

MIT
