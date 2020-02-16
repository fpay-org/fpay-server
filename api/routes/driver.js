const express = require("express");
const router = express.Router();

const handler = require("../handlers/driver");

router.get("/", handler.getAll);
router.get("/:nid", handler.getOne);
router.post("/:nid", handler.update);

module.exports = router;
