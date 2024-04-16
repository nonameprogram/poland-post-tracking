import z from 'zod';

const envSchema = z.object({
  POLISH_POST_SERVICE_URL: z.string(),
  POLISH_POST_SERVICE_USERNAME: z.string(),
  POLISH_POST_SERVICE_PASSWORD: z.string()
});

export const envClientSchema = envSchema.parse({
  POLISH_POST_SERVICE_URL: import.meta.env.VITE_POLISH_POST_SERVICE_URL,
  POLISH_POST_SERVICE_USERNAME: import.meta.env.VITE_POLISH_POST_SERVICE_USERNAME,
  POLISH_POST_SERVICE_PASSWORD: import.meta.env.VITE_POLISH_POST_SERVICE_PASSWORD
});

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
