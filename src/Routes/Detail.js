import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import DetailRouter from "../Components/DetailRouter";
import {Route, Switch} from "react-router-dom";
import {DetailCountry} from "./DetailCountry";
import {DetailCompany} from "./DetailCompany";
import {DetailCollection} from "./DetailCollection";
import {DetailVideo} from "./DetailVideo";
import {DetailCast} from "./DetailCast";
import {moviesApi, tvApi} from "../api";
import {DetailSeasons} from "./DetailSeasons";

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
  height: calc(100vh - 150px);
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

export const Detail = (props) => {
    const {
        location: {pathname},
        match: {
            params: {id}
        },
        history: {push}
    } = props;

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMovie = pathname.includes("/movie/");

    const getData = async () => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }

        try {
            if (isMovie) {
                const {data: result} = await moviesApi.movieDetail(parsedId);
                setResult(result);
            } else {
                const {data: result} = await tvApi.showDetail(parsedId);
                setResult(result);
            }
            setLoading(false);
        } catch {
            setError({error: "Can't find anything."});
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        loading ? <Loader/> :
            <Container>
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}/>
                <Content>
                    <Cover
                        bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noPosterSmall.png".default)}/>
                    <Data>
                        <TitleContainer>
                            <Title>{result.original_title ? result.original_title : result.original_name} </Title>
                            {result.original_title ?
                                <Imdbs><ALink href={`https://www.imdb.com/title/${result.imdb_id}`}
                                              target="_blank">IMDB</ALink></Imdbs> : ""}
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
                        <DetailRouter/>
                        <Switch>
                            <Route exact path={`/movie/:id/video`} component={DetailVideo}/>
                            <Route exact path={`/movie/:id/collection`} component={DetailCollection}/>
                            <Route exact path={`/movie/:id/company`} component={DetailCompany}/>
                            <Route exact path={`/movie/:id/country`} component={DetailCountry}/>
                            <Route exact path={`/movie/:id/cast`} component={DetailCast}/>
                            <Route exact path={`/show/:id/video`} component={DetailVideo}/>
                            <Route path={`/show/:id/seasons`} component={DetailSeasons}/>
                            <Route exact path={`/show/:id/company`} component={DetailCompany}/>
                            <Route exact path={`/show/:id/country`} component={DetailCountry}/>
                            <Route exact path={`/show/:id/cast`} component={DetailCast}/>
                        </Switch>
                    </Data>
                </Content>
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    );
};