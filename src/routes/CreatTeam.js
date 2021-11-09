import React from "react";
import styled from "styled-components";
import { _userServer } from "../service/user";
import Message from "../Components/Message";
import { _teamServer } from "../service/team";
import { Link } from "react-router-dom";

const TeamInput = styled.input`
  width: auto;
  height: 20px;
  margin-top: 50px;
  margin-left: 100px;
`;

const MemberInput = styled.input`
  width: auto;
  height: 20px;
  margin-top: 50px;
  margin-left: 100px;
`;
const Container = styled.div`
  color: white;
`;

const RadioBox = styled.input`
  margin-left: 90px;
  margin-top: 20px;
`;

const SendBtn = styled.button`
  margin-left: 100px;
  margin-top: 20px;
`;

const GoToHome = styled(Link)`
  margin-left: 100px;
  margin-top: 20px;
  text-decoration: none;
  color: white;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const Span = styled.span``;
export default class extends React.Component {
  state = {
    teamName: "",
    member: "",
    memberInfo: {},
    basicResult: "Solo",
    radioArray: ["Solo", "Team"],
    error: "",
    search: false,
    complete: false,
    loading: false,
    noResult: false,
  };

  check = (e) => {
    this.setState({
      basicResult: e.target.value.trim(),
    });
  };

  searchTerm = (e) => {
    this.setState({
      member: e.target.value.trim(),
    });
  };

  teamName = (e) => {
    this.setState({
      teamName: e.target.value.trim(),
    });
  };

  postInfo = async () => {
    const { teamName, basicResult } = this.state;
    if (teamName.length === 0) {
      alert("팀 이름을 작성해주세요.");
    } else {
      if (localStorage.getItem("teamname") === "null") {
        if (basicResult === "Team" && basicResult.length !== 0) {
          try {
            console.log("Team");
            const res = await _teamServer.postTeam({
              teamName: teamName,
              leaderName: localStorage.getItem("username"),
              userList: this.memberArray,
            });
            this.setState({
              complete: true,
            });
            localStorage.setItem("teamname", teamName);
          } catch (error) {
            console.log(error);
          }
        } else if (basicResult === "Solo") {
          console.log("solo");
          try {
            const res = await _teamServer.postTeam({
              teamName: teamName,
              leaderName: localStorage.getItem("username"),
            });
            this.setState({
              complete: true,
            });
            localStorage.setItem("teamname", teamName);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        try {
          console.log("put");
          const res = await _teamServer.putTeam({
            oldTeamName: localStorage.getItem("teamname"),
            teamName: teamName,
            leaderName: localStorage.getItem("username"),
          });
          this.setState({
            complete: true,
          });
          localStorage.setItem("teamname", teamName);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  memberArray = [];
  searchResult = async () => {
    const { member } = this.state;

    try {
      const res = await _userServer.searchUser(member);
      const {
        data: { data },
      } = res;
      this.setState({
        memberInfo: data,
      });
      if (this.state.memberInfo.nickname === null) {
        this.setState({
          search: false,
          noResult: true,
        });
      } else {
        this.setState({
          search: true,
        });
      }
    } catch (error) {
      this.setState({
        error: "검색결과가 없습니다. 확인해주세요.",
      });
      console.log(error);
    } finally {
      this.setState({
        loading: true,
      });
    }
  };

  addTeam = () => {
    const { memberInfo } = this.state;
    if (this.memberArray.length === 0) {
      this.memberArray.push(memberInfo.nickname);
    } else {
      if (this.memberArray.includes(memberInfo.nickname)) {
        alert("이미 넣은 팀원입니다.");
      } else {
        this.memberArray.push(memberInfo.nickname);
      }
    }
  };

  render() {
    const {
      basicResult,
      radioArray,
      memberInfo,
      error,
      complete,
      search,
      noResult,
    } = this.state;
    return (
      <Container>
        <TeamInput
          onChange={this.teamName}
          placeholder="팀 이름을 적어주세요"
        />

        {radioArray.map((result, index) => (
          <React.Fragment key={index}>
            <RadioBox
              type="radio"
              name="platform"
              value={result}
              onChange={this.check}
              checked={basicResult === result}
            />
            {result}
          </React.Fragment>
        ))}
        <br />

        {basicResult === "Team" && (
          <>
            <MemberInput onChange={this.searchTerm} placeholder="팀원 검색" />
            <button onClick={this.searchResult}>검색</button>
          </>
        )}

        {search && (
          <>
            <Img src={memberInfo.userDetail.profileImgURL} />
            <Span>{memberInfo.nickname}</Span>
            <button onClick={this.addTeam}>추가</button>
          </>
        )}

        {!search && noResult && (
          <>
            <p>검색결과가 없습니다. 다시 검색해 주세요</p>
          </>
        )}

        {!complete && <SendBtn onClick={this.postInfo}>send</SendBtn>}
        {complete && <GoToHome to="/">홈으로가기</GoToHome>}
        {memberInfo.length === 0 && <Message text={error} />}
      </Container>
    );
  }
}

/* 

*/
