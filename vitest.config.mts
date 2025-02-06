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
		environmentMatchGlobs: [
			['src/modules/**/interfaces/controller/**', 'prisma'],
		],
	},
});
