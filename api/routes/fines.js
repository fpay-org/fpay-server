const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Fine = require("../models/fine");

/* /fines - return all fines */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET"
  });
});

/* /fines/issue - issue new fine */
router.post("/issue/", (req, res, next) => {
  const fine = new Fine({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number
  });

  fine
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(201).json({
    message: "Handling POST",
    success: fine
  });
});

/* /fines/:id - return single fine */

/* fines/update/:id - update issued fine */

module.exports = router;
