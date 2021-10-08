import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { server } from '../api';

const Form = styled.div `
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
width: 80%
`
const H3 = styled.h3 `
font-size: 1.5rem;
font-weight: 600;
margin-bottom: 40px;
`
const FormDiv = styled.div `
margin: 20px 0;
display: flex;
flex-direction: column;
align-items: center;
`
const InputDiv = styled.div `
margin: 8px 0;
border-bottom: 2px solid #adadad;
width: 80%
`
const Input = styled.input `
padding: 8px 10px;
width: 100%;
border:none;
outline:none;
`
const Button = styled.button `
margin-top: 5px;
padding: 8px 30px;
border-radius: 10px;
background-color: white;
&:hover {
    background-color: black;
    color: white;
}
` 


function Login() {
    const [values, setValues] = useState({id: "", pw: ""});
    const history = useHistory();

    const handleChange = (event) => {
        
        const {name, value} = event.target;
        setValues({...values, [name]: value})
        console.log(value);
    }
    
    const  handleSubmit = async(event) => {
    event.preventDefault();
        try {
        const res = await server.loginUser({
                username: values.id,
                password: values.pw
            })
            // console.log(res);
            const {data:{token,username}} = res
            localStorage.setItem('token',token)
            localStorage.setItem('username',username)
            console.log('로그인성공');
            history.push('/')
        } catch (error) {
            alert('아이디 비밀번호가 맞지않음')
            console.log(error);
        }
    }
    
        return(
            <Form>
                <H3>로그인</H3>
                <form>
                    <FormDiv>
                        <InputDiv>
                            <Input placeholder="id입력해주세요"
                            value={values.id || ''}
                            type="text"
                            name="id"
                            onChange={handleChange}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Input placeholder="비밀번호"
                            value={values.pw || '' }
                            type="password"
                            name="pw"
                            onChange={handleChange}
                            />
                        </InputDiv>
                    </FormDiv>
                </form>     
                <Button onClick={handleSubmit} >로그인</Button>
            </Form>
        )
    
}

export default Login;

