const mongoose = require("mongoose");
const Officer = require("../models/officer");
const bcrypt = require("bcrypt");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

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
    logger.info("Update password request for", req.params.officer_id);

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
    logger.info("Update password request for", req.params.officer_id);

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


            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                logger.error(err);
                return response(res, null, 500, err);
              } else {
                const updateDoc = {
                  password: hash
                };
      
                officer.updateOne({ officer_id: req.params.officer_id }, updateDoc).exec()
                  .then(result => {
                    if(result){
                      logger.info("Officer password updated", result);
                    return response(res, result, 202, "Officer password updated");
                    }
                    
                  })
                  .catch(error => {
                    logger.error(error);
                    return response(res, null, 500, error);
                  });
              }
            });
           
          });      
        }});
      }}
      //       Officer.updateOne({ officer_id: req.params.officer_id }, updateDoc)
      //         .exec()
      //         .then(result => {
      //           if (result) {
      //             response(res, null, 202, "Password updated");
      //           }
      //         })
      //         .catch(err => response(res, null, 500, err));
      //     });
      //   } else {
      //     response(res, null, 404, "Invalid officer id");
      //   }
      // })
      // .catch(err => response(res, null, 500, err));
 // }
  //  else {
  //   response(res, null, 404, "No officer id found");
  // }

