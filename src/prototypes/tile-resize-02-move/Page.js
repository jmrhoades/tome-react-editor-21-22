import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Tile } from "./Tile";

export const Page = (props) => {
  const tile1Ref = useRef(null);
  const Tile1Z = useMotionValue(0);
  const Tile1Selected = useMotionValue(0);
  const [tile1Position, setTile1Position] = useState("left");

  const tile2Ref = useRef(null);
  const Tile2Z = useMotionValue(0);
  const Tile2Selected = useMotionValue(0);
  const [tile2Position, setTile2Position] = useState("right");

  const onTilePositionUpdate = (tile, otherTilePosition) => {
    console.log(tile, otherTilePosition);

    if (tile === "Tile1") {
      setTile2Position(otherTilePosition);
    }
    if (tile === "Tile2") {
      setTile1Position(otherTilePosition);
    }
  };

  const onTile1MouseDown = (event, info) => {
    Tile1Z.set(1);
    Tile1Selected.set(1);

    Tile2Z.set(0);
    Tile2Selected.set(0);
  };

  const onTile2MouseDown = (event, info) => {
    Tile1Z.set(0);
    Tile1Selected.set(0);

    Tile2Z.set(1);
    Tile2Selected.set(1);
  };

  /*
    Tile Deselect
  */

  const deselectTiles = () => {
    Tile1Selected.set(0);
    Tile2Selected.set(0);
  };

  React.useEffect(() => {
    document.documentElement.addEventListener("mousedown", (e) => {
      if (
        tile1Ref.current &&
        !tile1Ref.current.contains(e.target) &&
        tile2Ref.current &&
        !tile2Ref.current.contains(e.target)
      ) {
        deselectTiles();
      }
    });
  }, );

  return (
    <Container>
      <Margin>
        <Tile
          ref={tile1Ref}
          key="Tile1"
          id="Tile1"
          position={tile1Position}
          setPosition={setTile1Position}
          z={Tile1Z}
          onTilePositionUpdate={onTilePositionUpdate}
          selected={Tile1Selected}
          onMouseDown={onTile1MouseDown}
          bg={"#1ABCFE"}
        />
        <Tile
          ref={tile2Ref}
          key="Tile2"
          id="Tile2"
          position={tile2Position}
          setPosition={setTile2Position}
          z={Tile2Z}
          onTilePositionUpdate={onTilePositionUpdate}
          selected={Tile2Selected}
          onMouseDown={onTile2MouseDown}
          bg={"#0ACF83"}
        />
      </Margin>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 772px;
  height: 394px;
  border-radius: 28px;
  background-color: #141414;
  position: relative;
`;

const Margin = styled(motion.div)`
  position: absolute;
  top: 16px;
  bottom: 16px;
  left: 16px;
  right: 16px;
`;
