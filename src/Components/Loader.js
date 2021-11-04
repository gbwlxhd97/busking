import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const Loader = () => {
  return (
    <Flex>
      <ScaleLoader height="15" width="5" radius="2" margin="2" color="red" />
    </Flex>
  );
};

export default Loader;
