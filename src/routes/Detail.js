import React from "react";
import styled from "styled-components";
import { _userServer } from "../service/user";
import { Link } from "react-router-dom";
import { _teamServer } from "../service/team";
var QRCode = require('qrcode.react');
const Container = styled.div`
  margin-left: 15%;
  background-color: white;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: #282828;
`;

const ImgSection = styled.div`
  margin-top: 10px;
  margin-left: 8px;
`;

const Input = styled.input`
  background-color: #282828;
  border: none;
  border-bottom: 1px solid #adadad;
  &::-webkit-input-placeholder {
    color: #d2d2d2;
  }
`;

const DetailSectionList = styled.ul``;

const Details = styled.li`
  list-style: none;
  margin-bottom: 7px;
`;

const Span = styled.span`
  display: inline-block;
  overflow: auto;
  height: 50px;
  width: 200px;
`;

const UserImg = styled.img`
  width: 130px;
  height: 130px;
  padding: 40px;
  border-bottom: 1px solid #adadad;
  border-right: 1px solid #adadad;
  border-radius: 50%;
`;

const Buttons = styled.div`
  margin-right: 56.250px;
  display: flex;
  justify-content: space-between;
`


const Btn = styled.button`
  font-size: 14px;
  padding: 6px 7px;
  border-radius: 8px;
  background-color: #ffc314;
  &:active {
    background-color: gray;
  }
`;

const QRBtn = styled.span`
  display: inline-block;
  width: 80px;
  left: 265px;
  top: 730px;
  position: absolute;
  transform: translate(-50%,0);
  font-size: 14px;
  padding: 6px 7px;
  border-radius: 8px;
  background-color: #ffc314;
  &:active {
    background-color: gray;
  }
`;

const ResetBtn = styled.button`
font-size: 14px;
  padding: 6px 7px;
  border-radius: 8px;
  background-color: #ffc314;
  &:active {
    background-color: gray;
  }
`;

const Reset = styled(Link)`
  text-decoration: none;
  color: black;
`

const SLink = styled(Link)`
  color: black;
  text-decoration-line: none;
`;

const QrContainer = styled.div`
  margin-left: 20px;
`;

export default class extends React.Component {
  state = {
    userNickname: "",
    birthday: "",
    gender: "",
    userImgUrl: "",
    introduce: "",
    loading: false,
    error: null,
    btnClick: true,
    value: "",
    duplicateCheck: false,
    change: false,
    teamName: "",
    roomName: "",
    teamBoolean: false,
    QRBoolean:false
  };
  onClick = () => {
    this.setState({
      btnClick: !this.state.btnClick,
    });
  };
  QRView =()=>{
    this.setState({
      QRBoolean:!this.state.QRBoolean
    })
  }
  offClick = () => {
    if (this.state.duplicateCheck === false) {
      alert("?????? ????????? ????????????");
    } else {
      this.setState({
        btnClick: !this.state.btnClick,
        duplicateCheck: false,
      });
      this.sendFix();
    }
  };

  valueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  introChange = (event) => {
    this.setState({
      introduce: event.target.value,
    });
  };

  dupleicateClick = (event) => {
    event.preventDefault();
    const { userNickname, value } = this.state;

    if (value !== "") {
      if (userNickname === value) {
        this.setState({
          duplicateCheck: true,
          change: false,
        });
      } else {
        //?????? ????????? db??? ?????? ??? ????????? ???????????? ????????? ??????
        this.setState({
          duplicateCheck: true,
          change: true,
        });
      }
    } else {
      alert("?????? ??????????????????.");
    }
  };

  handleFix = async () => {
    const {
      match: {
        params: { nickName },
      },
    } = this.props;
    if (this.state.duplicateCheck === true) {
      try {
        const fixData = await _userServer.putUserDetail({
          oldNickname: nickName,
          nickname: this.state.userNickname,
          profileImgURL: this.state.userImgUrl,
          introduce: this.state.introduce,
        });
        alert("?????? ?????? ??????");
        window.location.href = "/";
        localStorage.setItem("username", this.state.userNickname);
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({
          loading: false,
        });
      }
    } else {
      alert("????????? ???????????? ????????????");
    }
  };

