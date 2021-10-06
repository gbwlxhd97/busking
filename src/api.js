import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})

export const server = {
  createAccount: (data) =>api.post("/user",data), //회원가입 post Method
  loginUser: (data) =>api.post("/user",data), //로그인 ``
  getAllUser: () => api.get("/user/all"), //전체 user 데이터 받아오기  
  getSongList: () => api.get("/music/all"),
  searchSong: (keyword) => api.get(`/music/keyword/${keyword}`, {
    params: {
      query: encodeURIComponent(keyword)
    }
  })
}
