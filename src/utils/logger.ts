import { createLogger, format, transports } from "winston";
import path from "path";

// Create a logger instance
export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join("logger", "info.log"),
      level: "info",
    }),
    new transports.File({
      handleExceptions: true,
      handleRejections: true,
      filename: path.join("logger", "error.log"),
      level: "error",
    }),
  ],
});
