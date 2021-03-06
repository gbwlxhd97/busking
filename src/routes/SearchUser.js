import React from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { _teamServer } from "../service/team";
import { Link } from "react-router-dom";

const Search = styled.input`
  margin-left: 37px;
  margin-top: 30px;
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
  height: 570px;
`;

const Img = styled.img`
  vertical-align: middle;
  width: 70px;
  height: 70px;
  margin-right: 8px;
  border-radius: 25%;
  border: 1.5px solid #ffc314;
`;

const GoToRoom = styled.button`
  float: right;
  font-size: 15px;
  padding: 5px 8px;
  margin-top: 19.5px;
  margin-right: 20px;
  border-radius: 15px;
  background-color: #ffc314;
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
`

class SearchUser extends React.Component {
  state = {
    allUser: [],
    searchInfo: null,
    loading: false,
    error: null,
    active: false,
    checkBusker: false
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.findSearchTerm(searchTerm);
    }
    this.setState({
      active: true
    })
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
      const res = await _teamServer.getAllTeam();
      let {
        data: { data },
      } = res;
      this.setState({
        allUser:data
      })
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  findSearchTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const res = await _teamServer.searchTeam(searchTerm);
      var {data:{data}}=res
      console.log(data);
      
      this.setState({
        searchInfo:data,
        checkBusker: false
      })
      //????????? ???????????? ????????? ?????? ??????
      if (res.data.status === 204) {
        throw new Error("catch");
      }
      console.log(res);
    } catch (error) {
      this.setState({
        error:
          "???????????? ???????????? ????????????.\n ???????????? ????????? ??????????????? ???????????? ????????? ?????????.",
          checkBusker: true
      });
    } finally {
      this.setState({
        loading: true,
      });
      
    }

  };
  render() {
    const { allUser, searchInfo } = this.state;
    return (
      <>
        <form onSubmit={this.handleSearch}>
          <Search
            placeholder="???????????? ??????????????????"
            onChange={this.updateTerm}
          />
          </form>
          {this.state.loading && this.state.active && searchInfo !== null ?
          (
            <div>
              <br />
              <Span2>???? ????????? ?????? ??????</Span2>
              <Result>
                <Img src={searchInfo.teamProfileImg} />
                <Span1>{searchInfo.teamName}</Span1>
                <GoToRoom>
                  <SLink to={`/userroom/${searchInfo.teamName}`}>??? ????????????</SLink>
                </GoToRoom>
              </Result>
            </div>
          ): null
        }
        
        { !this.state.active &&
        <div>
              <br />
              <Span2>???? ????????? ??????</Span2>
              <Result>
                {allUser.map((userdata, index) =>
                  userdata.userDetail !== null && userdata.onAir === true && (
                    <UserList key={index}>
                      <Img src={userdata.teamProfileImg} />
                      <Span1>{userdata.teamName}</Span1>
                      <GoToRoom>
                        <SLink to={`/userroom/${userdata.teamName}`}>
                          ??? ????????????
                        </SLink>
                      </GoToRoom>
                    </UserList>
                  )
                  )}
              </Result>
            </div>
        }
          
        { this.state.checkBusker&&<Message text={this.state.error} />}
      </>
    );
  }
}

export default SearchUser;

