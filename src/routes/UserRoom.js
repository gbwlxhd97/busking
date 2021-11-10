import React from "react";
import styled from "styled-components";
import Lyrics from "../Components/Lyrics";
import { _musicServer } from "../service/music";
import { _teamServer } from "../service/team";
import { _userRoom } from "../service/room";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Container = styled.div`
  color: white;
`;
const UserImg = styled.img`
  vertical-align: middle;
  width: 70px;
  height: 70px;
  margin-right: 5px;
  border-radius: 25%;
  border: 1.5px solid #ffc314;
`;

const Title = styled.div`
  display: inline-block;
  margin: 20px;
  padding-right: 10px;
`;

const Reservation = styled.div`
  overflow: auto;

  margin-left: 10px;
`;

const RLink = styled(Link)`
  color: white;
  text-decoration-line: none;
  font-size: 16px;
`;

const Btn = styled.button`
  margin-left: 30px;
  background-color: #282828;
  border: none;
  color: white;
  font-size: 16px;
`;

const Chat = styled.div``;

const Section = styled.div``;

const Th = styled.th`
  border-bottom: 1px solid grey;
  background-color: #828282;
`;
const Tbody = styled.tbody`
  border-bottom: 1px solid grey;
  font-size: 14px;
  color: #ffc314;
  & tr:nth-child(2n) {
    background-color: #c8c8c840;
  }
  & tr:nth-child(2n + 1) {
    background-color: #64646440;
  }
`;

const Td = styled.td`
  padding: 20px;
  width: max-content;
`;

const Table = styled.table`
  border: 1px solid #444444;
  border-collapse: collapse;
`;

const P = styled.p`
  margin-left: 30px;
  background-color: #282828;
  border: none;
  color: white;
  font-size: 16px;
`;

const DeleteBtn = styled.button`
  margin-top: 10px;
  margin-left: 10px;
`;

const RadioBox = styled.input`
  margin-left: 10px;
`;
class UserRoom extends React.Component {
  state = {
    teamInfo: {},
    musicsInfo: [],
    teamName: "",
    roomName: "",
    click: false,
    loading: false,
    error: null,
    roomName: "",
    teamName: "",
    musicArr: null,
    radioBtn: false,
    radioInfo: {},
  };

  getSong = async () => {
    const { musicArr } = this.state;
    for (let i = 0; i < musicArr.length; i++) {
      try {
        const res = await _musicServer.getSong(musicArr[i].title);
        let {
          data: { data },
        } = res;
        this.setState({
          musicsInfo: this.state.musicsInfo.concat(data),
        });
      } catch (error) {
        this.setState({ error: "응애" });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  };

  getTeamInfo = async () => {
    const {
      match: {
        params: { teamName },
      },
    } = this.props;
    try {
      const res = await _teamServer.searchTeam(teamName);
      let {
        data: { data },
      } = res;
      this.setState({
        teamInfo: data,
        teamName: data.onAirURL.split("/")[5],
        roomName: data.onAirURL.split("/")[4],
      });
      console.log(this.state.teamName, this.state.roomName);
    } catch (error) {
      this.setState({ error: "응애" });
    } finally {
      this.setState({
        loading: false,
      });
    }
    this.getTeam();
  };

  getTeam = async () => {
    try {
      const res = await _userRoom.getRoomInfo({
        roomName: this.state.roomName,
        teamName: this.state.teamName,
      });
      let {
        data: { data },
      } = res;
      this.setState({
        musicArr: data.musics,
      });
    } catch (error) {
      console.log(error);
    }
    this.getSong();
  };

  componentDidMount() {
    this.getTeamInfo();
  }

  openTable = () => {
    this.setState({
      click: !this.state.click,
    });
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
    const { radioBtn, radioInfo, musicsInfo, teamInfo, click, musicArr } =
      this.state;

    return (
      <Container>
        <Section>
          <Title>
            <UserImg src={teamInfo.teamProfileImg} />
            🎵 {teamInfo.teamName} 방
          </Title>
        </Section>
        <Btn>
          <RLink to={`/reservation/${teamInfo.teamName}`}>
            ⎧노래 예약하러가기 ᐳ
          </RLink>
        </Btn>
        <Section>
          <Reservation>
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
              <Lyrics
                lyrics={radioInfo.lyrics}
                singer={radioInfo.singer}
                img={radioInfo.profileImgURL}
                title={radioInfo.title}
              />
            )}
          </Reservation>
          <P>⎧예약 노래된 노래</P>
          {musicsInfo.map((song, index) => (
            <div key={index}>
              <RadioBox
                type="radio"
                name="platform"
                value={song.title}
                onChange={this.check}
              />
              <span>{song.title}</span>
              <span>{song.singer}</span>
            </div>
          ))}
        </Section>
      </Container>
    );
  }
}

export default UserRoom;
