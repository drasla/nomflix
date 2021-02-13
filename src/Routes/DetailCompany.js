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
  display: grid;
  width: 100%;
  grid-template-rows: repeat(auto-fill, 180px);
  grid-template-columns: repeat(4, 25%);
  grid-auto-rows: 180px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Flag = styled.img`
width: 100px;
height: auto;
`;

const ContryDiv = styled.div`
margin-top: 20px;
`;

export const DetailCompany = (props) => {
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
                    {result && result.production_companies && result.production_companies.length > 0 && (
                        <ItemContainer>
                            {result.production_companies.map(production_company =>
                                <List key={production_company.id}>
                                    {production_company.logo_path ? (<Flag src={`https://image.tmdb.org/t/p/w300${production_company.logo_path}`} />) : ""}
                                    <ContryDiv>{production_company.name}</ContryDiv>
                                </List>)}
                        </ItemContainer>
                    )}
                </Content>
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    );
}