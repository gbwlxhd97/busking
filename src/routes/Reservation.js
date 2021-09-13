import React from "react";
import { server } from '../api';
import "./style/Reservation.css"





class Reservation extends React.Component{
    state ={
        searchTerm: "Jail",
        loading: false
    }

    componentDidMount() {
        this.handleSearch()
    }

    handleSearch = () => {
        const { searchTerm} = this.state;
        if(searchTerm !== "") {
            this.searchByTerm(searchTerm)
        }    
    }

    searchByTerm = async () => {
        const { searchTerm} = this.state;
        try {
            const res =  await server.searchSong(searchTerm)
            console.log(res);
            this.setState({ loading: true})
        } catch (error) {
            this.setState({ error: "노래가없엉"})
        }
    }
    


    render(){
        return(
        <div>
            hi
        </div>
        )
            
        
    }
}

export default Reservation;