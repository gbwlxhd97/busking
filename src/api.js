import axios from 'axios';

const api = axios.create({
  baseURL: "" //서버 url주소
})

export const server = {
  createAccount: (data) =>api.post("",data), //회원가입 post Method
  loginUser: (data) =>api.post("",data), //로그인 ``
}
