import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})

export const _musicServer = {
  getSong: (title) => api.get(`/music/title/${title}/one`),
  searchSong: (keyword) => api.get(`/music/keyword/${keyword}`, {
    params: {
      query: encodeURIComponent(keyword)
    }
  }),
  getSearchTitle: (title) => api.get(`/music/title/${title}`)
}