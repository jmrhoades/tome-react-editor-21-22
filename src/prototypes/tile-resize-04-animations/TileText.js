import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TILE_SIZE_HALF, TILE_SIZE_FULL } from "./index";

const frameFullVariant = {
  half: {
    opacity: 0,
  },
  full: {
    opacity: 1,
  },
};

const frameHalfVariant = {
  half: {
    opacity: 1,
  },
  full: {
    opacity: 0,
  },
};

export const TileText = (props) => {
  const [isHalf, setIsHalf] = React.useState("half");

  React.useEffect(
    () =>
      props.resizeW.onChange((latest) => {
        const w = latest;
          if (w <= TILE_SIZE_HALF + 100) {
            setIsHalf("half");
          } else {
            setIsHalf("full")
          }
        
      })
  );

  return (
    <Wrap>
      <Container
        w={TILE_SIZE_HALF}
        variants={frameHalfVariant}
        initial={"half"}
        animate={isHalf}
        transition={{duration: 0.3}}
      >
        <TextTileH1>KABUKICHO NIGHTS</TextTileH1>
        <TextTileP>
          Kabukicho is a famous entertainment district best known for its
          nightlife. Small clubs, smoky pubs, and late-night snack bars are
          crammed into lantern-lit alleys in Golden Gai.
        </TextTileP>
        <TextTileP>
          Robot Restaurant hosts kitschy sci-fi dinner shows, while rock bands
          play at Marz and Ashibe Hall. Daytime visitors can dress up in warrior
          armor at the Samurai Museum and learn sneaky feudal combat tactics at
          the Ninja Trick House.
        </TextTileP>
      </Container>
      <Container
        w={TILE_SIZE_FULL}
        variants={frameFullVariant}
        initial={"half"}
        animate={isHalf}
        transition={{duration: 0.3}}
      >
        <TextTileH1>KABUKICHO NIGHTS</TextTileH1>
        <TextTileP>
          Kabukicho is a famous entertainment district best known for its
          nightlife. Small clubs, smoky pubs, and late-night snack bars are
          crammed into lantern-lit alleys in Golden Gai.
        </TextTileP>
        <TextTileP>
          Robot Restaurant hosts kitschy sci-fi dinner shows, while rock bands
          play at Marz and Ashibe Hall. Daytime visitors can dress up in warrior
          armor at the Samurai Museum and learn sneaky feudal combat tactics at
          the Ninja Trick House.
        </TextTileP>
      </Container>
    </Wrap>
  );
};

const Wrap = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 16px;
`;

const Container = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.w}px;
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
