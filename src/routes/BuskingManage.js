import React from "react";
import styled from "styled-components";
import { _userRoom } from "../service/room";
import { _musicServer } from "../service/music";
import Lyrics from "../Components/Lyrics";
import { Link } from "react-router-dom";

const Container = styled.div`
  color: white;
`;

//공연관리에서 필요한것들

//목표는 한페이지 모든 정보를 다 볼 수 있도록 만드는것이 목표

/*필요한 정보 => 
    신청곡[o]=> (누가 예약했는지 보이며) 예/ 아니요 버튼으로 선정 가능
    노래 정보[o]
    노래 가사[]
*/

const Btn = styled.button``;

class BuskingMange extends React.Component {
  state = {
    musics: [],
    musicsInfo: [],
    lyrics: false,
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
      this.setState({
        musics,
      });
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
        console.log(this.state.musicsInfo);
      } catch (error) {
        console.log(error);
      }
    }
  };

  turnOff = () => {
    console.log("응애");
  };

  render() {
    const { musicsInfo, musics } = this.state;
    console.log(musicsInfo);
    return (
      <Container>
        {musicsInfo.map((song, index) => (
          <div key={song.id}>
            <div>노래 신청자: {musics[index].userNickname}</div>
            <Lyrics
              lyrics={song.lyrics}
              singer={song.singer}
              img={song.profileImgURL}
              title={song.title}
            />
          </div>
        ))}
        <Btn onClick={this.turnOff}>방송끄기</Btn>
      </Container>
    );
  }
}

export default BuskingMange;
