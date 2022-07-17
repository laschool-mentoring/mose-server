const express = require("express");
const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello user");
});

module.exports = router;
