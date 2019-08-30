const express = require("express");
const router = express.Router();

/* /fines - return all fines */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET"
  });
});

/* /fines/issue - issue new fine */
router.post("/issue/", (req, res, next) => {
  // const fine = {
  //   name: req.body.name,
  //   number: req.body.number
  // };

  // res.status(201).json({
  //   message: "Handling POST",
  //   success: fine
  // });
  console.log(req.body);
});

/* /fines/:id - return single fine */

/* fines/update/:id - update issued fine */

module.exports = router;
