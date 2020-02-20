const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const storage = require("../services/storage");

const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

const Officer = require("../models/officer");

/**
 * Return new user token
 * @param {string} Officer: update officer object
 * @return {string} 200: Success
 */

exports.updateOfficer = async (req, res, next) => {
  if (req && req.params && req.params.officer_id) {
    logger.info("Update request for", req.params.officer_id);

    Officer.findOne({ officer_id: req.params.officer_id })
      .exec()
      .then(user => {
        if (!!user) {
          const updateDoc = {
            officer_id: req.body.officer_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            permission_level: req.body.permission_level,
            contact_number: req.body.contact_number,
            police_station: req.body.police_station,
            email: req.body.email,
            nic: req.body.nic
          };

          Officer.updateOne({ officer_id: req.params.officer_id }, updateDoc)
            .exec()
            .then(result => {
              if (result) response(res, null, 202, "Officer updated");
            })
            .catch(err => response(res, null, 500, err));
        } else {
          response(res, null, 404, "Invalid officer id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No officer id found");
  }
};
