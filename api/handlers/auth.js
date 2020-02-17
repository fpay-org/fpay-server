const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const storage = require("../services/storage");

const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

/* Officer authentication */

const Officer = require("../models/officer");

/**
 * Return new user token
 * @param {string} officerID: new officer's ID
 * @param {string} password: new officer's password
 * @return {string} 201: Token
 */

exports.officerReg = async (req, res, next) => {
  Officer.find({ officer_id: req.body.officer_id })
    .exec()
    .then(officer => {
      if (officer.length > 0)
        return response(res, null, 409, "Officer already registered");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          logger.error(err);
          return response(res, null, 500, err);
        } else {
          const officer = new Officer({
            _id: new mongoose.Types.ObjectId(),
            officer_id: req.body.officer_id,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role: req.body.role,
            permission_level: req.body.permission_level,
            fines_issued: req.body.fines_issued,
            contact_number: req.body.contact_number,
            police_station: req.body.police_station,
            email: req.body.email,
            nic: req.body.nic
            // Write image upload
          });

          officer
            .save()
            .then(result => {
              logger.info("Officer created", result);
              return response(res, result, 201, "Officer created");
            })
            .catch(error => {
              logger.error(error);
              return response(res, null, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};

exports.officerLogin = async (req, res, next) => {
  Officer.find({ officer_id: req.query.officer_id })
    .exec()
    .then(officer => {
      if (officer.length < 1) return response(res, null, 401, "Auth failed");
      bcrypt.compare(req.query.password, officer[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, null, 401, "Auth failed");
        }

        if (!result) return response(res, null, 401, "Auth failed");

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
            first_name: officer[0].first_name,
            role: 1
          },
          data.JWT_SECRET,
          {
            //expiresIn: "1h"
          }
        );

        return response(res, {
          token: token
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};

/* Driver authentication */

const Driver = require("../models/driver");

exports.driverReg = async (req, res, next) => {
  Driver.find({ nid: req.body.nid })
    .exec()
    .then(driver => {
      if (driver.length > 0)
        return response(res, null, 409, "Driver already registered");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          logger.error(err);
          return response(res, null, 500, err);
        } else {
          const driver = new Driver({
            _id: new mongoose.Types.ObjectId(),
            nid: req.body.nid,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            fines: req.body.fines,
            vehicles: req.body.vehicles,
            contact_number: req.body.contact_number,
            license_number: req.body.license_number
            // Write image upload
          });

          driver
            .save()
            .then(result => {
              logger.info("Driver created", result);
              return response(res, result, 201, "Driver created");
            })
            .catch(error => {
              logger.error(error);
              return response(res, null, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};

exports.driverLogin = async (req, res, next) => {
  Driver.find({ nid: req.query.nid })
    .exec()
    .then(driver => {
      if (driver.length < 1) return response(res, null, 401, "Auth failed");
      bcrypt.compare(req.query.password, driver[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, null, 401, "Auth failed");
        }

        if (!result) return response(res, null, 401, "Auth failed");

        logger.info("Driver", driver[0].first_name, "Authorized");
        const token = jwt.sign(
          {
            id: driver[0]._id,
            nid: driver[0].nid,
            first_name: driver[0].first_name,
            role: 0
          },
          data.JWT_SECRET,
          {
            //expiresIn: "1h"
          }
        );

        return response(res, {
          token: token
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};

exports.driverAvatar = async (req, res) => {
  await storage.storeFile("driver_avatars", req.file, (err, url) => {
    if (err) response(res, null, 500, err);

    response(res, url, 201);
  });
};

exports.forgetPassword = async (req, res) => {
  
};
