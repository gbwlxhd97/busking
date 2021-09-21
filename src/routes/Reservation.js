import React from "react";
import { server } from '../api';
import "./style/Reservation.css"
import Section from '../Components/Section';
import Loader from '../Components/Loader';
import Message from '../Components/Message';



class Reservation extends React.Component{
    state ={
        searchTerm: "",
        loading: false,
        songList: null,
        error: null
    }
    

    handleSearch = (event) => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if(searchTerm !== "") {
            this.searchByTerm(searchTerm)
        }    
    }

    searchByTerm = async () => {
        const { searchTerm} = this.state;
        this.setState({
            loading: true
        })
        try {
            const res =  await server.searchSong(searchTerm)
            let {data:{data}} = res
            console.log(data);
            this.setState({ 
                songList: data 
            })
        } catch (error) {
            this.setState({ error: "검색 결과가 없습니다.\n 검색어의 철자와 띄어쓰기가 정확한지 확인해 주세요."})
            console.log(error);
        } finally {
            this.setState({
                loading: false
            })
        }
    }
    
    updateTerm = (event) => {
        const {target:{value}} = event;
        this.setState({
            searchTerm: value
        })
    }


    render(){
       let {songList ,loading,error} = this.state;
        return(
        <div>
            <form onSubmit={this.handleSearch}>
                <input placeholder="검색할 음악제목"  onChange={this.updateTerm} value={this.state.searchTerm}/>
            </form>
            {loading ? <Loader/> :
                   <>
                {songList && 
                <Section title="음악리스트">
                    {songList.map(song => (
                        <div className="musicList" key={song.id}>
                            <img src={song.profileImgURL} alt="profile"></img>
                            {song.title} - {song.singer}
                        </div> )) }
                </Section>
            } 
            </>            
        }
        <div>
            {error && <Message text={error} />}
                </div>
        </div>
        )
            
        
    }
}

export default Reservation;