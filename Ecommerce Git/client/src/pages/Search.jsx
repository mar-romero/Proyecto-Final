import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import SearchProducts from "../components/SearchProducts";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footers";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-transform:uppercase;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Search = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[3];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Resultado de la busqueda: </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Ordenar Productos:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="asc">Precio (asc)</Option>
            <Option value="desc">Precio (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <SearchProducts cat={cat} filter={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Search;