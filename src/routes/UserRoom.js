import React from "react";
import styled from "styled-components";
import Lyrics from "../Components/Lyrics"
import { _musicServer } from '../service/music';
import { Link} from "react-router-dom";

const Container = styled.div`
color:white;
`;

const Title = styled.div`
    display:inline-block;
    margin:20px;
    padding-right:10px;
`;

const Reservation = styled.div`

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

`;

const Section = styled.div`

`;

class UserRoom extends React.Component{
    state={
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
                title:data.title
            })
        }catch(error){ 
            this.setState({ error: "응애"})
        }finally{
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
            nickname:nickName
        })
        this.getSong()
    }
    
    render(){
        const {lyrics,singer,img,title,nickname}=this.state
        return(
            <Container>
                <Section>
                    <Title>🎵 {nickname}님 방</Title>
                </Section>

                <Section>
                    <Reservation>
                        <span>⎧예약 노래 보기 ᐳ</span>
                        <Btn>
                            <RLink to ={`/reservation/${nickname}`}>⎧노래 예약하러가기 ᐳ</RLink>
                        </Btn>
                    </Reservation>
                </Section>

                <Section>
                    <Lyrics
                        lyrics={lyrics}
                        singer={singer}
                        img={img}
                        title={title}
                    />
                </Section>

                <Section>
                    <Chat>채팅</Chat>
                </Section>
            </Container>
        )
    }
}


export default UserRoom;

/*

    
    var str = this.state.lyrics.split('~')
    str.map(asdf => console.log(asdf))
*/