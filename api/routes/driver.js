const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const handler = require("../handlers/driver");

router.get("/", handler.getAll);
router.get("/:nid", handler.getOne);
router.post("/:nid", handler.update);
router.post(
  "/:nid/avatar",
  upload.single("driver_image"),
  handler.updateAvatar
);
router.get("/:nid/delete", handler.delete);

module.exports = router;
