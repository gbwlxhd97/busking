import React from "react"; 
import { server } from '../api';

class UserDetail extends React.Component{
    state={
        nickname:"",
        profileImgURL:"",
        introduce:"",
        loading: false,
        error:null,
        list:""
    }

    /*getUserDetail = async () => {

        const {list}=this.state;
        try{
            const UserDetail = await server.getUserDetail()
            //let {data:{data:{userDetail}}}=UserDetail
            console.log(UserDetail);
        }catch(error){
            console.log(error)
        }finally{
            this.setState({
                loading:false
            })
        }
    }

    render(){
        this.getUserDetail();
        return(
            <div>qwer</div>
        )
    }*/
}

export default UserDetail;