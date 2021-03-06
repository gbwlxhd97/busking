import React from "react";
import styled from "styled-components";
import { _userRoom } from "../service/room";
import { _musicServer } from "../service/music";
import Lyrics from "../Components/Lyrics";
import { Link } from "react-router-dom";
import axios from "axios";
const Container = styled.div`
  height: 748px;
  color: white;
  height: 500px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Reservation = styled.div`
  margin: 10px;
`;

const Request = styled.div`
  font-size: 18px;
  margin-left: 5px;
`;

const Off = styled(Link)`
  text-decoration: none;
`;

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
  margin-left: 10px;
  font-size: 16px;
  padding: 2px 7px;
  border-radius: 10px;
`;

const RadioBox = styled.input`
  margin-left: 10px;
`;

const Span1 = styled.span`
  margin-left: 10px;
`;

class BuskingMange extends React.Component {
  state = {
    musics: [],
    musicsInfo: [],
    lyrics: false,
    data: {},
    radioBtn: false,
    radioInfo: {},
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
      console.log("????????? ?????? ??????");
    }
  };

  check = async (e) => {
    try {
      const res = await _musicServer.getSong(e.target.value);
      const {
        data: { data },
      } = res;
      this.setState({
        radioBtn: true,
        radioInfo: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { musicsInfo, musics, radioBtn, radioInfo } = this.state;

    return (
      <Container>
        {!radioBtn &&
          musicsInfo.map((song, index) => (
            <div key={song.id}>
              {index === 0 && (
                <>
                  <Lyrics
                    lyrics={musicsInfo[0].lyrics}
                    singer={musicsInfo[0].singer}
                    img={musicsInfo[0].profileImgURL}
                    title={musicsInfo[0].title}
                  />
                </>
              )}
            </div>
          ))}

        {radioBtn && (
          <>
            <Lyrics
              lyrics={radioInfo.lyrics}
              singer={radioInfo.singer}
              img={radioInfo.profileImgURL}
              title={radioInfo.title}
            />
          </>
        )}

        {musicsInfo.map((song, index) => (
          <div key={index}>
            <RadioBox
              type="radio"
              name="platform"
              value={song.title}
              onChange={this.check}
            />
            <Span1>?????? ?????????: {musics[index].userNickname}</Span1>
            <br />
            <Span1>{song.title}</Span1>
            <Span1>{song.singer}</Span1>
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
              ????????? ??????
            </DeleteBtn>
            <br />
          </div>
        ))}
        <Btn onClick={this.turnOff}>
          <Link to="/">????????????</Link>
        </Btn>
      </Container>
    );
  }
}

export default BuskingMange;