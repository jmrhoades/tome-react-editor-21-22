import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { clampNumber } from "../../utils/math";
import { subscribe } from "../../utils/pubsub";

import { Tile } from "./Tile";
import { TileImage } from "./TileImage";
import { TileText } from "./TileText";

import {
  PAGE_MARGIN,
  PAGE_WIDTH,
  PAGE_HEIGHT,
  TILE_POSITION_RIGHT,
  TILE_SIZE_FULL,
  TILE_SIZE_HALF,
  TILE_RESIZE_MAX_DRAG,
  TILE_RESIZE_OFFSET_THRESHOLD,
  TILE_RESIZE_VELOCITY_THRESHOLD,
} from "./index";

export const Page = (props) => {
  //
  //
  // Tiles
  //
  //

  const tileMouseDownX = useMotionValue(0);

  const tile1Ref = useRef(null);
  const Tile1Z = useMotionValue(0);
  const Tile1Selected = useMotionValue(0);
  const [tile1Position, setTile1Position] = useState("right");
  const [tile1Size, setTile1Size] = useState(TILE_SIZE_HALF);

  const tile2Ref = useRef(null);
  const Tile2Z = useMotionValue(0);
  const Tile2Selected = useMotionValue(0);
  const [tile2Position, setTile2Position] = useState("left");
  const [tile2Size, setTile2Size] = useState(TILE_SIZE_HALF);

  const [tileMoving, setTileMoving] = useState(false);

  const onTilePositionUpdate = (tile, otherTilePosition) => {
    // console.log(tile, otherTilePosition);
    if (tile === "Tile1") {
      setTile2Position(otherTilePosition);
    }
    if (tile === "Tile2") {
      setTile1Position(otherTilePosition);
    }
  };

  const onTile1MouseDown = (event, info) => {
    tileMouseDownX.set(event.clientX);
    Tile1Z.set(1);
    Tile2Z.set(0);
  };

  const onTile1MouseUp = (event, info) => {
    if (tileMouseDownX.get() === event.clientX) {
      Tile1Selected.set(1);
      Tile2Selected.set(0);
    }
  };

  const onTile2MouseDown = (event, info) => {
    tileMouseDownX.set(event.clientX);
    Tile1Z.set(0);
    Tile2Z.set(1);
  };

  const onTile2MouseUp = (event, info) => {
    if (tileMouseDownX.get() === event.clientX) {
      Tile1Selected.set(0);
      Tile2Selected.set(1);
    }
  };

  // Tile Deselect
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
    subscribe("undo_delete_resize_tile", (data) => {


      if (resizeHandleStartingPosition === "right") {
        resizeDragOffset.set(-TILE_POSITION_RIGHT);
        setResizeHandleLeft(TILE_SIZE_HALF);
        setResizeHandleStartingPosition("center");
      }

      if (resizeHandleStartingPosition === "left") {
        resizeDragOffset.set(TILE_POSITION_RIGHT);
        setResizeHandleLeft(TILE_SIZE_HALF);
        setResizeHandleStartingPosition("center");
      }
    });

    subscribe("tile_deleted_on_resize", (data) => {
      console.log("PAGE tile_deleted_on_resize");
    });
  });

  //
  //
  // Resize Handle
  //
  //

  const [isResizeDragging, setIsResizeDragging] = useState(false);
  const resizeDragOffset = useMotionValue(0);
  const resizeHandleOpacity = useMotionValue(0);
  const [resizeHandleLeft, setResizeHandleLeft] = useState(TILE_SIZE_HALF); // center
  const [
    resizeHandleStartingPosition,
    setResizeHandleStartingPosition,
  ] = useState("center"); // center

  const onHandleHoverStart = (event, info) => {
    document.body.style.cursor = "ew-resize";
    resizeHandleOpacity.set(1);
  };

  const onHandleHoverEnd = (event, info) => {
    if (!isResizeDragging) {
      document.body.style.cursor = "default";
      resizeHandleOpacity.set(0);
    }
  };

  const onHandleDragStart = (event, info) => {
    setIsResizeDragging(true);
  };

  const onHandleDrag = (event, info) => {
    const offset = clampNumber(
      info.offset.x,
      -TILE_RESIZE_MAX_DRAG,
      TILE_RESIZE_MAX_DRAG
    );
    resizeDragOffset.set(offset);
  };

  const onHandleDragEnd = (event, info) => {
    const offset = clampNumber(
      info.offset.x,
      -TILE_RESIZE_MAX_DRAG,
      TILE_RESIZE_MAX_DRAG
    );
    const velocity = info.velocity.x;
    console.log(
      "onHandleDragEnd",
      offset,
      velocity,
      resizeHandleStartingPosition
    );
    setIsResizeDragging(false);
    document.body.style.cursor = "default";
    resizeHandleOpacity.set(0);

    if (resizeHandleStartingPosition === "center") {
      if (
        offset < -TILE_RESIZE_OFFSET_THRESHOLD ||
        velocity < -TILE_RESIZE_VELOCITY_THRESHOLD
      ) {
        resizeDragOffset.set(-TILE_POSITION_RIGHT);
        setResizeHandleLeft(-PAGE_MARGIN);
        setResizeHandleStartingPosition("left");
      } else if (
        offset > TILE_RESIZE_OFFSET_THRESHOLD ||
        velocity > TILE_RESIZE_VELOCITY_THRESHOLD
      ) {
        resizeDragOffset.set(TILE_POSITION_RIGHT);
        setResizeHandleLeft(TILE_SIZE_FULL);
        setResizeHandleStartingPosition("right");
      } else {
        resizeDragOffset.set(0);
      }
    }

    if (resizeHandleStartingPosition === "right") {
      if (
        offset < -TILE_RESIZE_OFFSET_THRESHOLD ||
        velocity < -TILE_RESIZE_VELOCITY_THRESHOLD
      ) {
        resizeDragOffset.set(-TILE_POSITION_RIGHT);
        setResizeHandleLeft(TILE_SIZE_HALF);
        setResizeHandleStartingPosition("center");
      } else {
        resizeDragOffset.set(0);
      }
    }

    if (resizeHandleStartingPosition === "left") {
      if (
        offset > TILE_RESIZE_OFFSET_THRESHOLD ||
        velocity > TILE_RESIZE_VELOCITY_THRESHOLD
      ) {
        resizeDragOffset.set(TILE_POSITION_RIGHT);
        setResizeHandleLeft(TILE_SIZE_HALF);
        setResizeHandleStartingPosition("center");
      } else {
        resizeDragOffset.set(0);
      }
    }
  };

  return (
    <Container width={PAGE_WIDTH} height={PAGE_HEIGHT}>
      <Margin margin={PAGE_MARGIN}>
        {/* <TileResizeHandle
          resizeDragOffset={resizeDragOffset}
          opacity={resizeHandleOpacity}
          left={resizeHandleLeft}
        /> */}

        <Tile
          ref={tile1Ref}
          key="Tile1"
          id="Tile1"
          position={tile1Position}
          size={tile1Size}
          setSize={setTile1Size}
          resizeHandleStartingPosition={resizeHandleStartingPosition}
          setPosition={setTile1Position}
          z={Tile1Z}
          onTilePositionUpdate={onTilePositionUpdate}
          selected={Tile1Selected}
          onMouseDown={onTile1MouseDown}
          onMouseUp={onTile1MouseUp}
          resizeDragOffset={resizeDragOffset}
          isResizeDragging={isResizeDragging}
          tileMoving={tileMoving}
          setTileMoving={setTileMoving}
          bg={"#1ABCFE"}
        >
          <TileText />
        </Tile>

        <Tile
          ref={tile2Ref}
          key="Tile2"
          id="Tile2"
          position={tile2Position}
          size={tile2Size}
          setSize={setTile2Size}
          resizeHandleStartingPosition={resizeHandleStartingPosition}
          setPosition={setTile2Position}
          z={Tile2Z}
          onTilePositionUpdate={onTilePositionUpdate}
          selected={Tile2Selected}
          onMouseDown={onTile2MouseDown}
          onMouseUp={onTile2MouseUp}
          resizeDragOffset={resizeDragOffset}
          isResizeDragging={isResizeDragging}
          tileMoving={tileMoving}
          setTileMoving={setTileMoving}
          bg={"#0ACF83"}
        >
          <TileImage
            image={"./images/resize04/LiamWong_KabukichoNights_Tokyo_sm.jpg"}
          />
        </Tile>

        <ResizeDragControl
          width={PAGE_MARGIN}
          style={{ left: resizeHandleLeft }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onHoverStart={onHandleHoverStart}
          onHoverEnd={onHandleHoverEnd}
          // onMouseDown={onHandleDragStart}
          onDragStart={onHandleDragStart}
          onDrag={onHandleDrag}
          onDragEnd={onHandleDragEnd}
        />
      </Margin>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 28px;
  background-color: #141414;
  position: relative;
`;

const Margin = styled(motion.div)`
  position: absolute;
  top: ${(props) => props.margin}px;
  bottom: ${(props) => props.margin}px;
  left: ${(props) => props.margin}px;
  right: ${(props) => props.margin}px;
`;

const ResizeDragControl = styled(motion.div)`
  width: ${(props) => props.width}px;
  height: 100%;
  position: absolute;
  background-color: red;
  opacity: 0;
`;
