import React from "react";
import styled from "styled-components";

import { useWindowWidth } from "../../utils/dimensions";
import { Helmet } from "react-helmet";
import { TopBar } from "./TopBar";
import { Outline } from "./Outline";
import { BottomBar } from "./BottomBar";
import { ToolBar } from "./toolbar/ToolBar";
import { Page } from "./page/Page";

const TITLE = "Page Scaling Prototype 01";

const Wrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: #090909;
`;

export const metrics = {
	cViewportWidth: 1280,
	cPageRadius: 24,
	cTileHeight: 362,
	cTileRadius: 12,
	cTileMargin: 16,
}

export const PageScaling01 = props => {
    const windowWidth = useWindowWidth();
	return (
		<Wrap>
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
            <TopBar />
            <Outline />
            <BottomBar />
            <ToolBar />
			<Page windowWidth={windowWidth}/>
		</Wrap>
	);
};
