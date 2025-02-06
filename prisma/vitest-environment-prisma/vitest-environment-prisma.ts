import { Environment } from 'vitest/environments';

export default (<Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		console.log('Executando setup do ambiente prisma');

		return {
			teardown() {
				console.log('Executando setup do ambiente prisma');
			},
		};
	},
});
