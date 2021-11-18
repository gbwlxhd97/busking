# 2021 융소 공모전. 버스킹 웹뷰 & 웹뷰 어플리케이션 프로젝트

## Web Deploy : https://focused-ride-b1185f.netlify.app/

## android downUrl : https://expo.dev/artifacts/9661e5ec-78ce-4036-9c94-af73e154957e

## ios downUrl : https://expo.dev/artifacts/4140913f-6aa5-4b42-a3c5-c7d536f1083f

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
