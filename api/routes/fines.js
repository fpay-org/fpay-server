const express = require("express");
const router = express.Router();

/* /fines - return all fines */
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET"
  });
});

/* /fines/issue - issue new fine */

/* /fines/:id - return single fine */

/* fines/update/:id - update issued fine */

module.exports = router;
