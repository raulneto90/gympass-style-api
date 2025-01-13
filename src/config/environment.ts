import z from 'zod';

const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string().default('secret'),
	JWT_EXPIRATION: z.string().default('1d'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error(`Invalid environment variables: ${_env.error.format()}`);
	throw new Error('Invalid environment variables');
}

export const env = _env.data;
