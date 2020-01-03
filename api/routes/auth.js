const express = require("express");
const router = express.Router();

const handler = require("../handlers/auth");

router.post("/officer/register", handler.officerReg);
router.post("/driver/register", handler.driverReg);
router.get("/officer/login", handler.officerLogin);
router.get("/driver/login", handler.driverLogin);

module.exports = router;

