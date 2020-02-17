const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const handler = require("../handlers/auth");

router.get("/officer/login", handler.officerLogin);
router.post("/officer/register", handler.officerReg);

router.get("/driver/login", handler.driverLogin);
router.post("/driver/register", handler.driverReg);

// router.get("/driver/forgetPassword/:nid", handler.forgetPassword);

module.exports = router;
