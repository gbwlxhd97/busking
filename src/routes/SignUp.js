import React, { useState } from "react";
import { _authServer } from "../service/auth";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Form = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 80%;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 50px;
`;
const FormDiv = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputDiv = styled.div`
  margin: 10px 0;
  border-bottom: 2px solid #adadad;
  width: 80%;
`;
const Input = styled.input`
  color: white;
  padding: 8px 10px;
  width: 100%;
  border: none;
  outline: none;
  padding-right: 100px;
  background-color: #282828;
  &::-webkit-input-placeholder {
    color: #d2d2d2;
  }
`;
const GenderDiv = styled.div`
  display: flex;
  margin: 15px;
`;
const Gender = styled.div`
  margin: 0 5px;
  font-size: 1rem;
`;
const Button = styled.button`
  padding: 8px 30px;
  border-radius: 10px;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
  }
`;

function Sign() {
  const history = useHistory();
  const [values, setValues] = useState({
    id: "",
    pw: "",
    name: "",
    birthday: "",
    gender: "",
  });

  const change = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const res = await _authServer.createAccount({
        username: values.id,
        password: values.pw,
        nickname: values.name,
        birthday: values.birthday,
        gender: values.gender,
      });
      console.log(res);
      if (res.data === 409) {
        alert("해당 아이디는 혹은 닉네임이 중복됩니다.");
        return;
      }
      if (res.data === 201) {
        alert("회원가입 완료 로그인페이지로 이동합니다.");
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form>
      <H3>회원가입</H3>
      <form>
        <FormDiv>
          <InputDiv>
            <Input
              placeholder="ID를 입력해주세요"
              value={values.id || ""}
              name="id"
              onChange={change}
            />
          </InputDiv>
          <InputDiv>
            <Input
              placeholder="PW를 입력해주세요"
              value={values.pw || ""}
              type="password"
              name="pw"
              onChange={change}
            />
          </InputDiv>
          <InputDiv>
            <Input
              placeholder="닉네임을 입력해주세요"
              value={values.name || ""}
              name="name"
              onChange={change}
            />
          </InputDiv>
          <InputDiv>
            <Input
              placeholder="출생연도을 입력해주세요"
              value={values.birthday || ""}
              name="birthday"
              onChange={change}
              type="number"
            />
          </InputDiv>
          <GenderDiv>
            <Gender>
              <input
                type="radio"
                value="FEMALE"
                name="gender"
                id="FEMAEL"
                onChange={change}
              />
              여성
            </Gender>
            <Gender>
              <input
                type="radio"
                value="MALE"
                name="gender"
                id="MAEL"
                onChange={change}
              />
              남성
            </Gender>
          </GenderDiv>
        </FormDiv>
      </form>
      <Button onClick={submit}>회원가입</Button>
    </Form>
  );
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
