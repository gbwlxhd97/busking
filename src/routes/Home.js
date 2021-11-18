






import React, { useState, useEffect } from "react";
import { Logout } from '../Components/TokenSave';
import ReMap from "../Components/ReMap";
import styled from "styled-components";
import { _teamServer } from "../service/team";
import { _userRoom } from "../service/room";
import { Link } from "react-router-dom";


let currentPos =[]; //props로 전달해줄 버스커의 현재위치값
let savePos = [] //해당위치를 계속 저장해주는 배열
let juen
let item =false;
let pos2 = []; //props로 전달해줄 버스커의 현재위치값

const Costainer = styled.div`
  margin: 40px 37px 0;
`;

const StartBtn = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Gowun+Batang&family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  color: #ffc314;
  border: none;
  background-color: #282828;
  padding: 0px;
  display: block;
  margin: auto;
`;

const Title1 = styled.h1`
  font-size: 35px;
  text-align: center;
  margin-top: 63.5px;
`;

const Span1 = styled.p`
  text-align: center;
  font-size: 15px;
  color: #e6e185;
`;

const MapText1 = styled.p`
  text-align: center;
  font-size: 13.5px;
  color: white;
  margin-top: 410px;
`;

const MapText2 = styled.p`
  text-align: center;
  font-size: 13.5px;
  color: white;
  margin-top: 387px;
`;

const MapText3 = styled.p`
  text-align: center;
  font-size: 13.5px;
  color: white;
  margin-top: 385px;
`;

const MapText4 = styled.p`
  text-align: center;
  font-size: 13.5px;
  color: white;
  margin-top: 432px;
`;

const Span3 = styled.p`
  text-align: center;
  margin: 0;
  font-size: 20px;
  color: #ffc314;
`;

const DivTitle = styled.div``;

const CraetRoom = styled(Link)`
  color: black;
  text-decoration-line: none;
`;

const BuskingMange = styled(Link)`
  color: white;
  text-decoration-line: none;
`;
const BuskingMange2 = styled(Link)`
  margin-left: 47px;
  color: white;
  text-decoration-line: none;
`;

const Btn = styled.button`
  display: block;
  margin: auto;
  padding: 7px;
  border: none;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  font-size: 18px;
  border-radius: 5px;
  background-color: #ffc314;
  &:active {
    background-color: gray;
  }
`;

const SendRoomName = styled.button`
  height: 24px;
  margin-left: 7px;
  border-style: none;
  border-radius: 6px;
  border-top: 1px solid black;
  background-color: #ffc314;
  &:active {
    background-color: gray;
    color: #ffc314;
  }
`;

const InputRoomName = styled.input`
  width: 160px;
  height: 23px;
  margin-top: 20px;
  margin-left: 7px;
  padding-left: 6px;
  border: 1px;
