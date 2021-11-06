import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})


export const _teamServer = {
  getAllTeam: () => api.get("/team/all"),
  searchTeam: (teamName) => api.get(`/team/${teamName}`),
  postOnAir: (data) => api.post("/team/onAir",data),
  postTeam:(data) => api.post ("/team",data),
}