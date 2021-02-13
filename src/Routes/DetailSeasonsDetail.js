import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {tvApi} from "../api";

const Container = styled.div`
  position: relative;
  padding: 20px 0px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
  height: 100%;
`;

const ItemContainer = styled.div`
  padding: 20px 0px;
  width: 100%;
  color: black;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SeasonPoster = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const SeasonTitle = styled.h2`
  display: block;
  margin-left: 50px;
  font-size: 30px;
  font-weight: 800;
`;

const EpisodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EpisodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  margin-bottom: 10px;
`;

const EpisodeDivide = styled.div`
  width: 100%;
display: flex;
justify-content: space-between;
  
`;

const EpisodeNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 70px;
  text-align: center;
`;

const EpisodeAirDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 70px;
  text-align: center;
`;
const EpisodeName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 70px;
  text-align: center;
`;

const EpisodeOverview = styled.div``;

const EpisodeStill = styled.div`
width: 300px;
height: auto;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;`;


const iFrame = (src) => {
    return (
        <iframe src={src} />
    );
}

export const DetailSeasonsDetail = (props) => {
    const {
        location: { pathname },
        match: {
            params: { id, season_number }
        },
        history: { push }
    } = props;

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        const parsedId = parseInt(id);
        const parsedSeasonNumber = parseInt(season_number);
        if (isNaN(parsedId) || isNaN(parsedSeasonNumber)) {
            return push("/");
        }

        try {
            const {data: result} = await tvApi.season(parsedId, parsedSeasonNumber);
            setResult(result);
            setLoading(false);
        } catch (e) {
            setError(e);
        }
    }

    useEffect(() => {
        getData();
    }, [id, season_number]);

    return (
        loading ? <Loader/> :
            <Container>
                <Content>
                    {result && Object.keys(result).length > 0 && (
                        <ItemContainer>
                            <List key={result.id}>
                                <SeasonPoster
                                    bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noPosterSmall.png".default)}>
                                    <SeasonTitle>{result.name}</SeasonTitle>
                                </SeasonPoster>
                                {result && result.episodes && result.episodes.length > 0 && (
                                    <EpisodesContainer key={result.episodes.index}>
                                        {result.episodes.map(episode =>
                                            <EpisodeContainer key={episode.id}>
                                                <EpisodeDivide>
                                                    <EpisodeNumber key={episode.episode_number}>
                                                        Episode {episode.episode_number}
                                                    </EpisodeNumber>
                                                    <EpisodeAirDate>
                                                        Air Date<br/>{episode.air_date}
                                                    </EpisodeAirDate>
                                                    <EpisodeName>
                                                        Episode Name<br />{episode.name}
                                                    </EpisodeName>
                                                    <EpisodeStill
                                                        bgImage={episode.still_path ? `https://image.tmdb.org/t/p/original/${episode.still_path}` : require("../../assets/noPosterSmall.png".default)}></EpisodeStill>
                                                </EpisodeDivide>
                                                <EpisodeDivide>
                                                    <EpisodeOverview>
                                                        {episode.overview}
                                                    </EpisodeOverview>
                                                </EpisodeDivide>
                                            </EpisodeContainer>)}
                                    </EpisodesContainer>
                                )}
                            </List>
                        </ItemContainer>
                    )}
                </Content>
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    );
}