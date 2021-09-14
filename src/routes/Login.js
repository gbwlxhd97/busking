import React, { Component, useEffect } from "react";
//import axios from 'axios';
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            pw: ""
        }
    }
    handleId=(event) => {
        // const  {target : {value}} = event value으로 변수명바꾸고 뽑아내주기.
        
        console.log(event.target.value);
        //console.log(event);
        this.setState({
            id: event.target.value,
            
        })
    }
    handlePw=(event) => {
        this.setState({
            pw:event.target.value
        })
    }
    handleSubmit = () => {
        console.log(this.state)
    }

 
   

    render(){
/*
        useEffect(() => {
            axios.get('/api/hello')     
            .then(response => {console.log(response)})  
        }, [])
*/
        console.log(this.state);
        const {id,pw} = this.state;
        return(
            <div style ={{
                
            }}>
                로그인
                <form>
                    <input 
                    placeholder="id입력해주세요"
                    value={id}
                    onChange={this.handleId}
                    />
                    <input placeholder="비밀번호"
                    value={pw}
                    type="password"
                    onChange={this.handlePw}
                    />
                </form>     
                <button onClick={this.handleSubmit} >로그인</button>
            </div>
        )
    }
}

export default Login;