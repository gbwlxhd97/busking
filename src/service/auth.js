import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})

export const _authServer = {
  loginUser: (data) =>api.post("/user/login",data), //로그인 ``
  createAccount: (data) =>api.post("/user",data), //회원가입 post Method
}