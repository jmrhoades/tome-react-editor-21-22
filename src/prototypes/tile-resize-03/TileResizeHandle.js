import React from "react";
import styled from "styled-components";
import {
  motion,
  useSpring,
} from "framer-motion";

import {
  TILE_RESIZE_SPRING,
} from "./index";

export const TileResizeHandle = (props) => {

  const resizeX = useSpring(props.resizeDragOffset, TILE_RESIZE_SPRING);

  return (
    <Handle
      style={{ x: resizeX, opacity: props.opacity}}
      left={props.left}
    >
      <HandleMaterial />
    </Handle>
  );
}

const Handle = styled(motion.div)`
  width: 16px;
  height: 100%;
  position: absolute;
  left: ${(props) => props.left}px;
  background-color: #141414;
  opacity: 0;
  /* background-color: transparent; */
`;

const HandleMaterial = styled(motion.div)`
  position: absolute;
  width: 6px;
  left: calc(50% - 3px);
  top: calc(50% - 32px);
  opacity: 1;
  height: 64px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
`;
