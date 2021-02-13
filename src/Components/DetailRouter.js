import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const TabContainer = styled.div`
  margin-top: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-rows: repeat(1, 30px);
  grid-template-columns: repeat(5, 20%);
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
  :nth-child(2) {
    background-color: ${props => (props.current || props.seasons ? "#24a476" : "transparent")};
  }
`;

const LLink = styled(Link)`
text-decoration: none;
`;

export default withRouter(({ match: { params: {id, seasons_id} }, location: { pathname }}) => {
    if (pathname.substring(0,7) === "/movie/") {
        return (
            <TabContainer>
                <Tab current={pathname === `/movie/${id}/video`}><LLink to={`/movie/${id}/video`}>Relative Video</LLink></Tab>
                <Tab current={pathname === `/movie/${id}/collection`}><LLink to={`/movie/${id}/collection`}>Collections</LLink></Tab>
                <Tab current={pathname === `/movie/${id}/company`}><LLink to={`/movie/${id}/company`}>Production Companies</LLink></Tab>
                <Tab current={pathname === `/movie/${id}/country`}><LLink to={`/movie/${id}/country`}>Production Countries</LLink></Tab>
                <Tab current={pathname === `/movie/${id}/cast`}><LLink to={`/movie/${id}/cast`}>Cast</LLink></Tab>
            </TabContainer>
        );
    } else {
        return (
            <TabContainer>
                <Tab current={pathname === `/show/${id}/video`}><LLink to={`/show/${id}/video`}>Relative Video</LLink></Tab>
                <Tab current={pathname === `/show/${id}/seasons`} seasons={pathname === `/show/${id}/seasons/${seasons_id}`}><LLink to={`/show/${id}/seasons`}>Seasons</LLink></Tab>
                <Tab current={pathname === `/show/${id}/company`}><LLink to={`/show/${id}/company`}>Production Companies</LLink></Tab>
                <Tab current={pathname === `/show/${id}/country`}><LLink to={`/show/${id}/country`}>Production Countries</LLink></Tab>
                <Tab current={pathname === `/show/${id}/cast`}><LLink to={`/show/${id}/cast`}>Cast</LLink></Tab>
            </TabContainer>
        );
    }
});
