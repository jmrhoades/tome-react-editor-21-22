import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const TileText = (props) => {
  return (
    <Container>
      <TextTileH1>KABUKICHO NIGHTS</TextTileH1>
      <TextTileP>Kabukicho is a famous entertainment district best known for its nightlife. Small clubs, smoky pubs, and late-night snack bars are crammed into lantern-lit alleys in Golden Gai.</TextTileP>
      <TextTileP>Robot Restaurant hosts kitschy sci-fi dinner shows, while rock bands play at Marz and Ashibe Hall. Daytime visitors can dress up in warrior armor at the Samurai Museum and learn sneaky feudal combat tactics at the Ninja Trick House.</TextTileP>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 16px;
`;

const TextTileH1 = styled(motion.div)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 21px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const TextTileP = styled(motion.div)`
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 16px;
`;
