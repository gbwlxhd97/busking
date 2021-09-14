import React from "react";
import { server } from '../api';
class Login extends React.Component{

        state = {
            id: "",  
            pw: ""
        }    
    handleId =(event) => {
        // const  {target : {value}} = event value으로 변수명바꾸고 뽑아내주기.
        
        // console.log(event.target.value);
        // console.log(event);
        this.setState({
            id: event.target.value,
            
        })
    }
    handlePw = (event) => {
        this.setState({
            pw:event.target.value
        })
    }
    
    handleSubmit = async(event) => {
        try {
            await server.loginUser({
                loginID: this.state.id,
                password: this.state.pw
                
            })
            console.log('id pw 전송 완료');
        } catch (error) {
            console.log(error);
        }
    }
    render(){
        // console.log(this.state);
        const {id,pw} = this.state;
        return(
            <div>
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

