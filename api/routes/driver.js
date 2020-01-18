const express = require("express");
const router = express.Router();

const handler = require("../handlers/driver");

router.post("/:nid", handler.update);

module.exports = router;
