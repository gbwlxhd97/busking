import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
import { server } from '../api';
import Swal from 'sweetalert2'
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
            const {data:{token,username}} = res
            localStorage.setItem('token',token)
            localStorage.setItem('username',username)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                /*
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                */
              })
              Toast.fire({
                icon: 'success',
                title: '로그인 성공!'
              })

            console.log('로그인성공');
            history.push('/')
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '아이디 또는 비밀번호가 잘못 입력 되었습니다.',
                confirmButtonText: '확인',
                showConfirmButton: true
                //timer: 1500
              })
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

