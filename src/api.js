import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})

export const server = {
  loginUser: (data) =>api.post("/user/login",data), //로그인 ``
  createAccount: (data) =>api.post("/user",data), //회원가입 post Method
  getAllUser: () => api.get("/user/all"), //전체 user 데이터 받아오기  
  getSongList: () => api.get("/music/all"),
  searchSong: (keyword) => api.get(`/music/keyword/${keyword}`, {
    params: {
      query: encodeURIComponent(keyword)
    }
  }),
  getTeam: () => api.get("/team/all"),
  postOnAir: (data) => api.post("/team/onAir",data),
  getUserDetail:(nickname)=>api.get(`/user/${nickname}`),
  putUserDetail:(data)=>api.put(`/user/detail/${data.nickname}`,data)// 아이유 oldNickname 바뀐 닉 , 바뀐 사진, 바뀐 소개
}
