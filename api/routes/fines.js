const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const handler = require("../handlers/fines");

router.get("/", handler.getAll);
router.post("/", handler.create);
router.get("/driver/:nid", handler.getByDriver);
router.get("/:fine_id/pay", handler.payFine);
router.get("/officer/:officer_id", handler.getByOfficer);
router.post("/upload", upload.single("officer_image"), handler.upload);
router.post(
  "/uploadWithData",
  upload.single("officer_image"),
  handler.uploadWithData
);

module.exports = router;
