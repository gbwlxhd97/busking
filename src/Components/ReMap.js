import React,{useEffect,useState} from "react";
import { server } from '../api';

const {kakao} = window;
let imgBox=[];
function ReMap() {
    // eslint-disable-next-line
    const [kakaoMap,setKakaoMap] = useState(null)
    useEffect(() => {
        getUser();
        getTeam();
        
    },[])
    useEffect(() => {
        const container = document.getElementById('myMap');
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let pos = new kakao.maps.LatLng(lat,lon);
                
                let marker = new kakao.maps.Marker({  
                    position: pos
                });
                map.setCenter(pos); //이동
                marker.setMap(map) //마크찍기
            })
        }
        const options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 7
        };
        const map = new kakao.maps.Map(container, options);
        setKakaoMap(map)
    },[])
    return (
        <div id="myMap" style={{
            width: '300px',
            height: '300px'
        }}></div>
    )
}



//userApi
const getUser = async() => {
    try {
        const res = await server.getAllUser();
        const {data: {data}} =res;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const getTeam = async () => {
    try {
        const res =await server.getTeam()
        const {data: {data}} =res;
        const on = data.filter(e => e.onAir ===true)
        imgBox = on.map(e => e.leader).map(e => e.userDetail).map(e => e.profileImgURL)
        console.log(imgBox);
    } catch (error) {
        console.log(error);
    }
}

export default ReMap;