  sendFix = () => {
    const { duplicateCheck, change } = this.state;

    if (change === true) {
      // ?????? ???
      console.log("send data to db1");
      this.setState({
        value: "",
      });
    } else if (change === false) {
      // ?????? ??????
      console.log("send data to db2");
      this.setState({
        value: "",
      });
    }
  };

  async componentDidMount() {
    const {
      match: {
        params: { nickName },
      },
    } = this.props;

    try {
      const info = await _userServer.getUserDetail(nickName);
      let {
        data: { data },
      } = info;

      this.setState({
        userNickname: data.nickname,
        birthday: data.birthday,
        gender: data.gender,
        userImgUrl: data.userDetail.profileImgURL,
        introduce: data.userDetail.introduce,
      });
    } catch (error) {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }

    if (localStorage.getItem("teamname") !== "null") {
      this.getRoomInfo();
      this.setState({
        teamBoolean: !this.state.teamBoolean,
      });
    }
  }

  getRoomInfo = async () => {
    try {
      const res = await _teamServer.searchTeam(
        localStorage.getItem("teamname")
      );
      let {
        data: { data },
      } = res;
      this.setState({
        teamName: data.onAirURL.split("/")[5],
        roomName: data.onAirURL.split("/")[4],
      });
    } catch (error) {
      this.setState({ error: "??????" });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  imgSelete = (e) => {
    console.log(e)
/*     this.setState = ({
      userImgUrl: e.target.value,
    }); */
  };
  render() {
    const now = new Date(); // ?????? ?????? ??? ??????
    var year = now.getFullYear();
    const {
      btnClick,
      userNickname,
      birthday,
      gender,
      userImgUrl,
      introduce,
      teamName,
      roomName,
      teamBoolean,
    } = this.state;
    return (
      <Container>
        <ImgSection>
          {btnClick === true ? (
            <UserImg src={userImgUrl} />
          ) : (
            <>
              <UserImg src={userImgUrl} />
              <input type="file" onChange={this.imgSelete} />
            </>
          )}
        </ImgSection>
            
        <DetailSectionList>
          {btnClick === true ? (
            <Details>
              <span>
                nickname:
                <br />
              </span>
              <Span>{userNickname}</Span>
            </Details>
          ) : (
            <Details>
              <div>
                nickname:
                <br />
                <Input
                  type="text"
                  name="name"
                  onChange={this.valueChange}
                  placeholder={userNickname}
                />
                <Btn onClick={this.dupleicateClick}>?????? ??????</Btn>
              </div>
            </Details>
          )}

          {btnClick === true ? (
            <Details>
              <span>
                introduce:
                <br />
              </span>
              <Span>{introduce}</Span>
            </Details>
          ) : (
            <Details>
              <div>
                introduce:
                <br />
                <Input
                  type="text"
                  name="name"
                  onChange={this.introChange}
                  placeholder={introduce}
                />
              </div>
            </Details>
          )}

          <Details>
            <span>
              Age:
              <br />
            </span>
            <Span>{year - birthday}</Span>
          </Details>

          <Details>
            <span>
              gender:
              <br />
            </span>
            <Span>{gender}</Span>
          </Details>

          
        </DetailSectionList>

        <Buttons>
        {btnClick === true ? (
            <>
              <Btn onClick={this.onClick}>?????? ??????</Btn>
              {teamBoolean && (
                <Btn>
                  <SLink to={`/buskingmanage/${roomName}/${teamName}`}>
                    ?????? ??????
                  </SLink>
                </Btn>
              )}
            </>
          ) : (
            <Btn onClick={this.offClick} onClick={this.handleFix}>
              ?????? ??????
            </Btn>
          )}
          {localStorage.getItem("teamname") !== "null" && (
          <ResetBtn>
            <Reset to={`/creatteam/${localStorage.getItem("username")}`}>
              ???????????????
            </Reset>
          </ResetBtn>
        )}
        </Buttons>
            <QRBtn onClick={this.QRView}>
            {this.state.QRBoolean ? "QR????????????" : "QR????????????"}
            </QRBtn>
            {this.state.QRBoolean && 
            <QRCode value="https://focused-ride-b1185f.netlify.app/userroom/1??????" />
            }
        
      </Container>
    );
  }
}
