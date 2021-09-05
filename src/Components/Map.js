import React from 'react'
import "./style/Map.css"
import "./style/BuskerIntro.css"
import { server } from '../api';



/*global kakao*/ 
class Map extends React.Component{
    state = {
        nickname: "",
        profilImg:"",
        latlng:new kakao.maps.LatLng(37.509548, 127.089970)
    };
  

  nameIU;
  async getUser() {
    try {
      let data1 = await server.getAllUser();
      let {data: {data}}= data1
      console.log(data.map((e)=>console.log(e.username)));
    this.setState({
      nickname: data[0].username,
      profilImg: data[0].profileImgURL
      })
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
    console.log(this.state.nickname);
}

  componentDidUpdate(){
    if(true){
      this.makeMap();
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
      nickname.innerText=this.state.nickname;
      console.log(this.nameIU);
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
  
  render(){
    return(
      <>
        <div className="map"> 
        </div>

      </>
    )
  }
}

// component= 정적, state= 동적
export default Map;
