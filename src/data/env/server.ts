import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
    server: {
        DB_HOSTNAME: z.string().min(2).max(100),
        DB_PORT: z.string().min(2).max(100),
        DB_USER: z.string().min(2).max(100),
        DB_PASSWORD: z.string().min(2).max(100),
        DB_NAME: z.string().min(2).max(100),
    },
    createFinalSchema: (env) => {
        return z.object(env).transform((val) => {
            const { DB_HOSTNAME, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, ...rest } = val;

            return {
                ...rest,
                DATABASE_URL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`,
            };
        });
    },
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env,
});
