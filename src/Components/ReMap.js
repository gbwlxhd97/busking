import React,{useEffect,useState} from "react";
import { server } from '../api';

const {kakao} = window;
let imgBox=[];
let test;
let t1;
let t2;
function ReMap(props) {
    // eslint-disable-next-line
    const [kakaoMap,setKakaoMap] = useState(null)
    // eslint-disable-next-line
    const [pospos,setPosPos] = useState('아무것도아니야')
    useEffect(() => {
        getUser();
        getTeam();
    },[]);
    useEffect(() => {
        let a = props.pos3.join(' ').split(',')
        console.log(Object.assign({}, a));
        let tt = Object.assign({}, a)
        test =tt;
        t1 =parseFloat(test[0])
        t2 =parseFloat(test[1])
        // console.log(t1);
        // console.log(t2);
        setPosPos(props.pos3.join(' '))
        
        // setPosPos(Object.assign({}, a))
        // console.log(typeof a);
        // console.log(pospos === a);
        
    })
    useEffect(() => {
        const container = document.getElementById('myMap');
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let pos = new kakao.maps.LatLng(lat,lon);
        
                const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
                    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
                    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                    markerPosition = new kakao.maps.LatLng(t1,t2); // 마커가 표시될 위치입니다
                    console.log(pospos);
                    console.log(t1);
                    console.log(t2);
                    
                    let marker = new kakao.maps.Marker({  
                        position: pos
                    });
                    let marker2 = new kakao.maps.Marker({
                        position: markerPosition,
                        image: markerImage
                    })
                    map.setCenter(pos); //이동
                    marker.setMap(map) //마크찍기
                    setTimeout(() => {
                        console.log('hi');
                        marker2.setMap(map)
                    },5000)
                    // marker2.setMap(map)
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