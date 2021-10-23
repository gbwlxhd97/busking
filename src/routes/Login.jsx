import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
import { server } from '../api';
function Login() {
    const [values, setValues] = useState({id: "", pw: ""});
    const history = useHistory();

    const handleChange = (event) => {
        
        const {name, value} = event.target;
        setValues({...values, [name]: value})
        console.log(value);
    }
    
    const  handleSubmit = async(event) => {
    event.preventDefault();
        try {
        const res = await server.loginUser({
                username: values.id,
                password: values.pw
            })
            // console.log(res);
            const {data:{token,userNickname}} = res
            localStorage.setItem('token',token)
            localStorage.setItem('username',userNickname)
            //history.push('/')
            window.location.href="/"
        } catch (error) {
            alert('아이디 비밀번호가 맞지않음')
            console.log(error);
        }
    }
    
        return(
            <div>
                로그인
                <form>
                    <input placeholder="id입력해주세요"
                    value={values.id || ''}
                    type="text"
                    name="id"
                    onChange={handleChange}
                    />
                    <input placeholder="비밀번호"
                    value={values.pw || '' }
                    type="password"
                    name="pw"
                    onChange={handleChange}
                    />
                </form>     
                <button onClick={handleSubmit} >로그인</button>
            </div>
        )
    
}

export default Login;

