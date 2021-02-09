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

const DetailContryPresenter = ({result, loading, error}) => (
    loading ? <Loader/> :
        <Container>
            <Content>
                {result && result.production_countries && result.production_countries.length > 0 && (
                    <ItemContainer key={result.production_countries.index}>
                        {result.production_countries.map(production_country =>
                            <List key={production_country.index}>
                                <Flag src={`https://www.countryflags.io/${production_country.iso_3166_1}/flat/64.png`} />
                                <ContryDiv key={production_country.iso_3166_1}>{production_country.iso_3166_1}</ContryDiv>
                            </List>)}
                    </ItemContainer>
                )}
            </Content>
            {error && <Message text={error} color="#e74c3c"/>}
        </Container>
);

DetailContryPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailContryPresenter;
