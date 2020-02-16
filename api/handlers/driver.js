const Driver = require("../models/driver");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const storage = require("../services/storage");
const logger = new Logger();

exports.getAll = async (req, res) => {
  Driver.find()
    .exec()
    .then(drivers => response(res, drivers))
    .catch(err => response(res, null, 500, err));
};

exports.getOne = async (req, res) => {
  if (req && req.params && req.params.nid) {
    Driver.findOne({ nid: req.params.nid })
      .exec()
      .then(driver => {
        if (!!driver) {
          driver.password = "fpay-encrypted";
          return response(res, driver);
        }
      })
      .catch(err => {
        logger.error(err);
        return response(res, null, 500, err);
      });
  } else {
    response(res, null, 404, "No driver id found");
  }
};

exports.update = async (req, res) => {
  if (req && req.params && req.params.nid) {
    logger.info("Update request for", req.params.nid);

    Driver.findOne({ nid: req.params.nid })
      .exec()
      .then(user => {
        if (!!user) {
          const newUser = {};

          Driver.updateOne({ nid: req.params.nid })
            .exec()
            .then(res => logger.info(res))
            .catch(err => logger.error(err));
        } else {
          response(res, null, 404, "Invalid driver id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No driver id found");
  }
};

exports.updateAvatar = async (req, res) => {
  if (req && req.params && req.params.nid) {
    logger.info("Avatar update for", req.params.nid);

    Driver.findOne({ nid: req.params.nid })
      .exec()
      .then(async user => {
        if (!!user) {
          await storage.storeFile("driver_avatars", req.file, (err, url) => {
            if (err) response(res, null, 500, err);

            if (url) {
              const updateDriver = {
                avatar_url: url
              };

              Driver.updateOne({ nid: user.nid }, updateDriver)
                .exec()
                .then(result => {
                  if (result) response(res, null, 202, "Driver updated");
                })
                .catch(error => response(res, null, 500, error));
            }
          });
        }
      })
      .catch(err => response(res, null, 500, err));
  }
};
