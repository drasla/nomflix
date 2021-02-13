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
  display: grid;
  width: 100%;
  grid-template-rows: repeat(auto-fill, 100px);
  grid-template-columns: repeat(4, 25%);
  grid-auto-rows: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
`;

const List = styled.div`
text-align: center;
`;

const Flag = styled.img``;

const ContryDiv = styled.div``;


export const DetailCountry = (props) => {
    const {
        location: { pathname },
        match: {
            params: { id }
        },
        history: { push }
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
                const { data: result } = await moviesApi.movieDetail(parsedId);
                setResult(result);
            } else {
                const { data: result } = await tvApi.showDetail(parsedId);
                setResult(result);
            }
            setLoading(false);
        } catch (e) {
            setError(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        loading ? <Loader/> :
            <Container>
                <Content>
                    {result && result.production_countries && result.production_countries.length > 0 && (
                        <ItemContainer>
                            {result.production_countries.map(production_country =>
                                <List key={production_country.iso_3166_1}>
                                    <Flag src={`https://www.countryflags.io/${production_country.iso_3166_1}/flat/64.png`} />
                                    <ContryDiv>{production_country.iso_3166_1}</ContryDiv>
                                </List>)}
                        </ItemContainer>
                    )}
                </Content>
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    );
}