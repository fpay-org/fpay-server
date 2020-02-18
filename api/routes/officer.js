const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const handler = require("../handlers/officer");

router.get("/", handler.getAll);
router.get("/:officer_id", handler.getOne);
router.post("/:officer_id", handler.update);
router.post("/:officer_id/password-update", handler.passUpdate);
router.post(
  "/:officer_id/avatar",
  upload.single("officer_image"),
  handler.updateAvatar
);

module.exports = router;
