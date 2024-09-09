import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Toast = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const showTransition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 1,
  };

  const hideTransition = {
    type: "spring",
    duration: 0.5,
    delay: 0.1,
  };

  const hoverShowTransition = {
    type: "spring",
    duration: 0.2,
  };

  const hoverHideTransition = {
    type: "spring",
    duration: 0.9,
  };

  return (
    <ToastWrap
      key="undo"
      initial={{ opacity: 0, y: 30, scale: 1 }}
      animate={{ opacity: 1, y: 0, transition: showTransition }}
      exit={{ opacity: 0, transition: hideTransition }}
    >
      <ToastContent
        onTap={props.onUndoDeleteResizedTile}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        onMouseDown={() => setIsDown(true)}
        onMouseUp={() => setIsDown(false)}
        animate={{ scale: isDown ? 0.96 : 1 }}
      >
        <Message>Tile deleted</Message>
        <Action>
          <ActionBG
            animate={{
              opacity: isHovering ? 1 : 0,
              transition: isHovering
                ? hoverShowTransition
                : hoverHideTransition,
            }}
            initial={{ opacity: 0 }}
          />
          <ActionLabel>Undo</ActionLabel>
        </Action>
      </ToastContent>
    </ToastWrap>
  );
};

const ToastWrap = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 56px;
  bottom: 0px;
  left: calc(50% - 150px);
  text-align: center;
`;

const ToastContent = styled(motion.div)`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 6px 6px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  background: #1f1f1f;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
`;

const Message = styled(motion.div)`
  padding: 0 14px 0 6px;
`;

const Action = styled(motion.div)`
  position: relative;
`;

const ActionBG = styled(motion.div)`
  background: #40193f;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

const ActionLabel = styled(motion.div)`
  color: #ed00eb;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 8px;
  font-weight: 500;
`;
