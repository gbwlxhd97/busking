import React from "react";
import styled from "styled-components";
import Loader from "../Components/Loader"
import Message from "../Components/Message"
import {server} from "../api";

const Search = styled.input`
    margin-left:25%;
    margin-top:20%;
`;

const Result =styled.div`
    margin-left:25%;
    margin-top:20px;
`;

const Img = styled.img`
    vertical-align:middle;
    width:50px;
    height:50px;
    margin-right:5px;
`;

const GoToRoom = styled.button`
    vertical-align:middle;
    border-style: none;
    width:auto;
    height:auto;
    margin-left:5px;
    margin-bottom: 5px;
    border-bottom:1px solid black;
    border-top:1px solid black;
    border-radius:5px;
    background-color: white;
    &:active{
        background-color: gray;
    }
`;

class SearchUser extends React.Component{
    state={
        searchTerm:"",
        nickname:"",
        userImg:"",
        loading: false,
        error:null,
        same:false
    }

    handleSearch = (event) => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if(searchTerm !== "") {
            this.findSearchTerm(searchTerm)
        }
    }

    updateTerm = (event) => {
        const {target:{value}} = event;
        this.setState({
            searchTerm: value
        })
    }

    findSearchTerm = async ()=>{
        const {searchTerm} = this.state;

        try {
            const res =  await server.searchUser(searchTerm)
            let {data:{data:{userDetail}}}=res;
            this.setState({
                nickname:userDetail.nickname,
                userImg:userDetail.profileImgURL
            })
        } catch (error) { 
            this.setState({ error: "검색 결과가 없습니다.\n 검색어의 철자와 띄어쓰기가 정확한지 확인해 주세요."})
        } finally {
            this.setState({
                loading: false
            })
        }
        if(this.state.nickname===this.state.searchTerm){
            this.setState({
                loading: true,
                same:true
            })
        }else{
            this.setState({
                loading: false,
                same:false
            })
        }
    }

    render(){
        return(
            <>
            <form onSubmit={this.handleSearch}>
                <Search 
                    placeholder="버스커를 검색해주세요" 
                    onChange={this.updateTerm}
                />
                {this.state.loading ? 
                (<Result>
                    <Img src={this.state.userImg}/>
                    <span>{this.state.nickname}</span>
                    <GoToRoom>버스킹 들어가기</GoToRoom>
                </Result>):
                (<Result></Result>)}
            </form>
            {this.state.same===false  && <Message text={this.state.error}/>}
            </>

        )
    }
}

export default SearchUser;


/*

    updateTerm = (event) => {
        const {target:{value}} = event;
        this.setState({
            searchTerm: value
        })
    }

    userAll = async ()=>{
        try{
            const res = await server.getAllUser();
            const {data:{data}} =res
            this.setState({
                userArray:data
            })
        }catch (error) { 
            this.setState({ error: "검색 결과가 없습니다.\n 검색어의 철자와 띄어쓰기가 정확한지 확인해 주세요."})
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    findSearchTerm = ()=>{
        const {userArray,searchTerm}=this.state;
        this.setState({
            loading: true
        })
        userArray.map(data => {
            if (data.nickname ===searchTerm) {
                this.setState({
                    nickname: data.nickname,
                    userImg: data.userDetail.profileImgURL
                })
                console.log(this.state.nickname)
            }
        })
    }
    
    handleSearch = (event) => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if(searchTerm !== "") {
            this.findSearchTerm(searchTerm)
        }
    }

    componentDidMount(){
        this.userAll()
    }


*/