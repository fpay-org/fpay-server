const express = require("express");
const router = express.Router();

const handler = require("../handlers/me");

router.get("/me", handler.get);

module.exports = router;
