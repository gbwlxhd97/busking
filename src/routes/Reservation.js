import React from "react";
import { server } from '../api';
import "./style/Reservation.css"
import Section from '../Components/Section';




class Reservation extends React.Component{
    state ={
        searchTerm: "",
        loading: false,
        songList: null,
    }
    

    handleSearch = (event) => {
        event.preventDefault();
        const { searchTerm} = this.state;
        if(searchTerm !== "") {
            this.searchByTerm(searchTerm)
        }    
    }

    searchByTerm = async () => {
        const { searchTerm} = this.state;
        try {
            const res =  await server.searchSong(searchTerm)
            // this.songList = res;
            let {data:{data}} = res
            
            console.log(data);
            this.setState({ 
                loading: true,
                songList: data 
            })
        } catch (error) {
            this.setState({ error: "노래가없엉"})
        }
    }
    updateTerm = (event) => {
    const {target:{value}} = event;
    this.setState({
        searchTerm: value
    })
    }


    render(){
       let {songList} = this.state;
        return(
        <div>
            <form onSubmit={this.handleSearch}>
                <input placeholder="검색할 음악제목"  onChange={this.updateTerm} value={this.state.searchTerm}/>
            </form>
            
            <div>
                {songList &&
                <Section title="음악리스트">
                    {songList.map(song => (<div key={song.id}> {song.title}</div> )) }
                </Section>
                }</div>
                
                
            
            
                
        </div>
        )
            
        
    }
}

export default Reservation;