import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

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

const DetailCollectionPresenter = ({result, loading, error}) => (
    loading ? <Loader/> :
        <Container>
            <Content>
                {result && result.belongs_to_collection && Object.keys(result.belongs_to_collection).length > 0 && (
                    <ItemContainer>
                        {[result.belongs_to_collection].map(collection =>
                            <List key={collection.id}>
                                {collection.poster_path ? (<Flag src={`https://image.tmdb.org/t/p/w300${collection.poster_path}`} />) : ""}
                                <ContryDiv>{collection.name}</ContryDiv>
                            </List>)}
                    </ItemContainer>
                )}
            </Content>
            {error && <Message text={error} color="#e74c3c"/>}
        </Container>
);

DetailCollectionPresenter.propTypes = {
    result: PropTypes.objectOf(
        PropTypes.shape({
            belongs_to_collection: PropTypes.objectOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    poster_path: PropTypes.string,
                    name: PropTypes.string
                })
            ),
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailCollectionPresenter;
