import React, { useState } from "react";
import styled from "styled-components";
import {
  motion,
} from "framer-motion";

export const Page = (props) => {

  const [tileDirection, setTileDirection] = useState("row");
  const [tilesFlipped, setTilesFlipped] = useState(false);
  const [tile1Z, setTile1Z] = useState(0);
  const [tile2Z, setTile2Z] = useState(0);

  const onDragStart = (event, info) => {
    setTilesFlipped(false);
  }

  const onDrag = (event, info) => {
    console.log(info.offset.x);
    if (Math.abs(info.offset.x) > 150 && !tilesFlipped) {
      console.log("flip it!")
      setTileDirection(tileDirection === "row" ? "row-reverse" : "row");
      setTilesFlipped(true);
    } else if (Math.abs(info.offset.x) < 150 && tilesFlipped) {
      setTileDirection(tileDirection === "row" ? "row-reverse" : "row");
      setTilesFlipped(false);
    }
  }

  return (
    <Container direction={tileDirection} layout>
      <Tile
        layout
        key="Tile1"
        bg={"#1ABCFE"}
        drag
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        dragElastic={0.75}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onMouseDown={() => setTile1Z(1)}
        onMouseUp={() => setTile1Z(0)}
        style={{zIndex: tile1Z}}
      />
      <Tile
        layout
        key="Tile2"
        bg={"#0ACF83"}
        drag
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        dragElastic={0.75}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onMouseDown={() => setTile2Z(1)}
        onMouseUp={() => setTile2Z(0)}
        style={{zIndex: tile2Z}}
      />
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 772px;
  height: 394px;
  border-radius: 28px;
  background-color: #141414;
  position: relative;
  /* padding: 16px; */
  display: flex;
  /* justify-content: space-between; */
  flex-direction: ${(props) => props.direction};
`;

const Tile = styled(motion.div)`
  width: 362px;
  height: 362px;
  border-radius: 12px;
  background-color: ${(props) => props.bg};
  opacity: 1.00;
`;
