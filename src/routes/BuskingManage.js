import React from "react";
import styled from "styled-components";
import Lyrics from "../Components/Lyrics"
const Container = styled.div`
    color:white;
`;

//공연관리에서 필요한것들 

//목표는 한페이지 모든 정보를 다 볼 수 있도록 만드는것이 목표

/*필요한 정보 => 
    신청곡[]=> (누가 예약했는지 보이며) 예/ 아니요 버튼으로 선정 가능
    노래 정보[]
    노래 가사[]
    + 공연 순서 정하기[] 할 수 있으면
*/

class BuskingMange extends React.Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <Container>
                <div>신청곡[]</div>
                <div>노래 정보[]</div>
                <div>노래 가사[]</div>
                <div>공연 순서 정하기[]</div>

            </Container>
        )
    }
}

export default BuskingMange;