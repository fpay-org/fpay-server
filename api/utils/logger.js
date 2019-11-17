class Logger {
  log(message, ...values) {
    console.log.apply(Logger, ["LOG: ", message, ...values]);
  }

  debug(message, ...values) {
    console.log.apply(Logger, ["DEBUG: ", message, ...values]);
  }

  info(message, ...values) {
    console.log.apply(Logger, ["INFO: ", message, ...values]);
  }

  warn(message, ...values) {
    console.warn.apply(Logger, ["WARN: ", message, ...values]);
  }

  error(message, ...values) {
    console.error.apply(Logger, ["ERROR: ", message, ...values]);
  }
}

module.exports = Logger;
