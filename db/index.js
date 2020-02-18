const mongoose = require("mongoose");

function connect() {
  const Mockgoose = require("mockgoose").Mockgoose;
  const mockgoose = new Mockgoose(mongoose);
  return new Promise((resolve, reject) => {
    mockgoose.prepareStorage().then(() => {
      mongoose
        .connect(
          "mongodb+srv://server:fpaydb@cluster0-wedr9.gcp.mongodb.net/test?retryWrites=true&w=majority",
          { useNewUrlParser: true }
        )
        .then((res, err) => {
          if (err) return reject(err);

          resolve();
        });
    });
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
