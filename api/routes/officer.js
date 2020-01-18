const express = require('express')
const router = express.Router();

const handler = require('../handlers/officer');

router.get('/', handler.getAll);
router.post("/:officer_id", handler.update);

module.exports = router;