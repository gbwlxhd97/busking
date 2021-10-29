import React from "react";
import styled from "styled-components";
import Swal from 'sweetalert2'

const Title = styled.div`
    width:360px;
    height:80px;
    border:1px solid;
    font-size:25px;

`;

const Reservation = styled.div`
    border: 1px solid;
    width: 320px;
    height: 140px;
    margin-left:20px;
`;

const Lyrics = styled.div`
    border:1px solid;
    width: 320px;
    height: 270px;  
    margin-left:20px;
`;

const Chat = styled.div`
    border:1px solid;
    width: 320px;
    height: 150px; 
    margin-left:20px;
`;

const Contents = styled.div`
    width:360px;
    height:640px;
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

            <Contents>
                <Title>{this.state.nickname}님의 방</Title>
                <Reservation>예약 노래</Reservation>
                <Lyrics>가사</Lyrics>
                <Chat>채팅</Chat>
            </Contents>
            
            </>
            
        )
    }

}


export default UserRoom;