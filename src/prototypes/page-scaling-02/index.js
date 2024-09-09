import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { useWindowWidth, useWindowHeight } from "../../utils/dimensions";
import { Helmet } from "react-helmet";
import { TopBar } from "./chrome/TopBar";
import { Outline } from "./chrome/Outline";
import { BottomBar } from "./chrome/BottomBar";
import { ToolBar } from "./toolbar/ToolBar";
import { Page } from "./page/Page";
import { Panel } from "./panel/Panel";
import { motion } from "framer-motion";

const TITLE = "Page Scaling Prototype 02";

const Wrap = styled.div`
	display: flex;
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
	cPanelWidth: 240,
	cPanelRight: 68,
	cPageMarginX: 254,
};

export const toolbarButtons = [
	{
		name: "addTile",
		toolTip: "Add Tile",
		shortcut: "T",
		panelImage: "./images/page-resize-02-addtile-240x567.png",
		panelHeight: 567,
	},
	{
		name: "recordOverlay",
		toolTip: "Record Narration",
		shortcut: "R",
		panelImage: "./images/page-resize-02-record-240x283.png",
		panelHeight: 283,
	},
	{
		name: "comments",
		toolTip: "Comments",
		shortcut: "C",
		panelImage: "./images/page-resize-02-comments-240x374.png",
		panelHeight: 374,
	},
	{
		name: "keyboardShortcuts",
		toolTip: "Keyboard Shortcuts",
		shortcut: "K",
		panelImage: "./images/page-resize-02-shortcuts-240x567.png",
		panelHeight: 567,
	},
];

export const PageScaling02 = props => {
	const windowWidth = useWindowWidth();
	const windowHeight = useWindowHeight();
	const [panelOpen, setPanelOpen] = useState(false);
	const [activePanelName, setActivePanelName] = useState(null);
	const setPanelState = useCallback(
		state => {
			setPanelOpen(state);
		},
		[setPanelOpen]
	);

	return (
		<Wrap>
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
			<TopBar title={TITLE}/>
			<Outline />
			<BottomBar />
			<motion.div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				}}
				onTap={() => {
					setActivePanelName(null);
					setPanelOpen(false);
				}}
			/>
			<Panel panelOpen={panelOpen} panelName={activePanelName} windowHeight={windowHeight} />
			<Page windowWidth={windowWidth} panelOpen={panelOpen} />
			<ToolBar
				panelOpen={panelOpen}
				panelName={activePanelName}
				setPanelState={setPanelState}
				setActivePanelName={setActivePanelName}
			/>
		</Wrap>
	);
};
