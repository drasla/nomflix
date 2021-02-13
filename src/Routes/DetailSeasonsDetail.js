import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {moviesApi, tvApi} from "../api";

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

const SeasonPoster = styled.img`
  width: 100%;
  height: 150px;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;


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

    console.log(props.match)

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
    }, []);

    console.log(result);
    return (
        loading ? <Loader/> :
            <Container>
                <Content>
                    {result && Object.keys(result).length > 0 && (
                        <ItemContainer>
                            <List key={result.id}>
                                <SeasonPoster
                                    bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noPosterSmall.png".default)}/>
                                {result.id}
                            </List>
                        </ItemContainer>
                    )}
                </Content>
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    );
}