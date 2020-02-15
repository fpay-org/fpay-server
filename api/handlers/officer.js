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


// exports.passUpdate = async (req, res) => {
//   if (req && req.params && req.params.officer_id) {
//     logger.info("Update password request for", req.params.officer_id);

//     Officer.findOne({ officer_id: req.params.officer_id })
//       .exec()
//       .then(user => {
//         if (!!user) {
//           bcrypt.compare(req.body.password, user.password, (err, result) => {
//             if (err) {
//               logger.error(err);
//               response(res, null, 401, "Invalid password");
//             }

//             if (!result) return response(res, null, 401, "Invalid password");

//             const updateDoc = {
//               email: req.body.email,
//               contact_number: req.body.contact_number
//             };

//             Officer.updateOne({ officer_id: req.params.officer_id }, updateDoc)
//               .exec()
//               .then(result => {
//                 if (result) {
//                   response(res, null, 202, "User updated");
//                 }
//               })
//               .catch(err => response(res, null, 500, err));
//           });
//         } else {
//           response(res, null, 404, "Invalid officer id");
//         }
//       })
//       .catch(err => response(res, null, 500, err));
//   } else {
//     response(res, null, 404, "No officer id found");
//   }
// };


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

  // exports.passUpdate = async (req, res, next) => {
  //   Officer.find({ officer_id: req.body.officer_id })
  //     .exec()
  //     .then(officer => {
  //       if (officer.length > 0)
  //         return response(res, null, 409, "Officer already registered");
  
  //       bcrypt.hash(req.body.password, 10, (err, hash) => {
  //         if (err) {
  //           logger.error(err);
  //           return response(res, null, 500, err);
  //         } else {
  //           const officer = new Officer({
  //             _id: new mongoose.Types.ObjectId(),
  //             officer_id: req.body.officer_id,
  //             password: hash,
  //             first_name: req.body.first_name,
  //             last_name: req.body.last_name,
  //             role: req.body.role,
  //             permission_level: req.body.permission_level,
  //             fines_issued: req.body.fines_issued,
  //             contact_number: req.body.contact_number,
  //             police_station: req.body.police_station,
  //             email: req.body.email,
  //             nic: req.body.nic
  //             // Write image upload
  //           });
  
  //           officer
  //             .save()
  //             .then(result => {
  //               logger.info("Officer created", result);
  //               return response(res, result, 201, "Officer created");
  //             })
  //             .catch(error => {
  //               logger.error(error);
  //               return response(res, null, 500, error);
  //             });
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       logger.error(err);
  //       return response(res, null, 500, err);
  //     });
  // };