import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})

export const _musicServer = {
  getSongList: () => api.get("/music/all"),
  searchSong: (keyword) => api.get(`/music/keyword/${keyword}`, {
    params: {
      query: encodeURIComponent(keyword)
    }
  }),
  
}