import React from 'react'
import Motion from './motion'

/*global kakao*/ 
var positions = [
/*  {
    id:1,
    content: `<div onClick={${motion()}} class="buskers">`+
    '           <span class="busker-name">닉네임1</span>' +
    '           <img src="https://i1.sndcdn.com/artworks-000324021660-jgzmbq-t500x500.jpg">'+
    '         </div>', 
    latlng: new kakao.maps.LatLng(35.871999, 128.594241)
  },
  {
    id:2,
    content: `<div onClick={${motion()}} class="buskers">`+
    '           <span class="busker-name">닉네임2</span>' +
    `           <img  src="https://img.hankyung.com/photo/201910/01.20722973.1.jpg">`+
    '         </div>', 
    latlng: new kakao.maps.LatLng(36.995119, 127.132903)
  },*/
  {
    id:3,
    content: `<div onClick={${Motion}} class="buskers">`+
    '           <span class="busker-name">닉네임3</span>' +
    `           <img  src="https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/067/872/918/67872918_1616652768439_20_600x600.JPG">`+
    '         </div>', 
    latlng: new kakao.maps.LatLng(37.509548, 127.089970),

  }
];




class Map extends React.Component{

  makeMap(){
    var container = document.querySelector('.map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 7
    };
    var map = new kakao.maps.Map(container, options);
    this.markListener(map);
    this.markBusker(map);
  }
  
  markListener(map){
    navigator.geolocation.getCurrentPosition(function(position) {
        
      var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
      
      var locPosition = new kakao.maps.LatLng(lat, lon)
      // eslint-disable-next-line
      var marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
        }); 
      map.setCenter(locPosition); 
    });
  }

  markBusker(map){
    
//==> 버스킹 시작 버튼을 누르면 그 위치를 저장
  //==>예시를 넣은것이고 할 때는 geo를 써야함 사실 아직 geo 쓰는 이해 잘 안됐음
    //==> 버스커들의 프로필 사진 데이터 필요
        // 버스킹 시작 버튼누름 ==> api에서 프로필 사진 가지고 오면 content에 넣음 ==> 버튼 누름과 함께 위치정보를 가지고옴 
            //==> latlng: new kakao.maps.LatLng(latitude, longitude) 에 넣음
    for (var i = 0; i < positions.length; i ++) {

      var customOverlay = new kakao.maps.CustomOverlay({
          position: positions[i].latlng,
          content: positions[i].content   
      });
      customOverlay.setMap(map);
    }
    kakao.maps.event.addListener(customOverlay, 'click', function() {
      console.log("Qwerasdfzxcv");
  });

;
  }

    componentDidMount() {
      this.makeMap();

  }

  render(){

    return(
        <div className="map"></div> 
    )
  }
}

// component= 정적, state= 동적
export default Map;