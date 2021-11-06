import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: auto;
  height: 20px;
  margin-left:110px;
`;

export default class extends React.Component {
  state = {
    teamName: "",
  };
  sendTeamName = (event) => {
    this.setState({
      teamName: event.target.value,
    });
  };
  render() {
    return (
      <form onChange={this.sendTeamName}>
        <Input placeholder="팀 이름을 적어주세요." />
      </form>
    );
  }
}
