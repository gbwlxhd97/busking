/*global kakao*/ 
import React from 'react'
import "./STYLE/Map.css"

class Map extends React.Component{

  makeMap(){
    var container = document.querySelector('.map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 14
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
      
      var marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
        }); 
      map.setCenter(locPosition); 
    });
  }

  markBusker(map){
    var positions = [
      {
          content: '<div class="buskers-img">'+
          '<img src="https://i1.sndcdn.com/artworks-000324021660-jgzmbq-t500x500.jpg"'+
          '</div>', 
          latlng: new kakao.maps.LatLng(35.871999, 128.594241)
      }
  ];
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