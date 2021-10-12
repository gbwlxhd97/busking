import React from "react";
import styled from "styled-components";
import { server } from "../api";

const Container = styled.div`
    margin-left:15%;
    background-color:white;
    display: flex;
    flex-direction: column;
`;

const ImgSection = styled.div`
    margin-top:10px;
    margin-left:8px;
`;

const DetailSectionList = styled.ul`
`;

const Details = styled.li`
    list-style:none;
    margin-bottom:10px;
`;

const Span = styled.span`
    display: inline-block;
    overflow:auto;
    height:50px;
    width:200px;
`;

const UserImg = styled.img`
    width:120px;
    height:120px;
    padding:50px;
    border-bottom:2px solid black;
    border-right:2px solid black;
    border-radius:50%;
`;

const FixBtn = styled.button`
    width:150px;
    height:30px;
    padding:0px;
    border:none;
    border-bottom:1px solid black;
    border-top:1px solid black;
    background-color: white;
    &:active {
        background-color: gray;
        color:white;
        letter-spacing: 5px;
        transition: all ease 0.3s 0s;
      }
`;


export default class extends React.Component{
    state={
        nickname:"",
        birthday:"",
        gender:"",
        userImgUrl:"",
        introduce:"",
        loading: false,
        error: null,
        a:true
    };

    async componentDidMount() {
        const {
            match: {
              params: { nickName }
            }
          } = this.props;
        try{
            const info = await server.getUserDetail(nickName);
            let {data:{data}} = info;
            this.setState({
                userNickname:data.nickname,
                birthday:data.birthday,
                gender:data.gender,
                userImgUrl:data.userDetail.profileImgURL,
                introduce:data.userDetail.introduce
            })
        }catch {
            this.setState({
                error: "Can't find movie information."
            });
        }finally {
            this.setState({
                loading: false
            });
        }
        
    }
    change=()=>{
        this.setState({ a: !this.state.a })
    }
    render(){
        const {a,userNickname,birthday,gender,userImgUrl,introduce} = this.state;
        return(
            <Container>
                <ImgSection>
                    <UserImg src={userImgUrl}/>
                </ImgSection>

                <DetailSectionList>
                    <Details>
                        <span>userNickname:<br/></span>
                        <Span>{userNickname}</Span>
                    </Details>
                    <Details>
                        <span>introduce:<br/></span>
                        <Span>{introduce}</Span>
                    </Details>
                    <Details>
                        <span>birthday:<br/></span>
                        <Span>{birthday}</Span>
                    </Details>                
                    <Details>
                        <span>gender:<br/></span>
                        <Span>{gender}</Span>
                    </Details>
                    {a ===true ? 
                        <FixBtn onClick={this.change}>FixDetail</FixBtn>
                        :<FixBtn onClick={this.change}>Complete</FixBtn>}
                    
                </DetailSectionList>
            </Container>)
    }
}
