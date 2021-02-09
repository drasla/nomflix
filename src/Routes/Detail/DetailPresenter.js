import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import DetailRouter from "../../Components/DetailRouter";
import {Route, Switch} from "react-router-dom";
import DetailCountryContainer from "../DetailCountry";
import DetailCompanyContainer from "../DetailCompany";
import DetailCollectionContainer from "../DetailCollection";
import DetailVideoContainer from "../DetailVideo";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 720px;
  border-radius: 5px;
  margin-right: 30px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const TitleContainer = styled.div`
    display: flex;
  justify-content: flex-start;
`;

const Title = styled.h3`
  font-size: 32px;
  display: block;
`;

const Item = styled.span`

`;
const ItemContainer = styled.div`
  width: 100%;
margin: 20px 0px;
`;

const Divider = styled.span`
margin: 0 10px;
`;

const Overview = styled.p`
font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
`;

const Imdbs = styled.div`
  margin-left: 20px;
  width: 70px;
  height: 32px;
  color: black;
  background-color: yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ALink = styled.a`

`;

const DetailPresenter = ({result, loading, error}) => (
    loading ? <Loader/> :
        <Container>
            <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}/>
            <Content>
                <Cover
                    bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noPosterSmall.png".default)}/>
                <Data>
                    <TitleContainer>
                    <Title>{result.original_title ? result.original_title : result.original_name} </Title>
                    <Imdbs><ALink href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDB</ALink></Imdbs>
                    </TitleContainer>
                    <ItemContainer>
                        <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                        <Divider>|</Divider>
                        <Item>{result.runtime ? result.runtime : result.episode_run_time && result.episode_run_time[0]} min</Item>
                        <Divider>|</Divider>
                        <Item>{result.genres && result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} /`)}</Item>
                        <Divider>|</Divider>
                        <Item>🌟 {result.vote_average}/10</Item>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                    <DetailRouter />
                    <Switch>
                        <Route exact path={`/movie/:id/video`} component={DetailVideoContainer} />
                        <Route exact path={`/movie/:id/collection`} component={DetailCollectionContainer} />
                        <Route exact path={`/movie/:id/company`} component={DetailCompanyContainer} />
                        <Route exact path={`/movie/:id/country`} component={DetailCountryContainer} />
                    </Switch>
                </Data>
            </Content>
            {error && <Message text={error} color="#e74c3c"/>}
        </Container>
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailPresenter;
