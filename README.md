# 2021 융소 공모전. 버스킹 웹뷰 & 웹뷰 어플리케이션 프로젝트

## 프로젝트 소개
```
  1. 거리에서 길거리공연(버스킹)을 하는 사람들은 보통 sns를 통해서 홍보하곤 하는데 
     sns를 하지 않는 사람도 있기 떄문에 해당 공연을하는 사람의 공연을 놓칠 수 있다.
     해당 공연을 하는사람들의 위치를 표시해주면 도움이 될것같다.  
  2. 공연을 하는 사람들은 때론 준비한 곡 이외의 신청곡도 받을 수 있게 끔 노래를 신청하는 기능을 넣어주자.
  3. 공연을 하는 사람들을 위해 노래가사를 준비해주자.
```
## Web Deploy : https://focused-ride-b1185f.netlify.app/

## android downUrl : https://expo.dev/artifacts/9661e5ec-78ce-4036-9c94-af73e154957e

## backEnd 저장소
<a href="https://github.com/emibgo2/busking">링크</a>

## 팀원 소개   
| `프론트`이지원 | `프론트`유영하 | `프론트`이채린 | `프론트`김동주 | `백엔드`고지훈 |
|------|------|------|------|------|------|
| <img style="width:100%" src = "https://github.com/gbwlxhd97.png"> | <img style="width:100%" src = "https://github.com/ryuyh2000.png"> | <img style="width:100%" src = "https://github.com/Lee-chaerin.png"> | <img style="width:100%" src = "https://github.com/kdj38245.png"> | <img style="width:100%" src = "https://github.com/emibgo2.png"> |
| [gbwlxhd97](https://github.com/gbwlxhd97) | [ryuyh2000](https://github.com/ryuyh2000) | [Lee-chaerin](https://github.com/Lee-chaerin) | [kdj38245](https://github.com/kdj38245) | [emibgo2](https://github.com/emibgo2) 

## 기술 스택
### ***frontend***
```
- JavaScript
- React
- React Native(WebView)
- Styled-components
- Axios
```

### ***backend***
```
- Spring boot
- Spring Security
- JPA
- MySQL
- JWT
```

### 메인 화면 개발 일지

- [O] 현재 나의 위치를 지도에 표시해둠.
- [O] 버스킹 방송을 진행한 팀들의 위치를 지도에 표시
- [O] 버스킹 방송을 진행하고 있는 팀을 검색
- [O] 버스킹을 진행하고 있는 노래의 가사와 노래 제목을 관람객들이 볼 수 있음
- [O] 노래를 예약할 수 있고 예약된 곡을 취소할 수 있음.

### 폴더 구조 설명

- Components : 재사용성 가능한 js파일 (Ex: Map)
- Routes: 경로를 나타내는 페이지 라우팅
- assets: 프로필 이미지를 설정하지않은 유저의 디폴트 이미지를 저장
- service: 서버에서 데이터를 받아오는 폴더 기능별로 나뉘어져있다 (ex:계정관리 auth.js, 음악관리 music.js 등등...)
