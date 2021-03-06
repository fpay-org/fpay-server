const mongoose = require("mongoose");
const storage = require("../services/storage");
const multer = require("multer");
const uuid = require("uuid");

const Fine = require("../models/fine");
const Dashboard = require("../models/dashboard");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
const Officer = require("../models/officer");
const Location = require("../models/location");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

// Should paginate
exports.getAll = async (req, res) => {
  Dashboard.find()
    .exec()
    .then(posts => response(res, posts))
    .catch(err => response(res, null, 500, err));
};

// exports.create = async (req, res) => {
//   const officer_id = await Officer.findOne({ officer_id: req.body.officer })
//     .exec()
//     .then(officer => officer._id)
//     .catch(err => response(res, null, 500, err));

//   const secondary_officer_id = await Officer.findOne({
//     officer_id: req.body.secondary_officer
//   })
//     .exec()
//     .then(officer => officer._id)
//     .catch(err => response(res, null, 500, err));

//   const driver_id = await Driver.findOne({ nid: req.body.driver_nid })
//     .exec()
//     .then(driver => driver._id)
//     .catch(err => response(res, null, 500, err));

//   // Schedule location

//   // Schedule vehicles

//   const penalties = req.body.penalties.map(penalty => penalty.toString());

exports.officerPost = async (req, res) => {
  logger.info("File:", req.file, "\nBody:", req.body);

  // storage.storeFile("fine_instances", req.file, async (err, url) => {
  //   if (err) response(res, null, 500, err);

  const officer_id = await Officer.findOne({ officer_id: req.body.officer })
    .exec()
    .then(officer => officer._id)
    .catch(err => response(res, null, 500, err));

  const first_name = await Officer.findOne({ officer_id: req.body.officer })
    .exec()
    .then(officer => officer.first_name)
    .catch(err => response(res, null, 500, err));

  const last_name = await Officer.findOne({ officer_id: req.body.officer })
    .exec()
    .then(officer => officer.last_name)
    .catch(err => response(res, null, 500, err));

  // const secondary_officer_id = await Officer.findOne({
  //   officer_id: req.body.secondary_officer
  // })
  //   .exec()
  //   .then(officer => officer._id)
  //   .catch(err => response(res, null, 500, err));

  // const driver_id = await Driver.findOne({ nid: req.body.driver_nid })
  //   .exec()
  //   .then(driver => driver._id)
  //   .catch(err => response(res, null, 500, err));

  // Schedule location

  // Schedule vehicles

  // const penalties = req.body.penalties
  //   .split(",")
  //   .map(penalty => penalty.toString());

  const dashboard = new Dashboard({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    first_name: first_name,
    last_name: last_name,
    content: req.body.content,
    officer: officer_id,
    location: req.body.location,
    image_url: req.body.image_url,
    posted_at: Date.now(),
    isVerified: false
  });

  dashboard
    .save()
    .then(dashboard => {
      logger.info("Post posted", dashboard);
      response(res, null, 201);
    })
    .catch(err => response(res, null, 500, err));
};

// exports.upload = async (req, res) => {
//   console.log(req.body);

//   storage.storeFile("fine_instances", req.file, (err, url) => {
//     if (err) response(res, null, 500, err);
//     response(res, url, 201);
//   });
// };

// exports.uploadWithData = async (req, res) => {
//   logger.info("File:", req.file, "\nBody:", req.body);

//   storage.storeFile("fine_instances", req.file, async (err, url) => {
//     if (err) response(res, null, 500, err);

//     const officer_id = await Officer.findOne({ officer_id: req.body.officer })
//       .exec()
//       .then(officer => officer._id)
//       .catch(err => response(res, null, 500, err));

//     const secondary_officer_id = await Officer.findOne({
//       officer_id: req.body.secondary_officer
//     })
//       .exec()
//       .then(officer => officer._id)
//       .catch(err => response(res, null, 500, err));

//     const driver_id = await Driver.findOne({ nid: req.body.driver_nid })
//       .exec()
//       .then(driver => driver._id)
//       .catch(err => response(res, null, 500, err));

//     // Schedule location

//     // Schedule vehicles

//     const penalties = req.body.penalties
//       .split(",")
//       .map(penalty => penalty.toString());

//     const fine = new Fine({
//       _id: new mongoose.Types.ObjectId(),
//       total_value: req.body.total_value,
//       currency: req.body.currency,
//       penalties: penalties,
//       driver: driver_id,
//       officer: officer_id,
//       secondary_officer: secondary_officer_id,
//       location: JSON.parse(JSON.parse(req.body.location)),
//       vehicle: req.body.vehicle_license_number,
//       image_url: url,
//       issued_at: Date.now()
//     });

//     fine
//       .save()
//       .then(fine => {
//         logger.info("Fine issued", fine);
//         response(res, null, 201);
//       })
//       .catch(err => response(res, null, 500, err));
//   });
// };

// exports.getByDriver = async (req, res) => {
//   if (req && req.params && req.params.nid) {
//     Driver.findOne({ nid: req.params.nid })
//       .exec()
//       .then(user => {
//         if (!!user) {
//           Fine.find({ driver: user._id })
//             .exec()
//             .then(docs => {
//               response(res, docs);
//             })
//             .catch(err => response(res, null, 500, err));
//         } else {
//           response(res, null, 404, "Invalid driver id");
//         }
//       })
//       .catch(err => response(res, null, 500, err));
//   } else {
//     response(res, null, 404, "No driver id found");
//   }
// };

// exports.getByOfficer = async (req, res) => {
//   if (req && req.params && req.params.officer_id) {
//     Officer.findOne({ officer_id: req.params.officer_id })
//       .exec()
//       .then(user => {
//         if (!!user) {
//           Fine.find({ officer: user._id })
//             .exec()
//             .then(docs => {
//               response(res, docs);
//             })
//             .catch(err => response(res, null, 500, err));
//         } else {
//           response(res, null, 404, "Invalid officer id");
//         }
//       })
//       .catch(err => response(res, null, 500, err));
//   } else {
//     response(res, null, 404, "No officer id found");
//   }
// };
