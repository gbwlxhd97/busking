import axios from 'axios';

const api = axios.create({
  baseURL: "https://busking-back.herokuapp.com" //서버 url주소
})


export const _userServer = {
    getAllUser: () => api.get("/user/all"), //전체 user 데이터 받아오기  
    getUserDetail:(nickname)=>api.get(`/user/${nickname}`),
    putUserDetail:(data)=>api.put(`/user/detail/${data.oldNickname}`,data),// 아이유 oldNickname 바뀐 닉 , 바뀐 사진, 바뀐 소개
    searchUser:(nickname)=>api.get(`/user/${nickname}`, {
        params: {
            query: encodeURIComponent(nickname)
        }
    })
}