const express = require('express');

const router = express.Router();

// GET '/' 라우터
router.get('/', (req, res, next) => {
    console.log('라우트 레벨 미들웨어 사용해보기');
    res.status(200).send('라우트 레벨 미들웨어 사용해보기');
});

module.exports = router;