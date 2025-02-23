import type { Config } from '@jest/types';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config: Config.InitialOptions = {
	preset: 'ts-jest',
	verbose: true,
	testEnvironment: 'node',
	testEnvironmentOptions: {
		env: {
			TELEX_URL: 'https://dummy-telex-url.com/webhook',
		},
	},
	moduleDirectories: ['node_modules', 'src'],
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	testMatch: ['**/__test__/**/*.test.ts'],
	forceExit: true,
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,
};

export default config;
