import React from "react";
import { server } from '../api';
import styled from "styled-components";

const Form = styled.div `
text-align: center;
margin-top: 50px
`
const InputDiv = styled.div `
display: flex;
flex-direction: column;
align-items: center;
margin: 20px;
`
const Input = styled.input `
margin: 2px;
`

class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pw: "",
            name: "",
            age: "",
            gender: "",
            role: "USER",
        }
    }

    handleId = (event) => {
        const {target : {value}} = event
        this.setState({
            id: value,
        })
    }

    handlePw = (event) => {
        const {target : {value}} = event
        this.setState({
            pw: value,
        })
    }
    
    handleName = (event) => {
        const {target : {value}} = event
        this.setState({
            name: value,
        })
    }

    handleAge = (event) => {
        const {target : {value}} = event
        this.setState({
            age: value,
        })
    }

    handleGender = (event) => {
        const {target : {value}} = event
        this.setState({
            gender: value,
        })
    }

    handleRole = (event) => {
        const {target : {value}} = event
        this.setState({
            role: value,
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        try {
            await server.createAccount({
                username: this.state.id, 
                password: this.state.pw,
                nickName: this.state.name,
                age: this.state.age,
                gender: this.state.gender,
                role: this.state.role,
            })
            console.log('id, pw, name, age, gender 전송 완료');
        } catch (error) {
            console.log(error);
            console.log("오류발생!!!!!!");
        }
    }
    
    render() {
        const {id, pw, name, age, gender, role} = this.state;
        return(
            <Form>
                회원가입
                <form>
                    <InputDiv>
                        <Input placeholder="ID를 입력해주세요"
                        value={id}
                        onChange={this.handleId}
                        />
                        <Input placeholder="PW를 입력해주세요"
                        value={pw}
                        type="password"
                        onChange={this.handlePw}
                        />
                        <Input placeholder="닉네임을 입력해주세요"
                        value={name}
                        onChange={this.handleName}
                        />
                        <Input placeholder="출생연도을 입력해주세요"
                        value={age}
                        onChange={this.handleAge}
                        />
                        <Input placeholder="유저를 입력해주세요"
                        value={role}
                        onChange={this.handleRole}
                        />
                        <div>
                            <Input type="radio" value="FEMALE" name="gender" id="FEMAEL" onChange={this.handleGender}/>여성
                            <Input type="radio" value="MALE" name="gender" id="MAEL" onChange={this.handleGender}/>남성
                        </div>
                    </InputDiv>
                </form>
                <button onClick={this.handleSubmit} >회원가입</button>
            </Form>
        )
    }
}



export default Signup;