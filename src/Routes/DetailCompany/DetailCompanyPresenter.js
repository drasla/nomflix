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

const DetailCompanyPresenter = ({result, loading, error}) => (
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

DetailCompanyPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailCompanyPresenter;
