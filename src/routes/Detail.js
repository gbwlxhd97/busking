import React from "react";
import styled from "styled-components";
import { _userServer } from "../service/user";
import { Link } from "react-router-dom";
import { _teamServer } from "../service/team";
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
  };
  onClick = () => {
    this.setState({
      btnClick: !this.state.btnClick,
    });
  };

  offClick = () => {
    if (this.state.duplicateCheck === false) {
      alert("중복 체크를 해주세요");
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
        //닉변 했으면 db에 같은 닉 있는지 판단하는 조건문 자리
        this.setState({
          duplicateCheck: true,
          change: true,
        });
      }
    } else {
      alert("칸이 비어있습니다.");
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
          profileImgURL:
            "https://blog.kakaocdn.net/dn/bke9cp/btq6zCmm4gR/BvSVvMAoZfGBA8ykfXw4gk/img.jpg",
          introduce: this.state.introduce,
        });
        alert("정보 수정 완료");
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
      alert("닉네임 중복체크 해주세요");
    }
  };

  sendFix = () => {
    const { duplicateCheck, change } = this.state;

    if (change === true) {
      // 닉변 함
      console.log("send data to db1");
      this.setState({
        value: "",
      });
    } else if (change === false) {
      // 닉변 안함
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
      this.setState({ error: "응애" });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const now = new Date(); // 현재 날짜 및 시간
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
          <UserImg src={userImgUrl} />
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
              <form>
                nickname:
                <br />
                <Input
                  type="text"
                  name="name"
                  onChange={this.valueChange}
                  placeholder={userNickname}
                />
                <Btn onClick={this.dupleicateClick}>중복 체크</Btn>
              </form>
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
              <form>
                introduce:
                <br />
                <Input
                  type="text"
                  name="name"
                  onChange={this.introChange}
                  placeholder={introduce}
                />
              </form>
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
              <Btn onClick={this.onClick}>정보 수정</Btn>
              {teamBoolean && (
                <Btn>
                  <SLink to={`/buskingmanage/${roomName}/${teamName}`}>
                    공연 관리
                  </SLink>
                </Btn>
              )}
            </>
          ) : (
            <Btn onClick={this.offClick} onClick={this.handleFix}>
              수정 완료
            </Btn>
          )}
          {localStorage.getItem("teamname") !== "null" && (
          <ResetBtn>
            <Reset to={`/creatteam/${localStorage.getItem("username")}`}>
              팀이름변경
            </Reset>
          </ResetBtn>
        )}
        </Buttons>
        
      </Container>
    );
  }
}
