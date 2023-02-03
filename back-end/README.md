<h1>진행 상황 ~23.02.03</h1>

# 신수빈
개인 공부 진행 중 📖✏️

(API 계획) 

1. user 기능 CRU
2. 일기 CRUD
3. 통계 CRU

model 정의해야함
라우팅

0. 홈 화면(index)
[세부기능]
1. user - 로그인 =========================================================
1) request
   - URL: ./user/login (api (-> url))
   - POST 방식 -> request message header로 정보 전달
   {
      "user_id" : "user1",
      "user_password" : "password"
   }
   - 인증 방식 결정 필요 -> 세션? 토큰?
   - DB에 존재할 경우, 세션 등 할당
2) response
   {
      "status" : 200,
      "message" : "OK",
   }
   - 예외 경우
      - id 존재 x -> 404
      - password 일치 x -> 409

2. user - 회원가입 =========================================================
1) request 
   - URL: ./user
   - POST 방식
   {
      "user_id" : "user1",
      "user_password" : "password",
   }

2) response
   {
      "status" : 200,
      "message" : "OK",
   }
   - 예외 경우
      - id, 닉네임 중복 -> 409
      - 값 입력 x -> 400 

3. user - 회원정보 수정 =========================================================
세션 가질 경우에 사용 가능한 기능

PK를 이용하여 엔티티 정보를 조회하고, -> user_id
리소스를 수정한 후 save() 메서드를 통해 변경사항을 저장

수정 전 비밀번호 확인 집어넣을 지?
PUT api/user/edit ? or api/user.${user_id}
PUT 요청 html에서 불가능 -> 자바스크립트 이용
(PUT 메소드: 서버의 데이터를 갱신, 작성)
1) request
   {
      "user_id" : "user1",
   }

2. response
   {
      "status" : 200,
      "message" : "OK",
   }

서비스 코드 적용되면 트랜잭션 종료 되므로 DB만 변경되고,
세션 값은 변경 되지 않음 -> 세션 이용하면 재로그인 필요

값 입력 x -> 400 

4. user - 로그아웃 =========================================================
-> 인증 방식 결정 후 결정


diary - 일기 작성
diary - 일기 수정
diary - 일기 삭제
diary - 일기 조회
diary - 통계 저장
diary - 통계 업데이트 (일기 업데이트 되는 경우)
diary - 통계 조회

# 고은아
