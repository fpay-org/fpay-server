const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            });

            user
              .save()
              .then(result => {
                console.log("User created\nObject: " + result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(error => {
                console.log(error);
                res.status(500).json({
                  error: error
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          "fpaysecret",
          {
            expiresIn: "1h"
          }
        );

        return res.status(200).json({
          message: "Auth Success",
          token: token
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/remove/:userId", (req, res, next) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        User.deleteOne({ _id: req.params.userId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "User deleted"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      } else {
        //TODO: Validate the response code
        return res.status(500).json({
          message: "User doesn't exists"
        });
      }
    });
});

module.exports = router;
