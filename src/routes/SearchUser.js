import React from "react";
import styled from "styled-components";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { _userServer } from "../service/user";
import { Link } from "react-router-dom";

const Search = styled.input`
  margin-left: 37px;
  margin-top: 20%;
  background-color: #282828;
  padding: 8px 10px;
  color: white;
  border: none;
  outline: none;
  padding-right: 100px;
  border-bottom: 2px solid #adadad;
  &::-webkit-input-placeholder {
    color: #d2d2d2;
  }
`;

const Result = styled.div`
  margin-left: 37px;
  margin-top: 25px;
  overflow: auto;
  height: 300px;
`;

const Img = styled.img`
  vertical-align: middle;
  width: 70px;
  height: 70px;
  margin-right: 5px;
  border-radius: 25%;
  border: 1.5px solid #ffc314;
`;

const GoToRoom = styled.button`
  vertical-align: middle;
  border-style: none;
  width: auto;
  height: auto;
  margin-left: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  border-radius: 5px;
  background-color: white;
  &:active {
    background-color: gray;
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Span1 = styled.span`
  color: white;
  font-size: 20px;
`;

const Span2 = styled.span`
  margin-left: 37px;
  padding-top: 40px;
  padding-bottom: 5px;
  padding-right: 20px;
  border-bottom: 2px solid #adadad;
  color: white;
  font-size: 20px;
`;

const UserList = styled.li`
  margin-bottom: 25px;
  list-style: none;
  color: white;
`;

class SearchUser extends React.Component {
  state = {
    searchTerm: "",
    nickname: "",
    userImg: "",
    allUser: [],
    loading: false,
    error: null,
    same: false,
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.findSearchTerm(searchTerm);
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

  componentDidMount = () => {
    this.userAll();
  };

  userAll = async () => {
    try {
      const res = await _userServer.getAllUser();
      let {
        data: { data },
      } = res;
      this.setState({
        allUser: data,
      });
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

  findSearchTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const res = await _userServer.searchUser(searchTerm);
      let {
        data: {
          data: { userDetail },
        },
      } = res;
      this.setState({
        nickname: userDetail.nickname,
        userImg: userDetail.profileImgURL,
      });
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
    if (this.state.nickname === this.state.searchTerm) {
      this.setState({
        loading: true,
        same: true,
      });
    } else {
      this.setState({
        loading: false,
        same: false,
      });
    }
  };

  render() {
    const { userImg, nickname, allUser } = this.state;
    return (
      <>
        <form onSubmit={this.handleSearch}>
          <Search
            placeholder="버스커를 검색해주세요"
            onChange={this.updateTerm}
          />
          {this.state.loading ? (
            <div>
              <br />
              <Span2>🎵 버스커 검색 결과</Span2>
              <Result>
                <Img src={userImg} />
                <Span1>{nickname}</Span1>
                <GoToRoom>
                  <SLink to={`/userroom/${nickname}`}>방 들어가기</SLink>
                </GoToRoom>
              </Result>
            </div>
          ) : (
            <div>
              <br />
              <Span2>🎵 버스커 목록</Span2>
              <Result>
                {allUser.map((userdata, index) =>
                  userdata.userDetail !== null && (
                    <UserList key={index}>
                      <Img src={userdata.userDetail.profileImgURL} />
                      <Span1>{userdata.nickname}</Span1>
                      <GoToRoom>
                        <SLink to={`/userroom/${userdata.nickname}`}>
                          방 들어가기
                        </SLink>
                      </GoToRoom>
                    </UserList>
                  )
                  )}
              </Result>
            </div>
          )}
        </form>
        {this.state.same === false && <Message text={this.state.error} />}
      </>
    );
  }
}

export default SearchUser;
