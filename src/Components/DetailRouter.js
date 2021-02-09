import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const TabContainer = styled.div`
  margin-top: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-rows: repeat(1, 30px);
  grid-template-columns: repeat(5, 25%);
`;

const Tab = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: ${props => (props.current ? "#24a476" : "white")};
  background-color: ${props => (props.current ? "#24a476" : "transparent")};
  color: white;
  transition: all .5s ease-in-out;
  &:hover{
    background-color: white;
    color: black;
  }
`;

const LLink = styled(Link)`
text-decoration: none;
`;

export default withRouter(({ match: { params: {id} }, location: { pathname }}) => (
    <TabContainer>
        <Tab current={pathname === `/movie/${id}/video`}><LLink to={`/movie/${id}/video`}>Relative Video</LLink></Tab>
        <Tab current={pathname === `/movie/${id}/collection`}><LLink to={`/movie/${id}/collection`}>Collections</LLink></Tab>
        <Tab current={pathname === `/movie/${id}/company`}><LLink to={`/movie/${id}/company`}>Production Companies</LLink></Tab>
        <Tab current={pathname === `/movie/${id}/country`}><LLink to={`/movie/${id}/country`}>Production Countries</LLink></Tab>
    </TabContainer>
));
