import React from 'react'
import "./style/Map.css"
import "./style/BuskerIntro.css"
import { server } from '../api';

/*global kakao*/ 
class Map extends React.Component{
    state = {
        nickname:[],
        profilImg:[],
        latlng:[new kakao.maps.LatLng(37.509548, 127.089970),new kakao.maps.LatLng(37.497966, 127.095584),new kakao.maps.LatLng(37.509085, 127.072866)],/// 유저 위치를 받오는
        loading : true
    };
    
  async getUser() {
    try { 
      let res = await server.getAllUser();
      let {data: {data}}= res;
      let nickNameArray = [];
      let profilImgArray = [];

      data.map(data => {
        nickNameArray.push(data.nickName);
        profilImgArray.push(data.profileImgURL);
      });
      
    this.setState({
        nickname: nickNameArray,
        profilImg: profilImgArray
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
      
      var locPosition = new kakao.maps.LatLng(lat, lon);

      var marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
        }); 
      map.setCenter(locPosition); 
    });
  }
  
  markBusker(map) {
    let num =0;
    this.state.latlng.map(latlng=> {
      var customOverlay=new kakao.maps.CustomOverlay({
        position: latlng
      });
      
      var content = document.createElement('div');
      content.className='buskers'

      var buskerImg=document.createElement('img');
      buskerImg.src=this.state.profilImg[num];
      content.appendChild(buskerImg);
      
      var nickname =document.createElement('span');
      nickname.className='busker-name';
      nickname.innerText=this.state.nickname[num];
      content.appendChild(nickname);

      content.addEventListener('click',motion);

      function motion(){
        var introduce=document.createElement("div")
        introduce.className="introduce"

        var introProfile=document.createElement("div");

        introProfile.className="introProfile";
        introProfile.innerText="안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"

        var closeBtn = document.createElement("p");
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
      num=num+1;
    }
  )
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