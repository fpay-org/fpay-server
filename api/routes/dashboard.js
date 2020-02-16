const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const handler = require("../handlers/dashboard");

router.get("/", handler.getAll);
router.post("/post", handler.officerPost);

// router.get("/officer/login", handler.officerLogin);
// router.get("/driver/login", handler.driverLogin);
// router.post("/officer/register", handler.officerReg);
// router.post("/driver/register", handler.driverReg);
// router.post(
//   "/officer/upload",
//   upload.single("officer_avatar"),
//   handler.officerAvatar
// );
// router.post(
//   "/officer/registerWithImage",
//   upload.single("officer_image"),
//   handler.officerRegWithImage
// );
// router.post(
//   "/driver/upload",
//   upload.single("driver_image"),
//   handler.driverAvatar
// );
// router.post(
//   "/driver/registerWithImage",
//   upload.single("driver_image"),
//   handler.driverRegWithImage
// );

module.exports = router;
