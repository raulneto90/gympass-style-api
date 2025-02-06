import tsconfigPaths from 'vite-tsconfig-paths';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		css: false,
		exclude: [...defaultExclude],
		coverage: {
			reporter: ['lcov', 'text', 'text-summary'],
		},
		pool: 'threads',
		workspace: [
			{
				extends: true,
				test: {
					name: 'unit',
					include: ['**/*.unit.test.ts'],
				},
			},
			{
				extends: true,
				test: {
					name: 'e2e',
					include: ['**/*.e2e.test.ts'],
				},
			},
		],
	},
});
