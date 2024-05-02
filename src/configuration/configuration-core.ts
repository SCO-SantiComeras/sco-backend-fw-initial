import { registerAs } from "@nestjs/config";

export const configurationCore = registerAs("core", () => ({
  verbose: process.env.CORE_VERBOSE == "true",
  path: process.env.CORE_PATH,
  folder: process.env.CORE_FOLDER,
  extension: process.env.CORE_EXTENSION,
  response: process.env.CORE_RESPONSE == "true",
  validationPipe: process.env.CORE_VALIDATION_PIPE == "true",
  validationPassport: process.env.CORE_VALIDATION_PASSPORT == "true",
}));