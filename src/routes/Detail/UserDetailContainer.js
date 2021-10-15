import React from "react";
import UserDetailPresenter from "./UserDetailPresenter";
import { server } from "../../api";

export default class extends React.Component{
    state={
        nickname:"",
        birthday:"",
        gender:"",
        userImgUrl:"",
        loading: false,
        error: null
    };

    async componentDidMount() {
        const {
            match: {
              params: { nickName }
            }
          } = this.props;
        try{
            const asdf = await server.getUserDetail(nickName);
            let {data:{data}} = asdf;
            console.log(data)
            this.setState({
                userNickname:data.nickname,
                birthday:data.birthday,
                gender:data.gender,
                userImgUrl:data.userDetail.profileImgURL
            })
        }catch {
            this.setState({
                error: "Can't find movie information."
            });
        }finally {
            this.setState({
                loading: false
            });
        }
    }
    render(){
        const {userNickname,birthday,gender,userImgUrl} = this.state;
        return(
        <UserDetailPresenter
            userNickname={userNickname}
            birthday={birthday}
            gender={gender}
            userImgUrl={userImgUrl}
        />)
    }
}