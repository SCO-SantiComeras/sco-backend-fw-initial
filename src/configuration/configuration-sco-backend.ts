import { registerAs } from "@nestjs/config";

export const configurationScoBackend = registerAs("sco", () => ({
  verbose: process.env.SCO_BACKEND_VERBOSE == "true",
  path: process.env.SCO_BACKEND_PATH,
  folder: process.env.SCO_BACKEND_FOLDER,
  extension: process.env.SCO_BACKEND_EXTENSION,
  response: process.env.SCO_BACKEND_RESPONSE == "true",
  validationPipe: process.env.SCO_BACKEND_VALIDATION_PIPE == "true",
  validationPassport: process.env.SCO_BACKEND_VALIDATION_PASSPORT == "true",
}));