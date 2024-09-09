import React from "react";
import styled from "styled-components";
import {
  motion,
} from "framer-motion";
import { Helmet } from "react-helmet";

import { Page } from "./Page";

const TITLE = "Tile Resize Prototype 02 - Move Layout";

export const TileResize02MoveLayout = (props) => {
  return (
    <Wrap>

      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

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
        <BottomBarLeft />
        <BottomBarCenter />
        <BottomBarRight />
      </BottomBar>

      <Page />

    </Wrap>
  );
};

const Wrap = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #000;
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

const BottomBarLeft = styled(motion.div)`
  position: absolute;
  width: 56px;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("./images/resize04/bottombar-left.png");
  background-size: 56px 80px;
`;

const BottomBarCenter = styled(motion.div)`
  position: absolute;
  width: 56px;
  height: 100%;
  top: 0;
  left: calc(50% - 28px);
  background-image: url("./images/resize04/bottombar-center.png");
  background-size: 56px 80px;
`;

const BottomBarRight = styled(motion.div)`
  position: absolute;
  width: 56px;
  height: 100%;
  top: 0;
  right: 0;
  background-image: url("./images/resize04/bottombar-right.png");
  background-size: 56px 80px;
`;
