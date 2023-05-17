/**
 * Winston configuration (General logging)
 * Documentation: https://github.com/winstonjs/winston
 */

import winston from "winston";

const isDevelopment = process.env.NODE_ENV !== "production";

export function createLogger() {
  // Define set of log levels
  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  // Define colors for console output
  const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };
  winston.addColors(colors);

  // Define output formatting for console output
  const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.align(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level} ${info.message}`
    )
  );

  // Define transports (routing of log messages)
  const transports = [
    // Transport: Write all levels to console with specified formatting
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ];

  const minLogLevel = isDevelopment ? "debug" : "info";

  // Create logger instance
  const logger = winston.createLogger({
    level: minLogLevel,
    levels: levels,
    transports: transports,
  });

  return logger;
}
