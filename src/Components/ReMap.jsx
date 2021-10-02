import React,{useEffect} from "react";
import { server } from '../api';


function ReMap() {
    //useEffect 부분

    useEffect(() => {
        getUser();
    },[])
    return (
        <div>홰위</div>
    )
}



//userApi
const getUser = async() => {
    try {
        const res = await server.getAllUser();
        const {data: {data}} =res;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export default ReMap;