const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

/* Officer authentication */

const Officer = require("../models/officer");

router.post("/officer/register", (req, res, next) => {
  Officer.find({ officerID: req.body.officerID })
    .exec()
    .then(officer => {
      if (officer.length > 0)
        return response(res, 409, "Officer already registered");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          logger.error(err);
          return response(res, 500, err);
        } else {
          const officer = new Officer({
            _id: new mongoose.Types.ObjectId(),
            officerID: req.body.officerID,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            permission_level: req.body.permission_level,
            fines_issued: req.body.fines_issued
          });

          officer
            .save()
            .then(result => {
              logger.info("Officer created", result);
              response(res, 201, "Officer created");
            })
            .catch(error => {
              logger.error(error);
              response(res, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error(err);
      response(res, 500, err);
    });
});

router.post("/officer/login", (req, res, next) => {
  Officer.find({ officerID: req.body.officerID })
    .exec()
    .then(officer => {
      if (officer.length < 1) return response(res, 401, "Auth failed");
      bcrypt.compare(req.body.password, officer[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, 401, "Auth failed");
        }

        if (!result) return response(res, 401, "Auth failed");

        logger.info(
          "Officer",
          officer[0].first_name,
          "(permission level",
          officer[0].permission_level,
          ") authorized"
        );
        const token = jwt.sign(
          {
            id: officer[0]._id,
            officerID: officer[0].officerID,
            first_name: officer[0].first_name
          },
          "fpaysecret",
          {
            expiresIn: "1h"
          }
        );

        return response(res, 200, "Auth Success", {
          token: token
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, 500, err);
    });
});

/* Driver authentication */

const Driver = require("../models/driver");

router.post("/driver/register", (req, res, next) => {
  Driver.find({ username: req.body.username })
    .exec()
    .then(driver => {
      if (driver.length > 0)
        return response(res, 409, "Driver already registered");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          logger.error(err);
          return response(res, 500, err);
        } else {
          const driver = new Driver({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            fines: req.body.fines,
            vehicles: req.body.vehicles,
            email: req.body.email,
            contact_number: req.body.contact_number
          });

          driver
            .save()
            .then(result => {
              logger.info("Driver created", result);
              response(res, 201, "Driver created");
            })
            .catch(error => {
              logger.error(error);
              response(res, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error(err);
      response(res, 500, err);
    });
});

router.post("/driver/login", (req, res, next) => {
  Driver.find({ username: req.body.username })
    .exec()
    .then(driver => {
      if (driver.length < 1) return response(res, 401, "Auth failed");
      bcrypt.compare(req.body.password, driver[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, 401, "Auth failed");
        }

        if (!result) return response(res, 401, "Auth failed");

        logger.info("Driver", driver[0].first_name, "Authorized");
        const token = jwt.sign(
          {
            id: driver[0]._id,
            username: driver[0].username,
            first_name: driver[0].first_name
          },
          "fpaysecret",
          {
            expiresIn: "1h"
          }
        );

        return response(res, 200, "Auth Success", {
          token: token
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, 500, err);
    });
});
module.exports = router;
