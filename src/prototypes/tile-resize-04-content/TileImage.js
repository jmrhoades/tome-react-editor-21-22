import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const TileImage = (props) => {
  return <Container image={props.image}></Container>;
};

const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;
