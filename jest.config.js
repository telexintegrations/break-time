/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	preset: 'ts-jest',
	verbose: true,
	testEnvironment: 'node',
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
	testMatch: ['**/*.test.ts'],
	forceExit: true,
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,
};
