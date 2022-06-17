import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { logoutProduct } from "../redux/cartRedux";
import { useState } from "react";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SeachContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 10px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 35px;
  ${mobile({ fontSize: "24px", marginLeft: "20px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-left: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 14px;
  margin-left: 15px;
  background-color: white;
  border: none;
`;
const Navbar = () => {

  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    dispatch(logoutProduct({}));
  };
  const [inputs, setInputs] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 
  return (
    <Container>
      <Wrapper>
        <Left>
          {" "}
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <Logo>Bola de Nieve</Logo>
          </Link>
          <SeachContainer>
            <Input placeholder="Buscar" name="title" onChange={handleChange} />
            {" "}<Link to ={`../products/search/${inputs.title}`}>

            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </Link>{" "}
          </SeachContainer>
        </Left>
        <Center>
        </Center>
        <Right>
          <Link
            to="/products/all"
            style={{ textDecoration: "none", color: "black" }}
          >
            {" "}
            <MenuItem>Productos</MenuItem>
          </Link>
          {user ? null : (
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              <MenuItem>Registro</MenuItem>
            </Link>
          )}

          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </MenuItem>
          </Link>
          {user ? (
            <Button onClick={(e) => handleLogout(e)}>Cerrar Sesion</Button>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Ingresar</MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
