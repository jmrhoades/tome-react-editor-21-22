import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

import { publish, subscribe } from "../../utils/pubsub";
import { GlobalStyles } from "../../theme/global-styles";

import { Page } from "./Page";
import { Toast } from "./Toast";

const TITLE = "Tile Resize Prototype 03";

export const PAGE_MARGIN = 16;
export const PAGE_WIDTH = 772;
export const PAGE_HEIGHT = 394;

export const TILE_POSITION_LEFT = 0;
export const TILE_POSITION_RIGHT = 378;
export const TILE_SIZE_HIDDEN = 0;
export const TILE_SIZE_HALF = 362;
export const TILE_SIZE_FULL = 740;

export const TILE_RESIZE_MAX_DRAG = 362;
export const TILE_RESIZE_OFFSET_THRESHOLD = 100;
export const TILE_RESIZE_VELOCITY_THRESHOLD = 150;
export const TILE_RESIZE_SPRING = {
  stiffness: 500,
  damping: 60,
  mass: 1,
};

export const TILE_REPOSITION_THRESHOLD_X_MIN = 181;
export const TILE_REPOSITION_THRESHOLD_X_MAX = 1000;
export const TILE_REPOSITION_THRESHOLD_Y = 1000;
export const TILE_REPOSITION_TRANSITION = {
  type: "spring",
  stiffness: 500,
  damping: 60,
  mass: 1,
};

export const TileResize03 = (props) => {
  const [showUndo, setShowUndo] = useState(false);

  const onUndoDeleteResizedTile = () => {
    publish("undo_delete_resize_tile");
    setShowUndo(false);
  };

  const onTapCatch = (event, info) => {
    publish("deselect");
  };

  React.useEffect(() => {
    const tileDeletedOnResize = subscribe("tile_deleted_on_resize", (data) => {
      console.log("tile_deleted_on_resize");
      setShowUndo(true);
    });
    return tileDeletedOnResize;
  });

  return (
    <Wrap>
      <GlobalStyles />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <TapCatch onTap={onTapCatch} />
      <TopBar>
        <TopBarLeft />
        <TopBarCenter />
        <TopBarRight />
      </TopBar>
      <RightBar>
        <RightBarCenter />
      </RightBar>
      <Outline />
      <BottomBar>
        {/* <BottomBarLeft /> */}
        <BottomBarCenter />
        {/* <BottomBarRight /> */}
      </BottomBar>
      <AnimatePresence>
        {showUndo && (
          <Toast
            onUndoDeleteResizedTile={onUndoDeleteResizedTile}
          />
        )}
      </AnimatePresence>
      <Page />
    </Wrap>
  );
};

const Wrap = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #090909;
`;

const TapCatch = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const TopBar = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 44px;
  top: 0;
  left: 0;
`;

const BottomBar = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0;
  left: 0;
`;

const RightBar = styled(motion.div)`
  position: absolute;
  width: 56px;
  height: 100%;
  top: 0;
  right: 0;
`;

const Outline = styled(motion.div)`
  position: absolute;
  width: 134px;
  height: 192px;
  top: calc(50% - 96px);
  left: 0;
  background-image: url("./images/resize04/outline.png");
  background-size: 134px 192px;
`;

const TopBarLeft = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("./images/resize04/topbar-left.png");
  background-size: 200px 44px;
`;

const TopBarCenter = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 100%;
  top: 0;
  left: calc(50% - 150px);
  background-image: url("./images/resize04/topbar-center.png");
  background-size: 300px 44px;
`;

const TopBarRight = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 100%;
  top: 0;
  right: 0;
  background-image: url("./images/resize04/topbar-right.png");
  background-size: 200px 44px;
`;

const RightBarCenter = styled(motion.div)`
  position: absolute;
  width: 56px;
  height: 400px;
  top: calc(50% - 200px);
  left: 0;
  background-image: url("./images/resize04/rightbar-center.png");
  background-size: 56px 400px;
`;

const BottomBarCenter = styled(motion.div)`
  position: absolute;
  width: 56px;
  height: 100%;
  top: 0;
  left: calc(50% - 28px);
  background-image: url("./images/resize04/bottombar-center2.png");
  background-size: 56px 80px;
`;