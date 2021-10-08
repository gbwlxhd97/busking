import React,{useEffect,useState} from "react";
import { server } from '../api';

const {kakao} = window;
let imgBox=[];
function ReMap(props) {
    console.log(props);
    // eslint-disable-next-line
    const [kakaoMap,setKakaoMap] = useState(null)
    const [pospos,setPosPos] = useState(props.pos2)
    useEffect(() => {
        getUser();
        getTeam();
    },[]);
    useEffect(() => {
        setTimeout(() => {
            console.log(props);
        },5000)
    })
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
    },[pospos])
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
        console.log(on.map(e => e.leader));
    } catch (error) {
        console.log(error);
    }
}

export default ReMap;