import React,{useEffect,useState} from "react";
import { server } from '../api';

const {kakao} = window;
let imgBox=[];
let testBox = [];
let test;
let t1;
let t2;
function ReMap(props) {
    // eslint-disable-next-line
    const [kakaoMap,setKakaoMap] = useState(null)
    // eslint-disable-next-line
    const [pospos,setPosPos] = useState('아무것도아니야')
    const [tes1,setTes1] = useState(testBox)
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

    const getTeam = async () => {
        try {
            const res =await server.getTeam()
            const {data: {data}} =res;
            const on = data.filter(e => e.onAir ===true)
            testBox = [...on.map(e => e.leader.userDetail.profileImgURL)]
            console.log(testBox);
            setTes1(testBox)
            console.log(tes1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(tes1);
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


        // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;            
}

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
function createMarker(position, image) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image
    });
    
    return marker;  
}   

var storePositions = [
    new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
    new kakao.maps.LatLng(38.49671536281186, 127.03020491448352)
];
var markerImageSrc = tes1[0];  // 마커이미지의 주소입니다. 스프라이트 이미지 입니다
let storeMarkers = []

createStoreMarkers()
function createStoreMarkers() {
    for(let i=0; i <storePositions.length; i++) {
        var imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 36),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
    
        // 마커이미지와 마커를 생성합니다
        var markerImage = createMarkerImage(markerImageSrc, imageSize, imageOptions),    
            marker = createMarker(storePositions[i], markerImage);
            console.log(markerImageSrc);
            storeMarkers.push(marker)
    }
}

function setStoreMarkers(map) {
    for(let i=0; i<storeMarkers.length; i++) {
        storeMarkers[i].setMap(map)
    }
}
setStoreMarkers(map)
    },[tes1])
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






export default ReMap;