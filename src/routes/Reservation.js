import React from "react";
import { server } from '../api';
import "./style/Reservation.css"
import Section from '../Components/Section';
import Loader from '../Components/Loader';



class Reservation extends React.Component{
    state ={
        searchTerm: "",
        loading: false,
        songList: null,
        error: null
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
        this.setState({
            loading: true
        })
        try {
            const res =  await server.searchSong(searchTerm)
            let {data:{data}} = res
            this.noest = data
            console.log(data);
            this.setState({ 
                songList: data 
            })
        } catch (error) {
            this.setState({ error: "아무것도없습니다"})
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
       let {songList ,loading} = this.state;
        return(
        <div>
            <form onSubmit={this.handleSearch}>
                <input placeholder="검색할 음악제목"  onChange={this.updateTerm} value={this.state.searchTerm}/>
            </form>
            {loading ? <Loader/> :
                <div>    
                {songList && 
                <Section title="음악리스트">
                    { songList.map(song => (<div key={song.id}> {song.title}</div> ))}
                </Section>
                }
                </div>
                }
                
        </div>
        )
            
        
    }
}

export default Reservation;