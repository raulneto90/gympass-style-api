import tsconfigPaths from 'vite-tsconfig-paths';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		css: false,
		environment: 'happy-dom',
		exclude: [...defaultExclude],
		coverage: {
			reporter: ['lcov', 'text', 'text-summary'],
		},
	},
});
