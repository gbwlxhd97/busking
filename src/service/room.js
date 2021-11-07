import axios from "axios";

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com", //서버 url주소
});

export const _userRoom = {
  getRoom: () => api.get("/room/all"),
  creatRoom: (data) => api.post("/room", data),
  deleteRoom: (data) => api.delete("/room", data),
  postMusic: (info) =>
    api.post(`/room/${info.roomName}/${info.teamName}/music`, info),
  getRoomInfo: (info) => api.get(`/room/${info.roomName}/${info.teamName}`),
};
