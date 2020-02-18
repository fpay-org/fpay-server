const Officer = require("../models/officer");
const bcrypt = require("bcrypt");
const storage = require("../services/storage");
const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

exports.getAll = async (req, res) => {
  Officer.find()
    .exec()
    .then(officers => response(res, officers))
    .catch(err => response(res, null, 500, err));
};

exports.getOne = async (req, res) => {
  logger.info("Req ");
  if (req && req.params && req.params.officer_id) {
    Officer.findOne({ officer_id: req.params.officer_id })
      .exec()
      .then(officer => {
        if (!!officer) {
          officer.password = "fpay-encrypted";
          return response(res, officer);
        } else response(res, null, 404, "Invalid driver id");
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No driver id found");
  }
};

exports.update = async (req, res) => {
  if (req && req.params && req.params.officer_id) {
    logger.info("Update request for", req.params.officer_id);

    Officer.findOne({ officer_id: req.params.officer_id })
      .exec()
      .then(user => {
        if (!!user) {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              logger.error(err);
              response(res, null, 401, "Invalid password");
            }

            if (!result) return response(res, null, 401, "Invalid password");

            const updateDoc = {
              email: req.body.email,
              contact_number: req.body.contact_number
            };

            Officer.updateOne({ officer_id: req.params.officer_id }, updateDoc)
              .exec()
              .then(result => {
                if (result) {
                  response(res, null, 202, "User updated");
                }
              })
              .catch(err => response(res, null, 500, err));
          });
        } else {
          response(res, null, 404, "Invalid officer id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No officer id found");
  }
};

exports.passUpdate = async (req, res) => {
  if (req && req.params && req.params.officer_id) {
    logger.info("Password update request for", req.params.officer_id);

    Officer.findOne({ officer_id: req.params.officer_id })
      .exec()
      .then(user => {
        if (!!user) {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              logger.error(err);
              return response(res, null, 401, "Invalid password");
            }

            if (!result) return response(res, null, 401, "Invalid password");
            bcrypt.hash(req.body.new_password, 10, (err, hash) => {
              if (err) {
                logger.error(err);
                return response(res, null, 500, err);
              }
              const updateDoc = {
                password: hash
              };

              Officer.updateOne(
                { officer_id: req.params.officer_id },
                updateDoc
              )
                .exec()
                .then(result => {
                  if (result) {
                    response(res, null, 202, "Password updated");
                  }
                })
                .catch(err => response(res, null, 500, err));
            });
          });
        } else {
          response(res, null, 404, "Invalid officer id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No officer id found");
  }
};

exports.updateAvatar = async (req, res) => {
  if (req && req.params && req.params.officer_id) {
    logger.info("Avatar update for", req.params.officer_id);

    Officer.findOne({ officer_id: req.params.officer_id })
      .exec()
      .then(async user => {
        if (!!user) {
          await storage.storeFile("officer_avatars", req.file, (err, url) => {
            if (err) response(res, null, 500, err);

            if (url) {
              logger.info("URL");
              const updateOfficer = {
                avatar_url: url
              };

              Officer.updateOne({ officer_id: user.officer_id }, updateOfficer)
                .exec()
                .then(result => {
                  if (result) response(res, null, 202, "Officer updated");
                })
                .catch(error => response(res, null, 500, error));
            }
          });
        }
      })
      .catch(err => response(res, null, 500, err));
  }
};
