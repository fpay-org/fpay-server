const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const meRoutes = require("./me");
const fineRoutes = require("./fines");

router.use("/auth", authRoutes);
router.use("/me", meRoutes);
router.use("/fines", fineRoutes);

router.get("/", (req, res) => {
  res.sendFile("./api/views/index.html");
});

module.exports = router;
