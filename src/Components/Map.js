import React from 'react'
import "./style/Map.css"
import "./style/BuskerIntro.css"
// import "./style/BuskerIntro.css";
/*global kakao*/ 



class Map extends React.Component{
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    this.state = {
      profile:{
        nickname:"닉네임1",
        profilImg:"https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/067/872/918/67872918_1616652768439_20_600x600.JPG",
        latlng:new kakao.maps.LatLng(37.509548, 127.089970)
      },
    };
  };

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

      var customOverlay=new kakao.maps.CustomOverlay({
        position: this.state.profile.latlng
      });
      
      var content = document.createElement('div');
      content.className='buskers'

      
      var buskerImg=document.createElement('img');
      buskerImg.src=this.state.profile.profilImg;
      content.appendChild(buskerImg);

      var nickname =document.createElement('span');
      nickname.className='busker-name';
      nickname.appendChild(document.createTextNode(this.state.profile.nickname));
      content.appendChild(nickname);

      content.addEventListener('click',motion);

      function motion(){
        var introduce=document.createElement("div")

        var introProfile=document.createElement("span");

        introProfile.className="introProfile";
        introProfile.innerText="안녕하세요"

        var closeBtn = document.createElement("button");
        closeBtn.className="closeBtn";
        closeBtn.innerText="X"

        content.removeEventListener('click',motion);

        var homeMap = document.querySelector(".homeMap")
        closeBtn.addEventListener('click',()=>{
          homeMap.removeChild(introduce);
          content.addEventListener('click',motion);
        })
        
        
        introduce.appendChild(introProfile);
        introduce.appendChild(closeBtn);
        
        homeMap.appendChild(introduce);
      }



      customOverlay.setContent(content);
      customOverlay.setMap(map);
  }
  
    componentDidMount() {
      this.makeMap();
  }

  render(){

    return(
      <>
        <div className="map">  </div>
      </>
    )
  }
}

// component= 정적, state= 동적
export default Map;
