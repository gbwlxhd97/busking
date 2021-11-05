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

class UserRoom extends React.Component {
  state = {
    teamInfo: {},
    lyrics: "",
    singer: "",
    img: "",
    title: "",
    teamName: "",
    roomName: "",
    click: false,
    loading: false,
    error: null,
  };

  getSong = async () => {
    try {
      const res = await _musicServer.getSong("이로하");
      let {
        data: { data },
      } = res;
      this.setState({
        lyrics: data.lyrics,
        singer: data.singer,
        img: data.profileImgURL,
        title: data.title,
      });
    } catch (error) {
      this.setState({ error: "응애" });
    } finally {
      this.setState({
        loading: false,
      });
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
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getTeamInfo();
    this.getSong();
  }

  openTable = () => {
    this.setState({
      click: !this.state.click,
    });
  };

  render() {
    const { lyrics, singer, img, title, teamInfo, click } = this.state;
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
            <Btn onClick={this.openTable}>⎧예약 노래 보기 ᐳ</Btn>
            {click ? (
              <Table>
                <thead>
                  <tr>
                    <Th>No.</Th>
                    <Th>Singer</Th>
                    <Th>Music</Th>
                  </tr>
                </thead>
                <Tbody>
                  <tr>
                    <Td>1</Td>
                    <Td>이무진</Td>
                    <Td>신호등</Td>
                  </tr>

                  <tr>
                    <Td>2</Td>
                    <Td>이무진</Td>
                    <Td>신호등</Td>
                  </tr>

                  <tr>
                    <Td>3</Td>
                    <Td>이무진</Td>
                    <Td>신호등</Td>
                  </tr>
                </Tbody>
              </Table>
            ) : (
              <div></div>
            )}
            <Btn>
              <RLink to={`/reservation/${teamInfo.teamName}`}>
                ⎧노래 예약하러가기 ᐳ
              </RLink>
            </Btn>
          </Reservation>
        </Section>

        <Section>
          <Lyrics lyrics={lyrics} singer={singer} img={img} title={title} />
        </Section>

        <Section>
          <Chat>채팅</Chat>
        </Section>
      </Container>
    );
  }
}

export default UserRoom;
