const express = require("express"); // express 모듈
const router = express.Router(); // Router 객체 만들어주기

// URL : http://localhost:8080/test, METHOD: GET -> res.send('Hello test');
router.get("/test", (req, res, next) => {
  res.send("Hello TEST");
});

module.exports = router; // 모듈로 만들어주기
