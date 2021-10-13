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
    margin-bottom:7px;
`;

const Span = styled.span`
    display: inline-block;
    overflow:auto;
    height:50px;
    width:200px;
`;

const UserImg = styled.img`
    width:130px;
    height:130px;
    padding:40px;
    border-bottom:2px solid black;
    border-right:2px solid black;
    border-radius:50%;
`;

const Btn = styled.button`
    width:auto;
    height:auto;
    padding:7px;
    margin-top:5px;
    border:none;
    border-bottom:1px solid black;
    border-top:1px solid black;
    border-radius:5px;
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
        userNickname:"",
        birthday:"",
        gender:"",
        userImgUrl:"",
        introduce:"",
        loading: false,
        error: null,
        btnClick:true,
        value:"",
        duplicateCheck:false,
        change:false,
        count:0
    };

    onClick=()=>{
        this.setState({
            btnClick: !this.state.btnClick,
            count:1
        })
        
        const {
            duplicateCheck,
            count
        }=this.state
        if(duplicateCheck===true){
            this.sendFix()
            this.setState({
                duplicateCheck:false,
                count:0
            })
        }else if(duplicateCheck===false&&count!==0){//처음 눌렀다는것을 알 수 있는 state 중복체크 안하고 첫 클릭이 아닐때
            alert("중복 체크를 해주세요")
            this.setState({
                count:0
            })
        }
    }

    valueChange=(event)=>{
        this.setState({
            value:event.target.value
        })
    }

    onClickCheckNickname=(event)=>{
        event.preventDefault();
        const {
            userNickname,
            value
        }=this.state
        if(value!==""){
            if(userNickname===value){
                this.setState({
                    duplicateCheck:true,
                    change:false
                })
            }else {//닉변 했으면 db에 같은 닉 있는지 판단하는 조건문 자리
                this.setState({
                    duplicateCheck:true,
                    change:true
                })
            }
        }else{
            alert("칸이 비어있습니다.")
        }
    }
    
    sendFix=()=>{
        const {
            duplicateCheck,
            change
        }=this.state;
        
        while (1){
            if(duplicateCheck===true&&change===true){
                console.log("send data to db1")
                this.setState({
                    value:""
                })
                break;
            }else if(duplicateCheck===true&&change===false){
                console.log("send data to db2")
                this.setState({
                    value:""
                })
                break
            }else{
                alert("plz duplicate check")
                continue
            }
        }
    }

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

    render(){
        const now = new Date();	// 현재 날짜 및 시간
        var year = now.getFullYear();
        const {
            btnClick,
            userNickname,
            birthday,
            gender,
            userImgUrl,
            introduce
        } = this.state;

        return(
            <Container>
                <ImgSection>
                    <UserImg src={userImgUrl}/>
                </ImgSection>

                <DetailSectionList>
                    {btnClick===true ?                    
                    (<Details>
                        <span>nickname:<br/></span>
                        <Span>{userNickname}</Span>
                    </Details>):(                    
                    <Details>
                        <form>
                            nickname:<br/>
                            <input type="text" name="name" onChange={this.valueChange} placeholder={userNickname} />
                            <Btn onClick={this.onClickCheckNickname}>중복 체크</Btn>
                        </form>
                    </Details>)}

                    {btnClick===true ?                    
                    (<Details>
                        <span>introduce:<br/></span>
                        <Span>{introduce}</Span>
                    </Details>):(                    
                    <Details>
                        <form>
                            introduce:<br/>
                            <input type="text" name="name" onChange={this.valueChange}  placeholder={introduce} />
                        </form>
                    </Details>)}

                    <Details>
                        <span>Age:<br/></span>
                        <Span>{year-birthday}</Span>
                    </Details>
                  
                    <Details>
                        <span>gender:<br/></span>
                        <Span>{gender}</Span>
                    </Details>

                    {btnClick ===true ?
                        <Btn onClick={this.onClick}>정보 수정하기</Btn>
                        :<Btn onClick={this.onClick}>수정 완료</Btn>}
                    
                </DetailSectionList>
            </Container>)
    }
}