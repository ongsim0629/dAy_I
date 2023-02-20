-- 1. User Table
create table user(
	user_id varchar(30) primary key,
    user_password varchar(300) NOT NULL,
    salt bigint NOT NULL,
	user_point INT NULL,  -- 원래 NOT NULL (front 개발 전이기에 일단 NULL)
	user_age INT NULL,  -- 원래 NOT NULL (front 개발 전이기에 일단 NULL)
	user_sex CHAR(10) NULL  -- 원래 NOT NULL (front 개발 전이기에 일단 NULL)
);
/* +) primary key는 애초에 not null인데 명시가 필요한가?
	user_point의 경우 default는 0
*/

-- 2. PlayList Table
CREATE TABLE PLAYLIST(
	PLAYLIST_ID INT auto_increment primary key,
	PLAYLIST_URL VARCHAR(20000) not null,
	PLAYLIST_TITLE VARCHAR(100) NOT NULL,
	PLAYLIST_PRODUCER VARCHAR(50) NOT NULL,
	PLAYLIST_EMOTION VARCHAR(20) NOT NULL
);

-- 3. Site Table
CREATE TABLE CATEGORYSITE(
	SITE_CATEGORY VARCHAR(20) PRIMARY KEY,
	SITE_URL VARCHAR(200) NOT NULL unique,
	SITE_TITLE VARCHAR(30) NOT NULL
);
/* +) URL에 한글이 들어가는 경우도 있기에 일단 UTF-8 인코딩 사용으로 가정 후, 모델링 수행 */

-- 4. KEYWORD TABLE
CREATE TABLE KEYWORD(
	KEYWORD VARCHAR(20) PRIMARY KEY,
	CATEGORY VARCHAR(20) NOT NULL,
    
    FOREIGN KEY (CATEGORY) REFERENCES CATEGORYSITE(SITE_CATEGORY)
);

-- 5. Diary Table
CREATE TABLE DIARY (
	DIARY_WRITER_ID CHAR(30) NOT NULL,
    DIARY_WRITE_DATE VARCHAR(20) NOT NULL,
    
    DIARY_TITLE VARCHAR(500) NOT NULL,
	DIARY_CONTENT VARCHAR(20000) NOT NULL,
    
    DIARY_KEYWORD VARCHAR(20) NULL,
    DIARY_CATEGORY_SITE VARCHAR(200) NULL, -- SITE 의미
    
	DIARY_EMOTION VARCHAR(20) NULL, -- 7가지
	DIARY_PLAYLIST INT NULL,
    DIARY_SUMMARY VARCHAR(1000) NULL,
	DIARY_BOOKMARK BOOLEAN NULL,
	
	
	 PRIMARY KEY (DIARY_WRITER_ID, DIARY_WRITE_DATE),
	 FOREIGN KEY (DIARY_WRITER_ID) REFERENCES USER(USER_ID),
     
     FOREIGN KEY (DIARY_KEYWORD) REFERENCES KEYWORD(KEYWORD),
     FOREIGN KEY (DIARY_CATEGORY_SITE) REFERENCES CATEGORYSITE(SITE_URL),
     
	 FOREIGN KEY (DIARY_PLAYLIST) REFERENCES PLAYLIST(PLAYLIST_ID)
);
/* +) varchar형의 max값은 65,535지만, UTF-8 인코딩을 사용할 경우, 최대값이 21844
utf-8 인코딩 한글자는 3바이트 -> 최대 인덱스 길이: 3072바이트 -> 최대 1024바이트

DIARY_BOOKMARK는 BOOLEAN값으로, 기본은 FALSE지만, 값이 없는 경우도 FALSE로 판단
BOOLEAN이 아닌 TINYINT값도 후보에 있었지만 일단 BOOLEAN 채택
*/



-- 현재 스키마 전체 TABLE 목록 보기
show tables;

-- 전체 테이블 DROP 하고 싶을 경우, 순서대로 실행시키기
drop table diary;
drop table keyword;
drop table categorysite;
drop table playlist;
drop table user;

-- select문 모음
select * from user;
select * from playlist;
select * from categorysite;
select * from keyword;
select * from diary;