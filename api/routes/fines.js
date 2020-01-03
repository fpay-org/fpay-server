const express = require("express");
const router = express.Router();

const handler = require("../handlers/fines");

router.get("/", handler.getAll);
router.get("/driver/:nid", handler.getByDriver);
router.post("/", handler.create);

module.exports = router;
