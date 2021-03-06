import React from "react";
import { _musicServer } from "../service/music";
import { _teamServer } from "../service/team";
import { _userRoom } from "../service/room";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import styled from "styled-components";


const Container = styled.div`
  margin: 8px;
  font-size: 17px;
  color: white;
`;

const Musics = styled.div`
  margin-top: 15px;
`

const Music = styled.div`
  margin: 10px 0;
`

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  width: 100%;
`;
const Input = styled.input`
  padding: 0 6px;
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
  margin-top: 30px;
  padding: 3px 5px;
  border-radius: 10px;
  background-color: white;
  background-color: #ffc314;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Img = styled.img`
  vertical-align: middle;
  width: 90px;
  height: 90px;
  margin-right: 10px;
`;

const PostBtn = styled.button`
  margin-top: 12px;
  padding: 3px 5px;
  border-radius: 10px;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
  }
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

    title: "",
    singer: "",
    profileImgURL: "",
    lyrics: "",
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
      console.log(URL);
      this.setState({
        roomName: URL[4],
        teamName: URL[5],
      });
      console.log(this.state);
      console.log(URL);
    } catch (error) {
      console.log(error);
    }
  };

  postReservateMusic = async () => {
    const { roomName, teamName } = this.state;
    console.log(this.postArray);
    try {
      const res = await _userRoom.postMusic({
        roomName: roomName,
        teamName: teamName,
        userNickname: localStorage.getItem("username"),
        title: this.postArray[0],
        singer: this.postArray[1],
      });
    } catch (error) {
      console.log(error);
    }
    this.postArray = [];
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
    }
  };

  saveMusicData = [];
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
      // console.log(data);
      this.setState({
        songList: data,
      });
      if (res.data.status === 204) {
        throw new Error("catch");
      }
      console.log(this.state.songList);
    } catch (error) {
      this.setState({
        error:
          "?????? ????????? ????????????.\n ???????????? ????????? ??????????????? ???????????? ????????? ?????????.",
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
  
  musicArray = [];
  postArray = [];
  render() {
    {
      console.log(localStorage.getItem("teamname"));
    }
    let { songList, loading, error } = this.state;
    console.log(localStorage.getItem("teamname"));
    return (
      <Container>
        <Form onSubmit={this.handleSearch}>
          <Input
            placeholder="????????? ????????????"
            onChange={this.updateTerm}
            value={this.state.searchTerm}
          />
          <Button onChange={this.updateTerm}>??????</Button>
        </Form>
        {loading ? (
          <Loader />
        ) : (
          <>
            {songList.length > 0 && songList && (
              <>
                <Div>
                  <Section title="???????????????">
                    <Musics>
                    {songList.map((song) => (
                      <Music className="musicList" key={song.id}>
                        <Img src={song.profileImgURL} alt="profile"></Img>
                        <span id="title">{song.title}</span> - <span id="singer">{song.singer}</span>
                        <ReserveBtn
                          onClick={
                            (this.reservationBtn,
                            () => {
                              if (localStorage.getItem("username") == null) {
                                alert("????????? ??? ?????????????????????")
                              } else {
                              if (this.musicArray.length === 0) {
                                this.musicArray.push(song.title, song.singer);
                                this.postArray.push(song.title, song.singer);
                                this.postReservateMusic();
                              } else {
                                if (this.musicArray.length === 4) {
                                  alert("?????? 2????????? ????????? ???????????????.");
                                } else {
                                  if (
                                    this.musicArray.includes(song.title) ===
                                    true
                                  ) {
                                    alert("?????? ????????? ?????? ?????????.");
                                  } else {
                                    this.musicArray.push(
                                      song.title,
                                      song.singer
                                    );
                                    this.postArray.push(
                                      song.title,
                                      song.singer
                                    );
                                    this.postReservateMusic();
                                  }
                                }
                              }}
                            })
                          //,() => {alert('????????????');window.location.href= `/userdetail/${localStorage.getItem("username")}`}
                        }
                        >
                          ????????????
                        </ReserveBtn>
                      </Music>
                    ))}
                    </Musics>
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
