import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { publish } from "../../utils/pubsub";

export const Toast = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const timer = useRef(null);
  const WAIT_TO_DISMISS_TIME = 5000;

  const showTransition = {
    type: "spring",
    stiffness: 600,
    damping: 35,
    mass: 1,
    delay: 0.7,
    opacity: {ease: "easeOut", delay: 0.7, duration: 0.3}
  };

  const hideTransition = {
    type: "spring",
    stiffness: 600,
    damping: 50,
    mass: 1,
    opacity: {ease: "easeOut", delay: 0.1, duration: 0.3}
  };

  const hoverShowTransition = {
    duration: 0.1,
    ease: "easeOut",
  };

  const hoverHideTransition = {
    duration: 0.4,
    ease: "easeOut",
  };

  const toastContentVariants = {
    pressing: { opacity: 0.7, transition:{duration:0.2} },
    normal: { opacity: 1 },
  };

  React.useEffect(() => {
    timer.current = setTimeout(() => publish("dismiss_undo"), WAIT_TO_DISMISS_TIME);
    return () => clearTimeout(timer.current);
  }, []);


  return (
    <ToastWrap
      key="undo"
      initial={{ opacity: 0, y: 0, scale: 0.2 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: showTransition }}
      exit={{ opacity: 0, scale: 0.7, transition: hideTransition }}
      onHoverStart={()=>{if(timer.current){clearTimeout(timer.current)}}}
      onHoverEnd={()=>{timer.current = setTimeout(() => publish("dismiss_undo"), WAIT_TO_DISMISS_TIME)}}
    >
      <ToastContent
        animate={isPressed ? "pressing" : "normal"}
        variants={toastContentVariants}
      >
        <Message
          onMouseDown={()=> setIsPressed(true)}
          onTap={()=> publish("dismiss_undo")}
        >Tile deleted</Message>
        <Action
          onTap={props.onUndoDeleteResizedTile}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          onMouseDown={() => setIsDown(true)}
          onMouseUp={() => setIsDown(false)}
          animate={{ scale: isDown ? 0.95 : 1 }}
        >
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
  height: 40px;
  bottom: 44px;
  left: calc(50% - 150px);
  text-align: center;
`;

const ToastContent = styled(motion.div)`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  background: #1f1f1f;
  color: rgba(255, 255, 255, 0.4);
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
