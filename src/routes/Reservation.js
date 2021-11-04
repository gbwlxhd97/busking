import React from "react";
import { _musicServer } from "../service/music";
import { _teamServer } from "../service/team";
import { _userRoom } from "../service/room";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import styled from "styled-components";

const Container = styled.div`
  color: white;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  width: 100%;
`;
const Input = styled.input`
  padding: 0 5px;
  border-radius: 7px;
  width: 60%;
`;
const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Div = styled.div`
  margin: 0 5px;
`;
const ReserveBtn = styled.button`
  float: right;
  margin-top: 12px;
  padding: 3px 5px;
  border-radius: 10px;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Img = styled.img`
  vertical-align: middle;
  width: 100px;
  height: 100px;
`;

class Reservation extends React.Component {
  state = {
    searchTerm: "",
    roomName: "",
    teamName: "",
    musicArray: [],
    loading: false,
    songList: [],
    error: null,
  };

  componentDidMount() {
    this.getUserRoom();
  }

  getUserRoom = async () => {
    const {
      match: {
        params: { teamName },
      },
    } = this.props;
    try {
      var res = await _teamServer.searchTeam(teamName);
      const {
        data: { data },
      } = res;
      var URL = data.onAirURL.split("/");
      this.setState({
        roomName: URL[4],
        teamName: URL[5],
      });
    } catch (error) {
      console.log(error);
    }
  };

  postReservateMusic = async () => {
    const { roomName, teamName } = this.state;
    try {
      var res = await _userRoom.postMusic({
        roomName: roomName,
        teamName: teamName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({
      loading: true,
    });
    try {
      const res = await _musicServer.searchSong(searchTerm);
      let {
        data: { data },
      } = res;
      this.setState({
        songList: data,
      });
      if (res.data.status === 204) {
        throw new Error("catch");
      }
    } catch (error) {
      this.setState({
        error:
          "검색 결과가 없습니다.\n 검색어의 철자와 띄어쓰기가 정확한지 확인해 주세요.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  MusicList = (musicInfo) => {
    console.log(musicInfo[0], musicInfo[1]);
    return (
      <div>
        {musicInfo[0]}-{musicInfo[1]}
      </div>
    );
  };

  reservationBtn = () => {
    localStorage.getItem("username")
      ? console.log("예약 성공")
      : alert("이용할 수 없는 사용자입니다.");
  };

  musicArray = [];

  render() {
    let { songList, loading, error } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSearch}>
          <Input
            placeholder="검색할 음악제목"
            onChange={this.updateTerm}
            value={this.state.searchTerm}
          />
          <Button onChange={this.updateTerm}>검색</Button>
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {songList.length > 0 && songList && (
              <>
                <Div>
                  <Section title="음악리스트">
                    {songList.map((song) => (
                      <div className="musicList" key={song.id}>
                        <Img src={song.profileImgURL} alt="profile"></Img>
                        <span id="title">{song.title}</span>-
                        <span id="singer">{song.singer}</span>
                        <ReserveBtn
                          onClick={
                            (this.reservationBtn,
                            () => {
                              if(this.musicArray.length==0){
                                this.musicArray.push({"title":song.title,"singer":song.singer});
                                console.log(this.musicArray)
                              }else{
                                this.musicArray.map(ele=>{
                                  if(Object.values(ele)[0]===song.title){

                                  }else if(Object.values(ele)[0]!==song.title){

                                  }
                                })
                              }
                                
                            })
                          }
                        >
                          예약하기
                        </ReserveBtn>
                      </div>
                    ))}
                  </Section>
                </Div>
              </>
            )}
            {songList.length === 0 && <Message text={error} />}
          </>
        )}
      </Container>
    );
  }
}

export default Reservation;
