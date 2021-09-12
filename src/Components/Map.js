import React from 'react'
import "./style/Map.css"
import "./style/BuskerIntro.css"
import { server } from '../api';



/*global kakao*/ 
class Map extends React.Component{
    
    
    state = {
        nickname: " ",
        profilImg:" ",
        latlng:new kakao.maps.LatLng(37.509548, 127.089970),
        loading : true
    };
  

  nameIU;
  async getUser() {
    try { 
      let res = await server.getAllUser();
      let {data: {data }}= res 
    
    console.log(data);
    
    //  console.log(this.state);
    this.setState({
        nickname: data[0].loginID,
        profilImg: data[0].profileImgURL
      })
     // console.log(this.state);
     
    } catch (error) {
      console.log(error); 
    }
    
  }
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
  componentDidMount() {
    
    this.getUser();
}
  componentDidUpdate() {
    if(true) {
      this.makeMap()
    }
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
  
  markBusker(map) {

      var customOverlay=new kakao.maps.CustomOverlay({
        position: this.state.latlng
      });
      
      var content = document.createElement('div');
      content.className='buskers'

      
      var buskerImg=document.createElement('img');
      buskerImg.src=this.state.profilImg;
      content.appendChild(buskerImg);
      
      var nickname =document.createElement('span');
      nickname.className='busker-name';
      nickname.appendChild(document.createTextNode(this.state.nickname));
      content.appendChild(nickname);

      content.addEventListener('click',motion);

      function motion(){
        var introduce=document.createElement("div")
        introduce.className="introduce"

        var introProfile=document.createElement("div");
        introProfile.className="introProfile";
        var gimori = document.createElement("span");
        gimori.innerText="안녕하세요"
        introProfile.appendChild(gimori)
        // introProfile.innerText="안녕하세요"

        var closeBtn = document.createElement("button");
        closeBtn.className="closeBtn";
        closeBtn.innerText="X"

        var example = document.createElement("div");
        example.className="example";

        var userReservation = document.createElement("button");
        userReservation.className="userReservation";
        userReservation.innerText="노래 예약하러가기"

        content.removeEventListener('click',motion);

        var homeMap = document.querySelector(".homeMap")

        closeBtn.addEventListener('click',()=>{
          homeMap.removeChild(introduce);
          content.addEventListener('click',motion);
        })

        introProfile.appendChild(closeBtn);
        introduce.appendChild(introProfile);
        introduce.appendChild(userReservation);

        homeMap.appendChild(introduce);
      }
      customOverlay.setContent(content);
      customOverlay.setMap(map);
  }
  
  render(){
    
  
    return(
      <>
        <div className="map"> 
        </div>
        
      </>
    )
  }
}

export default Map;
