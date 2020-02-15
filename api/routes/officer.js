const express = require('express')
const router = express.Router();

const handler = require('../handlers/officer');

router.post("/:officer_id", handler.update);
router.post("/pass/:officer_id", handler.passUpdate);

module.exports = router;