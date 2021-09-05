import React, { Component } from "react";
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pw: ""
        }
    }
    handleChange =(event) => {
        // const  {target : {value}} = event value으로 변수명바꾸고 뽑아내주기.
        // event.preventDefault()
        console.log(event.target.value);
        console.log(event);
        this.setState({
            id: event.target.value
        })
        

    }
    render(){
        // console.log(this.state);
        const {id} = this.state;
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

