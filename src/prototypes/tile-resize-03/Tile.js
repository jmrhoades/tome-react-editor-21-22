import React, { useState } from "react";
import styled from "styled-components";
import {
  motion,
  useTransform,
  useMotionValue,
  useSpring,
  useAnimation,
} from "framer-motion";
import { publish } from "../../utils/pubsub";

import {
  TILE_POSITION_LEFT,
  TILE_POSITION_RIGHT,
  TILE_SIZE_HALF,
  TILE_SIZE_FULL,
  TILE_REPOSITION_THRESHOLD_X_MIN,
  TILE_REPOSITION_THRESHOLD_X_MAX,
  TILE_REPOSITION_THRESHOLD_Y,
  TILE_REPOSITION_TRANSITION,
  TILE_RESIZE_SPRING,
} from "./index";

export const Tile = React.forwardRef((props, ref) => {
  // const [tileSize, setTileSize] = useState(TILE_SIZE_HALF);
  const [isDragging, setIsDragging] = useState(false);

  const repositionDragConstraints = {
    top: 0,
    bottom: 0,
    left: props.position === "left" ? TILE_POSITION_LEFT : TILE_POSITION_RIGHT,
    right: props.position === "left" ? TILE_POSITION_LEFT : TILE_POSITION_RIGHT,
  };

  // Resize/position transforms
  // Based on resizeDragOffset
  const resizeAnimation = useAnimation();

  const p = props.position;
  const o = props.resizeDragOffset;
  const h = props.resizeHandleStartingPosition;

  // Resize: width

  // Left tile, Center Handle (Half size)
  let dragOffsetRange = [-TILE_POSITION_RIGHT, TILE_POSITION_RIGHT];
  let resizeWidthRange = [0, TILE_SIZE_FULL];

  // Left tile, Full Size
  if (p === "left" && h === "right") {
    dragOffsetRange = [-TILE_POSITION_RIGHT, 0];
    resizeWidthRange = [TILE_SIZE_HALF, TILE_SIZE_FULL];
  }

  if (p === "left" && h === "left") {
    dragOffsetRange = [0, TILE_POSITION_RIGHT];
    resizeWidthRange = [0, TILE_SIZE_HALF];
  }

  if (p === "right" && h === "center") {
    dragOffsetRange = [-TILE_POSITION_RIGHT, TILE_POSITION_RIGHT];
    resizeWidthRange = [TILE_SIZE_FULL, 0];
  }

  if (p === "right" && h === "right") {
    dragOffsetRange = [-TILE_POSITION_RIGHT, 0];
    resizeWidthRange = [TILE_SIZE_HALF, 0];
  }

  if (p === "right" && h === "left") {
    dragOffsetRange = [0, TILE_POSITION_RIGHT];
    resizeWidthRange = [TILE_SIZE_FULL, TILE_SIZE_HALF];
  }
  const resizeWLinear = useTransform(o, dragOffsetRange, resizeWidthRange);
  const resizeW = useSpring(resizeWLinear, {
    stiffness: 500,
    damping: 60,
    mass: 1,
    onComplete: (v) => {
      const w = resizeW.get();
      if (w < 1) {
        // props.resizeDragOffset.set(0);
        //props.setSize(TILE_SIZE_HIDDEN);
        publish("tile_deleted_on_resize");
      } else if (w === TILE_SIZE_HALF) {
        //props.setSize(TILE_SIZE_HALF);
      } else if (w === TILE_SIZE_FULL) {
        //props.setSize(TILE_SIZE_FULL);
      }
      console.log("stopped moving", w, props.position, props.size);
    },
  });

  // Resize: change position (if on the right)
  dragOffsetRange = [0, 0];
  let resizeXRange = [0, 0];

  if (p === "right" && h === "center") {
    resizeXRange = [-TILE_POSITION_RIGHT, TILE_SIZE_FULL];
    dragOffsetRange = [-TILE_POSITION_RIGHT, TILE_SIZE_FULL];
  }
  if (p === "right" && h === "left") {
    resizeXRange = [-TILE_POSITION_RIGHT, 0];
    dragOffsetRange = [0, TILE_POSITION_RIGHT];
  }
  if (p === "right" && h === "right") {
    resizeXRange = [0, TILE_POSITION_RIGHT];
    dragOffsetRange = [-TILE_POSITION_RIGHT, 0];
  }
  const resizeXLinear = useTransform(o, dragOffsetRange, resizeXRange);
  const resizeX = useSpring(resizeXLinear, TILE_RESIZE_SPRING);

  // Resize: fade out/in
  let resizeOpacityRange;

  if (p === "left" && h === "center") {
    dragOffsetRange = [-TILE_POSITION_RIGHT + 150, 0];
    resizeOpacityRange = [0, 1];
  }

  if (p === "left" && h === "left") {
    dragOffsetRange = [0, TILE_POSITION_RIGHT];
    resizeOpacityRange = [0, 1];
  }

  if (p === "left" && h === "right") {
    dragOffsetRange = [-TILE_POSITION_RIGHT, 0];
    resizeOpacityRange = [1, 1];
  }

  if (p === "right" && h === "left") {
    dragOffsetRange = [0, TILE_POSITION_RIGHT - 150];
    resizeOpacityRange = [1, 1];
  }

  if (p === "right" && h === "center") {
    dragOffsetRange = [0, TILE_POSITION_RIGHT - 150];
    resizeOpacityRange = [1, 0];
  }

  if (p === "right" && h === "right") {
    dragOffsetRange = [-TILE_POSITION_RIGHT, 0];
    resizeOpacityRange = [1, 0];
  }

  const resizeOpacityLinear = useTransform(
    o,
    dragOffsetRange,
    resizeOpacityRange
  );
  const resizeOpacity = useSpring(resizeOpacityLinear, TILE_RESIZE_SPRING);

  const positionVariants = {
    left: {
      x: TILE_POSITION_LEFT,
    },
    right: {
      x: TILE_POSITION_RIGHT,
    },
  };

  const shadowVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
  };

  const hoverRingOpacity = useMotionValue(0);

  const onHoverStart = (event, info) => {
    hoverRingOpacity.set(1);
  };

  const onHoverEnd = (event, info) => {
    hoverRingOpacity.set(0);
  };

  const onDragStart = (event, info) => {
    setIsDragging(true);
    props.setTileMoving(true);
    hoverRingOpacity.set(0);
  };

  const onDrag = (event, info) => {
    if (
      props.position === "left" &&
      info.offset.x > TILE_REPOSITION_THRESHOLD_X_MIN &&
      Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
      Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
    ) {
      props.onTilePositionUpdate(props.id, props.position);
    } else if (
      props.position === "right" &&
      info.offset.x < -TILE_REPOSITION_THRESHOLD_X_MIN &&
      Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
      Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
    ) {
      props.onTilePositionUpdate(props.id, props.position);
    } else {
      props.onTilePositionUpdate(
        props.id,
        props.position === "right" ? "left" : "right"
      );
    }
  };

  const onDragEnd = (event, info) => {
    // console.log("onDragEnd", info.offset.x);
    setIsDragging(false);
    props.setTileMoving(false);
    const c = props.position;
    if (
      props.position === "left" &&
      info.offset.x > TILE_REPOSITION_THRESHOLD_X_MIN &&
      Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
      Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
    ) {
      props.setPosition(c === "right" ? "left" : "right");
    } else if (
      props.position === "right" &&
      info.offset.x < -TILE_REPOSITION_THRESHOLD_X_MIN &&
      Math.abs(info.offset.y) < TILE_REPOSITION_THRESHOLD_Y &&
      Math.abs(info.offset.x) < TILE_REPOSITION_THRESHOLD_X_MAX
    ) {
      props.setPosition(c === "right" ? "left" : "right");
    } else {
      props.setPosition("");
      props.setPosition(c); // reset position
    }
  };

  return (
    <DragContainer
      w={TILE_SIZE_HALF}
      h={TILE_SIZE_HALF}
      style={{
        zIndex: props.z,
      }}
      drag
      dragConstraints={repositionDragConstraints}
      dragElastic={0.5}
      dragMomentum={false}
      onHoverStart={
        isDragging || props.isResizeDragging || props.tileMoving
          ? null
          : onHoverStart
      }
      onHoverEnd={
        isDragging || props.isResizeDragging || props.tileMoving
          ? null
          : onHoverEnd
      }
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      initial={props.position}
      animate={props.position}
      variants={positionVariants}
      transition={TILE_REPOSITION_TRANSITION}
      ref={ref}
    >
      <ResizeContainer
        style={{
          x: resizeX,
          opacity: resizeOpacity,
          width: resizeW,
        }}
        animate={resizeAnimation}
      >
        <Shadow
          variants={shadowVariants}
          initial={"hide"}
          animate={isDragging ? "show" : "hide"}
        />
        <HoverRing style={{ opacity: hoverRingOpacity }} />
        <SelectRing style={{ opacity: props.selected }} />
        <Background bg={props.bg} />
        <SizeContainer>
          <TileContent minWidth={TILE_SIZE_HALF}>{props.children}</TileContent>
        </SizeContainer>
      </ResizeContainer>
    </DragContainer>
  );
});

const DragContainer = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  top: 0;
  left: 0;
`;

const Background = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  background-color: #141414;
  /* background-color: ${(props) => props.bg}; */
`;

const Shadow = styled(Background)`
  background-color: transparent;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
`;

const HoverRing = styled(motion.div)`
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  background-color: #292929;
  border-radius: 13px;
`;

const SelectRing = styled(HoverRing)`
  background-color: #ed00eb;
`;

const ResizeContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const SizeContainer = styled(motion.div)`
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const TileContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: ${(props) => props.minWidth}px;
  top: 0;
  left: 0;
`;
