const express = require('express');
const router = express.Router();

router.use("/course", require("./course"))
router.use("/enrollment", require("./enrollment"))

module.exports = router;
