import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

const Loader = () => <Container><span role="img" aria-label="Loading">⏰</span></Container>;

export default Loader;
