import React from "react";
import styled from "styled-components";
import { _userRoom } from "../service/room";
import { _musicServer } from "../service/music";
import Lyrics from "../Components/Lyrics";
import { Link } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  height: 748px;
  overflow: auto;
  color: white;
`;

const Top = styled.div `
  display: flex;
  justify-content: space-between;
`

const Reservation = styled.div`
  margin: 10px;
`

const Request = styled.div`
  font-size: 18px;
  margin-left: 5px;
`

const Off = styled(Link)`
  text-decoration: none;
`

const Btn = styled.button`
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #ffc314;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DeleteBtn = styled.button`
  font-size: 16px;
  padding: 2px 7px;
  border-radius: 10px;
`


//공연관리에서 필요한것들

//목표는 한페이지 모든 정보를 다 볼 수 있도록 만드는것이 목표

/*필요한 정보 => 
    신청곡[o]=> (누가 예약했는지 보이며) 예/ 아니요 버튼으로 선정 가능
    노래 정보[o]
    노래 가사[]
*/



class BuskingMange extends React.Component {
  state = {
    musics: [],
    musicsInfo: [],
    lyrics: false,
    data: {}
  };

  setMusics = async () => {
    const {
      match: {
        params: { roomName, teamName },
      },
    } = this.props;

    try {
      const res = await _userRoom.getRoomInfo({
        roomName: roomName,
        teamName: teamName,
      });
      const {
        data: {
          data: { musics },
        },
      } = res;
      const {
        data: { data },
      } = res;

      this.setState({
        musics,
        data,
      });
      console.log(this.state.data);
    } catch (error) {
      console.log(error);
    }
    this.getMusic();
  };

  componentDidMount() {
    this.setMusics();
  }

  getMusic = async () => {
    const { musics } = this.state;
    for (let i = 0; i < musics.length; i++) {
      try {
        const res = await _musicServer.getSong(musics[i].title);
        const {
          data: { data },
        } = res;
        this.setState({
          musicsInfo: this.state.musicsInfo.concat(data),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  turnOff = async () => {
    const {
      match: {
        params: { roomName, teamName },
      },
    } = this.props;
    console.log(roomName, teamName);
    try {
      await _userRoom.deleteRoom({
        roomName: roomName,
        teamName: teamName,
      });
    } catch (error) {
      console.log(error);
      console.log("어디서 캐치 되나");
    }
  };

  render() {
    const { musicsInfo, musics ,deleteReservation} = this.state;
    // console.log(this.props)
    return (
      <Container>
        {musicsInfo.map((song, index) => (
          <Reservation key={song.id}>
            <Top>

              <Request>노래 신청자: {musics[index].userNickname}</Request>
              
              <DeleteBtn
                onClick={async () => {
                  const {
                    match: {
                      params: { roomName, teamName },
                    },
                  } = this.props;
                  try {
                    const res = await _userRoom.deleteMusic({
                      roomName: roomName,
                      teamName: teamName,
                      userNickname: musics[index].userNickname,
                      title: song.title,
                      singer: song.singer,
                    });

                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                예약곡 삭제
              </DeleteBtn>

            </Top>
            
            <Lyrics
              lyrics={song.lyrics}
              singer={song.singer}
              img={song.profileImgURL}
              title={song.title}
            />
            <hr></hr>
          </Reservation>
        ))}
        <Btn onClick={this.turnOff}>
          <Off to="/">방송끄기</Off>
        </Btn>
      </Container>
    );
  }
}

export default BuskingMange;
