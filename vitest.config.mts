/// <reference types="vitest" />

import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		coverage: {
			include: ['**/*.unit.test.ts', '**/*.integration.test.ts', '**/*.e2e.test.ts'],
			reporter: ['lcov', 'text', 'text-summary'],
		},
	},
});
