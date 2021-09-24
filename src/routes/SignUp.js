import React from "react";

class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: "",
        }
    }

    handleId = (event) => {
        const {target : {value}} = event
        this.setState({
            id: event.target.value,
        })
    }
    
    render() {
        const {id} = this.state;
        return(
            <div>
                회원가입
                <form>
                    <input placeholder="ID를 입력해주세요"
                    value={id}
                    onChange={this.handleId}
                    />
                </form>
            </div>
        )
    }
}

export default Signup;