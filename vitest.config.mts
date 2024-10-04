/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			include: ['**/*.unit.test.ts', '**/*.integration.test.ts', '**/*.e2e.test.ts'],
			reporter: ['lcov', 'text', 'text-summary'],
		},
	},
});
