import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {tvApi} from "../api";
import {Link, Route, Switch} from "react-router-dom";
import {DetailSeasonsDetail} from "./DetailSeasonsDetail";

const Container = styled.div`
  position: relative;
  padding: 20px 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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

const SeasonContainer = styled.div``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.current ? "#24a476" : "transparent")};
  transition: all .5s ease-in-out;
  text-align: center;
  height: 100%;
  &:hover{
    background-color: white;
  }
`;

const Flag = styled.img`
  width: 80%;
  max-width: 100px;
  height: auto;
`;

const ContryDiv = styled.div`
margin-top: 20px;
`;

const SLink = styled(Link)`
    text-align: center;
`;

export const DetailSeasons = (props) => {
    const {
        location: { pathname },
        match: {
            params: { id, seasons_id },
            path
        },

        history: { push }
    } = props;

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }

        try {
                const { data: result } = await tvApi.showDetail(parsedId);
                setResult(result);
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
                    {result && result.seasons && result.seasons.length > 0 && (
                        <ItemContainer>
                            {result.seasons.map(season =>
                                <SeasonContainer key={season.index}>
                                    <List key={season.id}>
                                        <Link to={`/show/${id}/seasons/${season.season_number}`} replace={true}>
                                            {season.poster_path ? (
                                                <Flag
                                                    src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}/>) : ""}
                                            <ContryDiv>{season.name}</ContryDiv>
                                        </Link>
                                    </List>
                                </SeasonContainer>
                            )}
                        </ItemContainer>
                    )}
                    <Switch>
                        <Route exact path={`/show/:id/seasons/:season_number`} component={DetailSeasonsDetail} replace />
                    </Switch>
                </Content>
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    )
};