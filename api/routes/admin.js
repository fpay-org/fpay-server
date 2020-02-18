const express = require("express");
const router = express.Router();

const handler = require("../handlers/admin");

router.post("/update-officer/:officer_id", handler.updateOfficer);

module.exports = router;
