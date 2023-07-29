import React from "react";
import Button from "react-bootstrap/Button";
import { CSSTransition } from "react-transition-group";
import React from 'react'
import './styles.css'

const CustomButton = ({ name }) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
    >
      <Button>{name}</Button>
    </CSSTransition>
  );
};

export default CustomButton;