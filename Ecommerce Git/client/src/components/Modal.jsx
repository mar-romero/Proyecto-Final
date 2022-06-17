import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;
const ContenedorModal = styled.div`
  width: 500px;
  min-height: 100px;
  background: white;
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;
const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;
const TituloModal = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #4a4a4a;
`;
const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;
  color: #4a4a4a;
  &:hover {
    color: #e8e8e8;
  }
`;
const ContentModal = styled.div`
  color: black;
`;
export const Modal = ({ children, state, changeState }) => {
  return (
    <>
      {state && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <TituloModal>Bola de Nieve</TituloModal>
            </EncabezadoModal>
            <BotonCerrar onClick={()=> changeState(!false)}>
              <CloseIcon />
            </BotonCerrar>
            <ContentModal>{children}</ContentModal>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};
export default Modal;