`;
///////////////////////////////////////////////////////////////////

//let pos2 =[]; //props로 전달해줄 버스커의 현재위치값
const startBusKing = "⎧버스킹 방송시작하기⎭";
const endBusKing = "⎧버스킹 방송종료⎭";
let teamBoolean = Boolean; // true 면 있는거 false면 없는거

function Home() {
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;      
    juen = `${lat},${lon}`;
    pos.push(
      {"pos": `${lat}/${lon}`,"teamName": localStorage.getItem('teamname')});
    currentPos = [...pos];
  })
  const [statePos,setPos] = useState([]) //홈에서 map 으로 pos정보를 주기위한 state 단 map에서는 props임
  useEffect(() => {
    console.log(statePos.map(item => item.pos).join(',').split(',').map(e => parseFloat(e)));
    let saveName = savePos.map(e => e.teamName)
    let pushName = statePos.map(e => e.teamName).join("")
    if(saveName.includes(pushName) === true) {
      savePos.splice(savePos.indexOf(pushName),1)
      console.log('중복');
    } else {
      savePos = [...savePos,...statePos]
      console.log('안중복');
    }
    console.log(savePos);
  },[statePos])

  

  const startRomm = async() => {
    try {
      const res = await _userRoom.creatRoom({
        roomName: "1번팀의 방",
        teamName: "1번팀",
        latIng: juen
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const removeRoom = async () => {
    try {
      const res = await _userRoom.deleteRoom({
        roomName: "1번팀의 방",
        teamName: "1번팀",
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // const startBusK = async() => {
  //   try {
  //     const res = await _teamServer.postOnAir({
  //       teamName: localStorage.getItem('teamname')
  //     })
  //     if(res.data.data === false) {
  //       alert('방송종료')
  //     }else {
  //       alert('방송시작!');
  //     }
  //     item = !item;
  //     console.log(res);
  //   let lon = position.coords.longitude;
  //   pos.push(`${lat},${lon}`);
  //   pos2 = [...pos];
  //   // console.log(pos2);
  // });
  const [pos20, setPos2] = useState([]);
  const [text, setText] = useState("");
  const [item, setitem] = useState(false);
  const [manage, setmanage] = useState(false);
  const [checkOn,setCheckOn] = useState()
  const [userName, setUserName] = useState("");
  const [onAirURL, setOnAirURL] = useState("");
  const [teamName, setTeamName] = useState("");

  const startBus = () => {
    setPos2(pos2);
    setmanage(!manage);
    console.log(pos20);
  };

  const startBusK = async () => {
    try {
      const res = await _teamServer.postOnAir({
        teamName: localStorage.getItem("teamname"),
      });
      if(res.data.data === false) {
        alert('방송종료')
        // window.location.reload()
        setCheckOn(false)
      }else {
        alert('방송시작!');
        // window.location.reload()
        setCheckOn(true)
      }
      setmanage(!manage);
    } catch (error) {
      console.log(error);
    }
  };

  const putRoomName = (e) => {
    setText(e.target.value);
  };

  const postRoomName = async () => {
    if (text.length === 0) {
      alert("제목을 기입해주세요");
    } else {
      try {
        const res = await _userRoom.creatRoom({
          roomName: text,
          teamName: localStorage.getItem("teamname"),
        });
      } catch (error) {
        console.log(error);
      }
      setitem(true);
    }
  };
  const getOnAirURL = async () => {
    try {
      const res = await _teamServer.searchTeam(
        localStorage.getItem("teamname")
      );
      const {
        data: {
          data: { onAirURL },
        },
      } = res;
      setOnAirURL(onAirURL);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setUserName(String(localStorage.getItem("username")));
    if (userName !== "null") {
      getOnAirURL();
    }
  }, []);
  

  return (
    <>
      <ReMap pos3={pos20}  />
      <Costainer>
        {userName != "null" && localStorage.getItem("teamname") == "null" && (
          <>
            <Span1>팀을 생성해야 버스킹을 시작할 수 있습니다.</Span1>
            <Btn>
              <CraetRoom to={`/creatteam/${localStorage.getItem("username")}`}>
                팀 생성하러 가기
              </CraetRoom>
            </Btn>
            <MapText1>[ 버스커들이 당신을 기다리는 장소 ]</MapText1>
            <Title1>BUSKiNG hELPER</Title1>
          </>
        )}

        {userName != "null" &&
          localStorage.getItem("teamname") !== "null" &&
          onAirURL == null && (
            <>
              <Span3>
                버스킹을 시작하려면<br></br>제목을 설정해야합니다!
              </Span3>
              <DivTitle>
                <InputRoomName
                  placeholder="버스킹 제목을 적어주세요"
                  onChange={putRoomName}
                  value={text}
                ></InputRoomName>
                <SendRoomName onClick={postRoomName}>
                  버스킹 제목 설정
                </SendRoomName>
              </DivTitle>
              <MapText2>[ 버스커들이 당신을 기다리는 장소 ]</MapText2>
              <Title1>BUSKiNG hELPER</Title1>
            </>
          )}

        {userName != "null" &&
          localStorage.getItem("teamname") !== "null" &&
          onAirURL != null && (
            <>
              
              <StartBtn onClick={(startBus, startBusK)}>
                {checkOn   && endBusKing}
                {!checkOn  && startBusKing}
              </StartBtn>
              {!checkOn && <Span1>버스킹을 시작하시려면 위를 눌러주세요.</Span1>}
              {checkOn && <Span1>버스킹을 종료하시려면 위를 눌러주세요.</Span1>}
              <BuskingMange2
                to={`/buskingmanage/${String(onAirURL.split("/")[4])}/${String(
                  localStorage.getItem("teamname")
                )}`}
              >
                ⎧BUSKiNG MANAGEMENT⎭
              </BuskingMange2>
              <MapText3>[ 버스커들이 당신을 기다리는 장소 ]</MapText3>
              <Title1>BUSKiNG hELPER</Title1>
            </>
          )}

        {userName == "null" && (
          <>
            <Span3>버스킹을 시작하려면 로그인을 해주세요!</Span3>
            <MapText4>[ 버스커들이 당신을 기다리는 장소 ]</MapText4>
            <Title1>BUSKiNG hELPER</Title1>
          </>
        )}

        <br />
        <br />
      </Costainer>
    </>
  );
}

export default Home;
