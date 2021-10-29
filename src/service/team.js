import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})


export const _teamServer = {
  getTeam: () => api.get("/team/all"),
  postOnAir: (data) => api.post("/team/onAir",data),
}