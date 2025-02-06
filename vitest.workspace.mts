import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	{
		extends: './vitest.config.mts',
		test: {
			name: 'unit',
			include: ['**/*.unit.test.ts'],
		},
	},
	{
		extends: './vitest.config.mts',
		test: {
			name: 'e2e',
			include: ['**/*.e2e.test.ts'],
		},
	},
]);
