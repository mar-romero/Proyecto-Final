import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 380px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 100%;
  z-index: 2;
`;

const Icon = styled.div`
  text-decoration: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.3);
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link style={{ textDecoration: "none" ,color:"black"}} to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <ShoppingCartOutlinedIcon onClick={handleClick} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
