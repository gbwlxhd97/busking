import React,{useState} from "react";
import { server } from '../api';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

const Form = styled.div `
text-align: center;
margin-top: 50px;
`;
const InputDiv = styled.div `
display: flex;
flex-direction: column;
align-items: center;
margin: 20px;
`
const Input = styled.input `
margin: 2px;
`;

function Sign() {
    const history = useHistory();
    const [values, setValues] = useState
    ({
    id: "",
    pw: "",
    name: "",
    birthday: "",
    gender: "",
    });
    
    const change = (event) => {
        const {name,value} = event.target;
        setValues({...values,[name]:value}) 
    }

    const submit = async(event) => {
        event.preventDefault()
        try {
            await server.createAccount({
                username: values.id, 
                password: values.pw,
                nickname: values.name,
                birthday: values.birthday,
                gender: values.gender,
            })
            alert('회원가입 완료 로그인페이지로 이동합니다.')
            history.push('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Form>
            회원가입
            <form>
                <InputDiv>
                    <Input placeholder="ID를 입력해주세요"
                    value={values.id || ''}
                    name="id"
                    onChange={change}
                    />
                    <Input placeholder="PW를 입력해주세요"
                    value={values.pw || ''}
                    type="password"
                    name="pw"
                    onChange={change}
                    />
                    <Input placeholder="닉네임을 입력해주세요"
                    value={values.name || ''}
                    name="name"
                    onChange={change}
                    />
                    <Input placeholder="출생연도을 입력해주세요"
                    value={values.birthday || ''}
                    name="birthday"
                    onChange={change}
                    />
                    <div>
                        <Input type="radio" value="FEMALE" name="gender" id="FEMAEL" onChange={change}/>여성
                        <Input type="radio" value="MALE" name="gender" id="MAEL" onChange={change}/>남성
                    </div>
                </InputDiv>
            </form>
            <button onClick={submit} >회원가입</button>
        </Form>
    )
}


// class Signup extends React.Component{

//     constructor(props) {
//         super(props);
//         this.state = {
//             id: "",
//             pw: "",
//             name: "",
//             birthday: "",
//             gender: "",
        
//         }
//     }

//     handleId = (event) => {
//         const {target : {value}} = event
//         this.setState({
//             id: value,
//         })
//     }

//     handlePw = (event) => {
//         const {target : {value}} = event
//         this.setState({
//             pw: value,
//         })
//     }
    
//     handleName = (event) => {
//         const {target : {value}} = event
//         this.setState({
//             name: value,
//         })
//     }

//     handleBirthday = (event) => {
//         const {target : {value}} = event
//         console.log(value);
//         this.setState({
//             birthday: value,
//         })
//     }

//     handleGender = (event) => {
//         const {target : {value}} = event
//         this.setState({
//             gender: value,
//         })
//     }


//     handleSubmit = async(event) => {
//         event.preventDefault()
//         try {
//             await server.createAccount({
//                 username: this.state.id, 
//                 password: this.state.pw,
//                 nickName: this.state.name,
//                 birthday: this.state.birthday,
//                 gender: this.state.gender,
                
//             })
            
//             alert('회원가입 완료. 로그인 페이지로 이동합니다.')
//             window.location.href="/login"
//         } catch (error) {
//             console.log(error);
//             console.log("오류발생!!!!!!");
//         }
//     }
    
//     render() {
//         // const {id, pw, name, birthday,} = this.state;
//         return(
//             <Form>
//                 회원가입
//                 <form>
//                     <InputDiv>
//                         <Input placeholder="ID를 입력해주세요"
//                         value={values.id || ''}
//                         name="id"
//                         onChange={this.handleId}
//                         />
//                         <Input placeholder="PW를 입력해주세요"
//                         value={values.pw || ''}
//                         type="password"
//                         name="pw"
//                         onChange={this.handlePw}
//                         />
//                         <Input placeholder="닉네임을 입력해주세요"
//                         value={values.name || ''}
//                         name="name"
//                         onChange={this.handleName}
//                         />
//                         <Input placeholder="출생연도을 입력해주세요"
//                         value={values.birthday || ''}
//                         name="birthday"
//                         onChange={this.handleBirthday}
//                         />
//                         <div>
//                             <Input type="radio" value="FEMALE" name="FEMAEL" id="FEMAEL" onChange={this.handleGender}/>여성
//                             <Input type="radio" value="MALE" name="MAEL" id="MAEL" onChange={this.handleGender}/>남성
//                         </div>
//                     </InputDiv>
//                 </form>
//                 <button onClick={this.handleSubmit} >회원가입</button>
//             </Form>
//         )
//     }
// }



export default Sign;