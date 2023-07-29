import React from "react";
import Button from "react-bootstrap/Button";
import 'react-transition-group/dist/react-transition-group.css';

const CustomButton = ({ name }) => {
  return <Button>{name}</Button>;
};


export default CustomButton;