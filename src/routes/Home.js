import React, { useState, useEffect } from "react";
import ReMap from "../Components/ReMap";
import styled from "styled-components";
import { _teamServer } from "../service/team";
import { _userRoom } from "../service/room";
import { Link } from "react-router-dom";

let pos2 = []; //props로 전달해줄 버스커의 현재위치값

const Costainer = styled.div`
  margin-left: 37px;
  margin-top: 90px;
`;

const StartBtn = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Gowun+Batang&family=Nanum+Gothic&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  font-size: 20px;
  color: #ffc314;
  border: none;
  background-color: #282828;
  padding: 0px;
`;

const Span1 = styled.span`
  font-size: 13px;
  color: #8ae634;
`;

const Span2 = styled.span`
  font-size: 13px;
  color: white;
`;

const Span3 = styled.span`
  font-size: 20px;
  color: #ffc314;
`;

const CraetRoom = styled(Link)`
  color: white;
  text-decoration-line: none;
`;

const BuskingMange = styled(Link)`
  color: white;
  text-decoration-line: none;
`;

const Btn = styled.button`
  width: auto;
  height: auto;
  padding: 7px;
  margin-top: 5px;
  border: none;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  font-size: 20px;
  border-radius: 5px;
  background-color: white;
  color: #ffc314;
  background-color: #282828;
  &:active {
    background-color: gray;
  }
`;

const SendRoomName = styled.button`
  margin-left: 10px;
  border-style: none;
`;

const InputRoomName = styled.input`
  width: auto;
  height: 20px;
  margin-top: 10px;
`;

//let pos2 =[]; //props로 전달해줄 버스커의 현재위치값
const startBusKing = "⎧버스킹 방송시작하기 ⎭";
const endBusKing = "⎧버스킹 방송종료⎭";
let teamBoolean = Boolean; // true 면 있는거 false면 없는거

function Home() {
  navigator.geolocation.getCurrentPosition((position) => {
    let pos = [];
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    pos.push(`${lat},${lon}`);
    pos2 = [...pos];
    // console.log(pos2);
  });
  const [pos20, setPos2] = useState([]);
  const [text, setText] = useState("");
  const [item, setitem] = useState(false);
  const [manage, setmanage] = useState(false);
  const [teamName, setteamName] = useState("");

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
      alert("방송시작!");
      setmanage(!manage);
    } catch (error) {
      console.log(error);
    }
  };

  const haveTeam = () => {
    if (localStorage.getItem("teamname") === "null") {
      teamBoolean = false;
    } else {
      teamBoolean = true;
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
      setitem(!item);
    }
  };
  haveTeam();
  const useEffect = () => {
    setteamName(localStorage.getItem("teamname"));
  };
  return (
    <>
      <ReMap pos3={pos20} />
      <Costainer>
        {!teamBoolean && (
          <>
            <Span1>팀을 생성해야 버스킹을 시작할 수 있습니다.</Span1>
            <Btn>
              <CraetRoom to={`/creatteam/${localStorage.getItem("username")}`}>
                팀 생성하러 가기
              </CraetRoom>
            </Btn>
          </>
        )}
        <>
          {!item && teamBoolean && (
            <>
              <Span3>버스킹을 하시려면 제목을 설정후에 시작하셔야합니다!</Span3>
              <br />
              <InputRoomName
                placeholder="버스킹 제목을 적어주세요"
                onChange={putRoomName}
                value={text}
              ></InputRoomName>
              <SendRoomName onClick={postRoomName}>
                버스킹 제목 설정
              </SendRoomName>
            </>
          )}
          {item && (
            <>
              <StartBtn onClick={(startBus, startBusK)}>
                {startBusKing}
              </StartBtn>
              <br />
              <Span1>버스킹을 시작하시려면 위를 눌러주세요.</Span1>
              {!manage && (
                <BuskingMange
                  to={`/buskingmanage/${text}/${localStorage.getItem(
                    "teamname"
                  )}`}
                >
                  asdfasdf
                </BuskingMange>
              )}
            </>
          )}
          <br />
          <br />
          <Span2>버스커들이 당신을 기다리는 장소</Span2>
        </>
      </Costainer>
      <div>
        <ReMap pos3={pos20} />
      </div>
    </>
  );
}

export default Home;