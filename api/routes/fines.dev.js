const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const request = require("request");

const Fine = require("../models/fine");

const Logger = require("../utils/logger");
const logger = new Logger();
const response = require("../utils/response");

/* /fines - return all fines */
router.get("/", (req, res, next) => {
  Fine.find({})
    .exec()
    .then(document => {
      response(res, 200, "Success", document);
    })
    .catch(err => response(res, 500, err));
});

/* /fines/issue - issue new fine */
router.post("/issue/", (req, res, next) => {
  const fine = new Fine({
    _id: new mongoose.Types.ObjectId(),
    value: req.body.value,
    penalties: req.body.penalties,
    driver: req.body.driver,
    officer: req.body.officer,
    secondary_officer: req.body.secondary_officer,
    location: req.body.location,
    vehicle: req.body.vehicle
  });

  fine
    .save()
    .then(result => {
      logger.info("New fine issued", result);

      request.post(
        "https://app.notify.lk/api/v1/send",
        {
          json: {
            user_id: "11064",
            api_key: "rNDfHqSYd88isR6ye7KB",
            sender_id: "NotifyDEMO",
            to: 94712732531,
            message: `A new fine has been issued to you. Fine value Rs ${2500}`
          }
        },
        (error, res, body) => {
          logger.info("Response", res.body);
        }
      );

      return response(res, 201, "Success");
    })
    .catch(err => console.log(err));
});

router.get("/driver/:id", (req, res, next) => {
  Fine.find({
    driver: req.params.id
  })
    .exec()
    .then()
    .catch();
});

/* /fines/:id - return single fine */

/* fines/update/:id - update issued fine */

module.exports = router;
