import React from "react";
import styled from "styled-components";
import Lyrics from "../Components/Lyrics"
import { _musicServer } from '../service/music';
import { _userServer } from '../service/user';
import { Link} from "react-router-dom";
//import { searchUser } from "./SearchUser";

const Container = styled.div`
color:#444;
    background-color:white;
`;

const Title = styled.div`
    display:inline-block;
    margin:20px;
    padding-right:10px;
    font-weight: bold;
`;

const Reservation = styled.div`
    width: 320px;
    height: 140px;
    margin-left:20px;
`;

const RLink = styled(Link)`
    color:white;
    text-decoration-line: none;
    font-size:16px;
`;

const Btn = styled.button`
    margin-left:30px;
    background-color: #282828;
    border:none;
`;

const Chat = styled.div`
    border:1px solid;
    width: 320px;
    height: 150px; 
    margin-left:20px;
    margin-top:10px;
`;

const Table = styled.table`
    border-top: 2px solid rgba(189, 189, 189, 0.8);
    border-bottom: 2px solid rgba(189, 189, 189, 0.8);
    width:320px;
    height:125px;
    text-align:center;
    border-collapse: collapse; 
`;
const Th = styled.th`
    border-bottom:1px solid grey;
    background-color: lightgrey;
    
`;
const Td = styled.td`
    border-bottom:1px solid grey;
    font-size:14px;
`;

const Section = styled.div`

`;

const Img = styled.img`
    vertical-align:middle;
    width:70px;
    height:70px;
    margin-right:5px;
    border-radius: 25%;
    border:1.5px solid #FFC314;
`;

class UserRoom extends React.Component{
    
    state={
        userImg:"",
        nickname:"",
        lyrics: "",
        singer:"",
        img:"",
        title:"",
        loading: false,
        error: null
    }

    getSong = async()=>{
        try{
            const res = await _musicServer.getSong("이로하")
            let {data:{data}}=res;
            this.setState({
                lyrics:data.lyrics,
                singer:data.singer,
                img:data.profileImgURL,
                title:data.title,
            })
        }catch(error){ 
            this.setState({ error: "응애"})
        }finally{
            this.setState({
                loading: false
            })
        }
    }

    getImg = async ()=> {
        const {
            match: {
                params: { nickName }
            }
        } = this.props;
        try {
            const res = await _userServer.getUserDetail()
            console.log(res);
        
        } catch (error) { 
            this.setState({ error: "Error"})
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    componentDidMount(){
        const {
            match: {
                params: { nickName }
            }
        } = this.props;
        this.setState({
            nickname: nickName
        })
        
        this.getSong()
        
        this.getImg()
    }
    
    render(){
        console.log(this.props)
        console.log(this.state.nickname)
        const {userImg, lyrics, nickname}=this.state
        return(
            <Container>
                <Section>
                    <Title><Img src = {userImg}/>{nickname}님 방</Title>
                </Section>

                <Section>
                    <Reservation>
                        <Table>
                            <tr>
                                <Th><bold>No.</bold></Th>
                                <Th><bold>Name</bold></Th>
                                <Th><bold>Value</bold></Th>                              
                            </tr>
                            <tr>
                                <Td>현재곡</Td>
                                <Td>신호등</Td>
                                <Td>이무진</Td>
                            </tr>
                            <tr>
                                <Td>1</Td>
                                <Td>ㅇㅇㅇ</Td>
                                <Td>ㅅㅅㅅ</Td>
                            </tr>
                            <tr>
                                <Td>2</Td>
                                <Td>ㅁㅁㅁ</Td>
                                <Td>ㅇㅇㅇ</Td>
                            </tr>
                            
                        </Table>
                        <Btn>
                            <RLink to ={`/reservation/${nickname}`}>⎧노래 예약하러가기 ᐳ</RLink>
                        </Btn>
                    </Reservation>
                </Section>

                <Section>
                    <Lyrics
                        lyrics={lyrics}
                    />
                </Section>

                <Section>
                    <Chat></Chat>
                </Section>
            </Container>
        )
    }
}


export default UserRoom;

/*

    
    var str = this.state.lyrics.split('~')
    str.map(asdf => console.log(asdf))





    ---------

    
*/