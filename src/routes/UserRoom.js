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

const Reservation = styled.div``;

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

const Section = styled.div``;

const MusicList = styled.div`
  max-width: 1200px;
  max-height: 0px;
  margin: 0 auto;
  overflow: hidden;
`;

const Ul = styled.ul`
  white-space: nowrap;
`;

const Li = styled.li`
  margin-left: 20px;
  list-style: none;
  float: left;
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
      console.log(this.state.musicArr);
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

  render() {
    const { musicsInfo, teamInfo, click, musicArr } = this.state;

    return (
      <Container>
        <Section>
          <Title>
            <UserImg src={teamInfo.teamProfileImg} />
            🎵 {teamInfo.teamName} 방
          </Title>
        </Section>

        <Section>
          <Reservation>
            <Btn onClick={this.openTable}>⎧예약된 노래</Btn>
            <MusicList>
              <Ul>
                {musicsInfo.map((e, index) => (
                  <Li key={index}>
                    <Lyrics
                      lyrics={e.lyrics}
                      singer={e.singer}
                      img={e.profileImgURL}
                      title={e.title}
                    />
                  </Li>
                ))}
              </Ul>
            </MusicList>
            <Btn>
              <RLink to={`/reservation/${teamInfo.teamName}`}>
                ⎧노래 예약하러가기 ᐳ
              </RLink>
            </Btn>
          </Reservation>
        </Section>

        <Section></Section>
      </Container>
    );
  }
}

export default UserRoom;
