<h1>진행 상황 ~23.02.02</h1>

# 신수빈
개인 공부 진행 중 📖✏️

(API 계획) 

user 기능 CRU
일기 CRUD
통계 CRU

model 정의해야함ㅁㅁ
라우팅

user - 로그인
request 
POST api/user/login -> body로 정보 전달
{
	"user_id" : "user1",
	"user_password" : "password",
}
-인증 방식 결정 필요 -> 세션? 쿠키? 토큰?
response
{
	"status" : 200,
	"message" : "OK",
}

id 존재 x -> 404
password 일치 x -> 409

user - 회원가입
request 
POST api/user
{
	"user_id" : "user1",
	"user_password" : "password",
	"user_nickname" : "hi",
}

response
{
	"status" : 200,
	"message" : "OK",
}
id, 닉네임 중복 -> 409
값 입력 x -> 400 

user - 회원정보 수정
PK를 이용하여 엔티티 정보를 조회하고, -> user_id
리소스를 수정한 후 save() 메서드를 통해 변경사항을 저장

수정 전 비밀번호 확인 집어넣을 지?
PUT api/user/edit ? or api/user.${user_id}
PUT 요청 html에서 불가능 -> 자바스크립트 이용
{
	"user_id" : "user1",
}

response
{
	"status" : 200,
	"message" : "OK",
}

서비스 코드 적용되면 트랜잭션 종료 되므로 DB만 변경되고,
세션 값은 변경 되지 않음 -> 세션 이용하면 재로그인 필요

값 입력 x -> 400 

user - 로그아웃
-> 인증 방식 결정 후 결정

diary - 일기 작성
diary - 일기 수정
diary - 일기 삭제
diary - 일기 조회
diary - 통계 저장
diary - 통계 업데이트 (일기 업데이트 되는 경우)
diary - 통계 조회

# 고은아
