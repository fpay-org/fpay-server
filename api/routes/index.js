const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const meRoutes = require("./me");
const fineRoutes = require("./fines");
const driverRoutes = require("./driver");
const officerRoutes = require("./officer");
const dashboardRoutes = require("./dashboard");
const adminRoutes = require("./admin");
const penaltyRoutes = require("./penalties");

router.use("/auth", authRoutes);
router.use("/me", meRoutes);
router.use("/fines", fineRoutes);
router.use("/driver", driverRoutes);
router.use("/officer", officerRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);
router.use("/penalty", penaltyRoutes);

router.get("/", (req, res) => {
  res.sendFile(`__dirname/../views/index.html`);
});

module.exports = router;
