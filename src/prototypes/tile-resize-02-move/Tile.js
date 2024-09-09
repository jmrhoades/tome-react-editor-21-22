import React from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
} from "framer-motion";



const DRAG_OFFSET_X_THRESHOLD = 181;
const DRAG_OFFSET_X_MAX = 800;
const DRAG_OFFSET_Y_THRESHOLD = 181;

export const Tile = React.forwardRef((props, ref) => {
  const positionVariants = {
    left: { x: 0, y: 0.1 },
    right: { x: 378, y: 0 },
  };

  const positionTransition = {
    type: "spring",
    stiffness: 500,
    damping: 60,
    mass: 1,
  };

  const hoverRingOpacity = useMotionValue(0);

  const onHoverStart = (event, info) => {
    hoverRingOpacity.set(1);
  };

  const onHoverEnd = (event, info) => {
    hoverRingOpacity.set(0);
  };

  const onDrag = (event, info) => {
    console.log(info.offset.x);
    if (
      props.position === "left" &&
      info.offset.x > DRAG_OFFSET_X_THRESHOLD &&
      Math.abs(info.offset.y) < DRAG_OFFSET_Y_THRESHOLD &&
      Math.abs(info.offset.x) < DRAG_OFFSET_X_MAX
    ) {
      props.onTilePositionUpdate(props.id, props.position);
    } else if (
      props.position === "right" &&
      info.offset.x < -DRAG_OFFSET_X_THRESHOLD &&
      Math.abs(info.offset.y) < DRAG_OFFSET_Y_THRESHOLD &&
      Math.abs(info.offset.x) < DRAG_OFFSET_X_MAX
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
    const c = props.position;
    if (
      props.position === "left" &&
      info.offset.x > DRAG_OFFSET_X_THRESHOLD &&
      Math.abs(info.offset.y) < DRAG_OFFSET_Y_THRESHOLD &&
      Math.abs(info.offset.x) < DRAG_OFFSET_X_MAX
    ) {
      props.setPosition(c === "right" ? "left" : "right");
    } else if (
      props.position === "right" &&
      info.offset.x < -DRAG_OFFSET_X_THRESHOLD &&
      Math.abs(info.offset.y) < DRAG_OFFSET_Y_THRESHOLD &&
      Math.abs(info.offset.x) < DRAG_OFFSET_X_MAX
    ) {
      props.setPosition(c === "right" ? "left" : "right");
    } else {
      props.setPosition("");
      props.setPosition(c); // reset position
    }
  };

  return (
    <Container
      style={{ zIndex: props.z }}
      drag
      dragElastic={0}
      dragMomentum={false}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onMouseDown={props.onMouseDown}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      initial={props.position}
      animate={props.position}
      variants={positionVariants}
      transition={positionTransition}
      ref={ref}
    >
      <HoverRing style={{ opacity: hoverRingOpacity }} />
      <SelectRing style={{ opacity: props.selected }} />
      <Background bg={props.bg} />
      <TileContent></TileContent>
    </Container>
  );
});

const Container = styled(motion.div)`
  position: absolute;
  width: 362px;
  height: 362px;
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
  background-color: ${(props) => props.bg};
`;

const HoverRing = styled(motion.div)`
  position: absolute;
  top: -3px;
  right: -3px;
  bottom: -3px;
  left: -3px;
  background-color: #292929;
  border-radius: 14px;
`;

const SelectRing = styled(HoverRing)`
  background-color: #ed00eb;
`;

const TileContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  overflow: hidden;
`;
