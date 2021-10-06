import React from 'react'
import "./style/Map.css"
import "./style/BuskerIntro.css"
import { server } from '../api'; //api 받아오기



/*global kakao*/ 
class Map extends React.Component{
    
    
  state = {
      nickname: " ",
      profilImg:" ",
      latlng:new kakao.maps.LatLng(37.509548, 127.089970),
      loading : true
  };

  async getUser() {     //유저정보 가져오기
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
  makeMap(){      //맵자체
    var container = document.querySelector('.map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 7
    };
    var map = new kakao.maps.Map(container, options);
    
    this.markListener(map);      //파란 화살표
    this.markBusker(map);            //아이유
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
        introduce.className="introduce"

        var introProfile=document.createElement("div");

        introProfile.className="introProfile";
        introProfile.innerText="안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"

        var closeBtn = document.createElement("button");
        closeBtn.className="closeBtn";
        closeBtn.innerText="X"


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
