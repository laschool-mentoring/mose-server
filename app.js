// express 모듈 불러오기 -> python에서는 import 문 -> import express
const express = require('express');
const morgan = require('morgan'); // response 객체를 전달했을 때, 추가적인 로그를 콘솔 창에 생성해주는 패키지
const cookieParser = require('cookie-parser'); // 요청된 쿠키를 읽을 때 필요한 패키지
const session = require('express-session'); // 세션에 대한 기본 값들을 지정해주는 패키지
const dotenv = require('dotenv'); // .env 파일 내에 있는 변수들을 사용할 수 있게 만들어주는 패키지

// express 객체를 app 이라는 이름을 붙여서 사용하겠다
const app = express();
dotenv.config(); // .env 파일 안에 있는 환경변수를 읽을 수 있게 됩니다. -> process.env.(key) : value
app.set('port', process.env.PORT || 8081); // 서버가 실행될 포트 번호 설정, app.set(키, 값) -> app.get('port') = 8080

// third-party middleware
// morgan, cookie-parser, express-session, dotenv(.env)
app.use(morgan('dev')); // dev -> develop(개발), combined(배포), common, tiny ... 
app.use(cookieParser(process.env.COOKIE_SECRET)); // 암호화(서명) 어떤 이름? 쿠키를 발급
app.use(session({ // 세션에 대한 기본 정보를 설정
    resave: false, // 세션 데이터가 바뀌기 전까지 세션 저장소의 값을 저장할 것인지
    saveUninitialized: false, // 세션이 필요하기 전에 세션 구동할지 여부
    secret: process.env.COOKIE_SECRET, // cookieParser와 같은 암호화 사용
    cookie: {
        httpOnly: true, // JS 를 통한 세션 쿠키를 사용할 수 없도록 지정
        secure: false, // http 환경에서만 사용할 수 있게 지정(https 에서 사용 불가하도록 지정)
    },
}));

// application level middleware
// 1. 경로를 지정하지 않는 방법
// 모든 요청에 대해서 미들웨어가 실행되는 경우 -> app.use(미들웨어)
app.use((req, res, next) => {
    console.log('모든 요청에서 다 실행되는 친구입니다');
    next(); // 이 친구가 없으면, 다음 미들웨어로 넘어가지 않습니다.
});

// 2. 경로를 지정하는 방법
// GET 요청이 올 때, 어떤 동작을 할지 적는 부분, localhost:8080/ app.get(URL, 미들웨어) -> GET URL 요청이 올 때 실행됨
app.get('/', (req, res, next) => {
    console.log('GET 요청에서 실행되는 친구입니다');
    res.status(200).send('잘 응답했습니다'); // 이부분
});

// localhost:8080/errer -> 에러를 날리는 미들웨어 선언
app.get('/error', (req, res, next) => {
    console.log('err 발생');
    throw new Error('에러는 에러 처리 미들웨어로 전송됩니다.'); // 서버 상에서 에러가 발생한 문장
});

// 에러 처리 레벨 미들웨어
// 모든 에러를 잡아주는 코드를 작성 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message); // 응답을 에러 메시지를 담아서 보낸다.
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
// 미들웨어의 가장 큰 특징은 위에서부터 아래로 순서대로 실행