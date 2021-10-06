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

const Gender = styled.div `
`

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pw: "",
            name: "",
            age: Number,
            gender: Boolean,
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

    handleSubmit = async(event) => {
        try {
            await server.createAccount({
                loginEmail: this.state.id, 
                password: this.state.pw,
                nickName: this.state.name,
                age: this.state.age,
            })
            console.log('id, pw, name, age 전송 완료');
        } catch (error) {
            console.log(error);
            console.log("오류발생!!!!!!");
        }
    }
    
    render() {
        const {id, pw, name} = this.state;
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
                        <Input type="date" min="1900-01-01" max="2021-09-24"/>
                        <Gender>
                            <input type="radio" name="gender" value="male"/>
                            <label for="male">남성</label>
                            <input type="radio" name="gender" value="female"/>
                            <label for="female">여성</label>
                        </Gender>
                    </InputDiv>
                </form>
                <button onClick={this.handleSubmit} >회원가입</button>
            </Form>
        )
    }
}

export default SignUp;