import styled from "styled-components";
/*import { popularProducts } from "../data";*/
import Product from "./Product";
/*import { mobile } from "../responsive";*/
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  h1 {  
    text-align: center;
    font-size: 30px;
    margin-left: 44%;
  }

`;

const SearchProducts = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/search/${cat}`
            : "http://localhost:5000/api/products"
        );

        setProducts(res.data);
      } catch (err) {
        console.log("error");
      }
    };
    getProducts();
  }, [cat]);
  
/*
  useEffect(() => {
    
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
*/

  return (
    <Container>
      {products.length > 0 ? (
        products.map((item) => {
        return <Product item={item} key={item.id} />;
      })
    ) :(  
        <h1>Producto no encontrado</h1>
      )}
    </Container>
  );
};

export default SearchProducts;
