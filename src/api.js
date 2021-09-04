/*global kakao*/ 
export const positions = [
    {
      id:1,
      content: `<div  class="buskers">`+
      '           <span class="busker-name">닉네임1</span>' +
      '           <img src="https://i1.sndcdn.com/artworks-000324021660-jgzmbq-t500x500.jpg">'+
      '         </div>', 
      latlng: new kakao.maps.LatLng(35.871999, 128.594241),
      name: '헤이즈'
    },
    {
      id:2,
      content: `<div  class="buskers">`+
      '           <span class="busker-name">닉네임2</span>' +
      `           <img  src="https://img.hankyung.com/photo/201910/01.20722973.1.jpg">`+
      '         </div>', 
      latlng: new kakao.maps.LatLng(36.995119, 127.132903),
      name: '누군지모르겠음'
    },
    {
      id:3,
      content: `<div class="buskers">`+
      '           <span class="busker-name">닉네임3</span>' +
      `           <img  src="https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/067/872/918/67872918_1616652768439_20_600x600.JPG">`+
      '         </div>', 
      latlng: new kakao.maps.LatLng(37.509548, 127.089970),
      name: '아이유'
  
    }
]
//es6 모듈화

export const imgData = document.querySelector('.busker-name')
//지도만띄우고
//img를 