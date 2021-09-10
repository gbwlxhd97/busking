import React from "react";
import "./style/Reservation.css"


const musicInfomation=[{
    title:"Jail",
    singer:"Kanye West",
    img:"https://w.namu.la/s/3d07a08af0b3be7afeee94f2972ebc72241d2cc9f6ce06f5dc2cbff51d19f9184c69172d0e776cc70a0de6de927e86a409eb43843a4040657d0c8dcc2a59cdb9f932608fdb59d5cc041c55e0a2ec340f9ce77a9f9f4933e2250b1eedec7fdbfc"
},{
    title:"Jail Pt.2",
    singer:"Kanye West",
    img:"https://w.namu.la/s/3d07a08af0b3be7afeee94f2972ebc72241d2cc9f6ce06f5dc2cbff51d19f9184c69172d0e776cc70a0de6de927e86a409eb43843a4040657d0c8dcc2a59cdb9f932608fdb59d5cc041c55e0a2ec340f9ce77a9f9f4933e2250b1eedec7fdbfc"
},{
    title:"Circles",
    singer:"Post Malone",
    img:"http://image.yes24.com/goods/79640397/XL"
}]


class Reservation extends React.Component{


    asdf(){
        var searchText= document.querySelector(".search");
        var musicList=document.querySelector(".musicList");
        
        for (let i =0; i< musicInfomation.length ;i++){
            if(musicInfomation[i].singer.indexOf(searchText.value) !== -1){
                var element = document.createElement("li");
                var button = document.createElement("button");
                var img = document.createElement("img");
                var span =document.createElement("span");

                img.src= musicInfomation[i].img;
                button.innerText="reservation";
                span.innerText=`${musicInfomation[i].title} - ${musicInfomation[i].singer}`;

                element.appendChild(img);
                element.appendChild(span);
                element.appendChild(button);
                
                musicList.appendChild(element);
            }   
        }
    }


    render(){
        return(
        <>
        <div className="searchMusic">
            <input className="search" placeholder="Music Search" ></input>
            <button onClick={this.asdf}>Search</button>
            <ul className="musicList"></ul>
        </div>

        <div>

        </div>

        </>
        )
            
        
    }
}

export default Reservation;