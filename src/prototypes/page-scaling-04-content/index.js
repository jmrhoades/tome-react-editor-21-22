import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { useWindowSize } from "../../utils/dimensions";
import { Helmet } from "react-helmet";
import { TopBar } from "./topbar/TopBar";
import { Outline } from "./outline/Outline";
import { BottomBar } from "./bottombar/BottomBar";
import { ToolBar } from "./toolbar/ToolBar";
import { Page } from "./page/Page";
import { Panel } from "./panel/Panel";


const TITLE = "Page Scaling Prototype 04 - Content";

const Wrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: #090909;
	overflow-x: hidden;
	width: 100%;
`;

export const metrics = {
	cViewportWidth: 1280,
	cPageWidth: 772,
	cPageHeight: 394,
	cPageRadius: 24,
	cTileHeight: 362,
	cTileRadius: 12,
	cTileMargin: 16,
	cPanelWidth: 240,
	cPanelRight: 68,
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

export const defaultLayoutTransition = {
	duration: 0.45,
	ease: [0.4, 0, 0.1, 1],
};

export const PageScaling04Content = props => {
	const windowSize = useWindowSize();
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
			<TopBar title={TITLE} />
			<Panel panelOpen={panelOpen} panelName={activePanelName} windowSize={windowSize} />
			<Page windowSize={windowSize} panelOpen={panelOpen} />
			<ToolBar
				panelOpen={panelOpen}
				panelName={activePanelName}
				setPanelState={setPanelState}
				setActivePanelName={setActivePanelName}
			/>
		</Wrap>
	);
};
