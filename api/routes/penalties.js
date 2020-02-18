const express = require("express");
const router = express.Router();

const handler = require("../handlers/penalty");

router.get("/", handler.getAll);
router.post("/", handler.create);

module.exports = router;
