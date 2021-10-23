import React,{useEffect,useState} from "react";
import { server } from '../api';

const {kakao} = window;
let imgBox=[];
let burkerImgSave = [];
let test;
let t1;
let t2;
let intro = []

//밑에는 home.js에서 props로 각 사용자별 위치값을 [{}] 형태로 넣어주는 위치데이터
var buskerPositions = [
    {
        imgSrc : "https://i.pinimg.com/originals/c0/da/57/c0da57e76bde0ccc9fc503bb3f77d217.jpg",
        latlng: new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
    },
    {
        imgSrc : "https://ssl.pstatic.net/tveta/libs/1349/1349760/bdcd665caf6ebdd5faf1_20211015141108350.jpg",
        latlng: new kakao.maps.LatLng(38.49671536281186, 127.03020491448352),
    },
    {
        imgSrc : "https://ssl.pstatic.net/tveta/libs/1349/1349760/bdcd665caf6ebdd5faf1_20211015141108350.jpg",
        latlng: new kakao.maps.LatLng(37.0671536281186, 127.03020491448352),
    }
]

function ReMap(props) {
    // eslint-disable-next-line
    const [kakaoMap,setKakaoMap] = useState(null)
    // eslint-disable-next-line
    const [pospos,setPosPos] = useState('아무것도아니야')
    const [tes1,setTes1] = useState(burkerImgSave)
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
        // setPosPos(props.pos3.join(' '))
        
        // setPosPos(Object.assign({}, a))
        // console.log(typeof a);
        // console.log(pospos === a);
        
    })

    const getTeam = async () => {
        try {
            const res =await server.getTeam()
            const {data: {data}} =res;
            const on = data.filter(e => e.onAir ===true)
            intro = on
            burkerImgSave = [...on.map(e => e.leader.userDetail)]
            setTes1(burkerImgSave)
            console.log(tes1);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const container = document.getElementById('myMap');
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let pos = new kakao.maps.LatLng(lat,lon);
        
                // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
                //     imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
                //     imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
                //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                //     markerPosition = new kakao.maps.LatLng(t1,t2); // 마커가 표시될 위치입니다

                    let marker = new kakao.maps.Marker({  
                        position: pos
                    });
                    // let marker2 = new kakao.maps.Marker({
                    //     position: markerPosition,
                    //     image: markerImage
                    // })
                    map.setCenter(pos); //이동ß
                    marker.setMap(map) //마크찍기
                    
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

// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다, 위치 이미지, 인트로듀스를 받아오는 함수
function createMarker(position, image,infoData) {
    var marker = new kakao.maps.Marker({
        position: position,
        image: image,
        clickable: true,
    });
    kakao.maps.event.addListener(marker, 'click', function() {
        infoData.open(map,marker)
    });
    return marker;  
}   



//버스커들 위치,이미지,소개글을 저장하는 배열상자
let buskerDataBox = []

createBuskerData()
//버스커들 정보를 만들어서 각 함수(ex: 이미지,소개글 ...)에 전달해주는 함수
function createBuskerData() {
    let iwRemoveable = true; //x버튼
    
    for(let i=0; i <tes1.length; i++) {
        let imageSize = new kakao.maps.Size(22, 26),
            imageOptions = {   
                spriteOrigin: new kakao.maps.Point(10, 36),    
                spriteSize: new kakao.maps.Size(36, 98)  
            };       
    
        let infowindow = new kakao.maps.InfoWindow({
            content: tes1[i].introduce, // 인포윈도우에 표시할 내용
            removable : iwRemoveable,
        });
        let markerImage = createMarkerImage(tes1[i].profileImgURL, imageSize, imageOptions)    
        let data = createMarker(buskerPositions[i].latlng, markerImage,infowindow);
            buskerDataBox.push(data)
        }
}
//최종적으로 지도에 이미지를 뿌려줄때 buskerDataBox에 있는 아이들만 보여주기위한 함수
function setBuskerMarker(map) {
    for(let i=0; i<buskerDataBox.length; i++) {
        buskerDataBox[i].setMap(map)
    }   
}
//최종적으로 지도에 이미지를 뿌려줌
setBuskerMarker(map) 
    },[tes1])
    return (
        <div id="myMap" style={{
            width: '300px',
            height: '300px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            overflow: 'hidden',
    
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