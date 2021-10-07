import React from "react";
import UserDetailPresenter from "./UserDetailPresenter";
import { server } from "../../api";

export default class extends React.Component{
    state={
        userInfo:[],
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
            /*let {data:{data:{userDetail}}} = asdf;
            this.setState({
                userInfo:userDetail
            })*/
            console.log(asdf);
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
        console.log(this.state.userInfo.nickname)
        return(
            <div>asdf</div>
        )
    }
}