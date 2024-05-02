import { registerAs } from "@nestjs/config";

export const configurationCors = registerAs("cors", () => ({
  origin: process.env.CORS_ORIGIN,
}));