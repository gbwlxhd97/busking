import React from "react";
<<<<<<< HEAD
import { server } from '../api';
/*
function Room() {
    return(
        <div>
            <h1>방 만들기</h1>
        </div>
    );

    
}

*/

class UserRoom extends React.Component{
    render(){
        <div>
            <h1>방 만들기</h1>
        </div>
    }
=======
import styled from "styled-components";

const Title = styled.div`

`;

const Reservation = styled.div`

`;

const Lyrics = styled.div`

`;

const Chat = styled.div`

`;




class UserRoom extends React.Component{
    state={
        nickname:""
    }
    componentDidMount(){
        const {
            match: {
              params: { nickName }
            }
          } = this.props;
        this.setState({
            nickname:nickName
        })
    }
    render(){
        return(
            <>
            <Title>{this.state.nickname}님 방</Title>
            <Reservation>예약 노래</Reservation>
            <Lyrics>가사</Lyrics>
            <Chat>채팅</Chat>
            </>
        )
    }

>>>>>>> 698efc7226ffad0f6d112f0446e77c8dd515fc4d
}


export default UserRoom;