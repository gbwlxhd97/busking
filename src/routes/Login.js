import React, { Component } from "react";

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pw: ""
        }
    }
    handleChange(event) {
        // const {target : {value,name}} = event;
        this.setState({
            [event.target.name]: event.target.value
        })
        // console.log(this.state);

    }
    render(){
        const {id,pw} = this.state;
        return(
            <div>
                로그인
                <form>
                    <input 
                    placeholder="id입력해주세요"
                    value={id}
                    onChange={this.handleChange}
                    />
                </form>
                
            </div>
        )
    }
}

export default Login;