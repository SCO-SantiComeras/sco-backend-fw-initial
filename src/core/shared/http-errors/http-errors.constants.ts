import { HTTP_ERRORS } from "sco-backend-fw";

export const HTTP_ERRORS_CONSTANTS = {
  ...HTTP_ERRORS,
  WEBSOCKETS: {
    UNNABLE_SEND_NOTIFICATION_EVENT: 'Unnable to send websocket notification event',
  },
  MONGODB: {
    MONGODB_OPTIONS_NOT_PROVIDED: 'MongoDB options not provided',
  },
}