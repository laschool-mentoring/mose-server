// express 모듈 불러오기 -> python에서는 import 문 -> import express
const express = require('express');

// express 객체를 app 이라는 이름을 붙여서 사용하겠다
const app = express();
app.set('port', process.env.PORT || 8080); // 서버가 실행될 포트 번호 설정, app.set(키, 값) -> app.get('port') = 8080

// 모든 요청에 대해서 미들웨어가 실행되는 경우 -> app.use(미들웨어)
app.use((req, res, next) => {
    console.log('모든 요청에서 다 실행되는 친구입니다');
    next();
});

// GET 요청이 올 때, 어떤 동작을 할지 적는 부분, localhost:8080/ app.get(URL, 미들웨어) -> GET URL 요청이 올 때 실행됨
app.get('/', (req, res, next) => {
    console.log('GET 요청에서 실행되는 친구입니다');
});

// 에러 처리하는 라우팅 예시
app.get('/error', (req, res, next) => {
    console.log('err 발생');
    throw new Error('에러는 에러 처리 미들웨어로 전송됩니다.'); // 서버 상에서 에러가 발생한 문장
});

// 에러를 잡아주는 코드를 작성 -> 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

// http 웹 서버와 동일하게 서버 포트를 연결하고 서버를 실행하는 코드
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});



// 미들웨어 -> 익스프레스 모듈의 핵심이라고 생각하면 됩니다~
// 요청과 응답 Req Res 사이에서 중간(미들) 목적에 맞게 처리해주는 친구
// 요청 -> 들어오면 그에 따른 response 보내준다
// 응답 보내기 전에 미들웨어가 지정한 동작을 다 수행 후에 응답
// 미들웨어는 위에서부터 아래 순서로 진행
// app.use(미들웨어) -> 모든 요청에서 미들웨어 실행
// app.get(URL, 미들웨어) -> GET URL 요청이 들어왔을 때, 뒤에 있는 미들웨어가 실행
// app.post(URL, 미들웨어) -> POST URL 요청이 들어왔을 때, 뒤에 있는 미들웨어가 실행
// Node.js 교과서 책 6.1강 