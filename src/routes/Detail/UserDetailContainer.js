import React from "react";
import UserDetailPresenter from "./UserDetailPresenter";
import { server } from "../../api";

export default class extends React.Component{
    state={
        nickname:"",
        loading: false,
        error: null
    };

    async componentDidMount() {
        try{
            const asdf = await server.getUserDetail("아이유");
            let {data:{data:{nickname}}} =asdf
            this.setState({
                nickname
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
}