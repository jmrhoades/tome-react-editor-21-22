import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { useWindowSize } from "../../utils/dimensions";
import { Helmet } from "react-helmet";
import { Titlebar } from "./titlebar/Titlebar";
import { Outline } from "./outline/Outline";
import { BottomBar } from "./bottombar/BottomBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Panel } from "./panel/Panel";
import { AnnotationProvider } from "./annotation/AnnotationContext";
import { CursorProvider } from "./cursor/CursorContext";
import { Cursor } from "./cursor/Cursor";
import { TomeProvider } from "./tome/TomeContext";
import { TempPage } from "./page/TempPage";

const TITLE = "Page Scaling 05";

const Wrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	min-width: 768px;
	overflow-x: auto;
	min-height: 480px;
	overflow-y: auto;
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
	cPanelRight: 64,
};

export const defaultLayoutTransition = {
	duration: 0.45,
	ease: [0.4, 0, 0.1, 1],
};

export const defaultLayoutSpring = {
	type: "spring",
	stiffness: 550,
	damping: 30,
};

export const PageScaling05 = props => {
	/*
	Window Size, Mouse Position, Page Height
	*/
	const windowSize = useWindowSize();

	/* 
	Outline junk
	*/
	const [selectedOutlinePage, setSOutlinePage] = useState("");
	const setSelectedOutlinePage = useCallback(
		state => {
			setSOutlinePage(state);
		},
		[setSOutlinePage]
	);

	return (
		<TomeProvider>
			<Wrap id="viewport">
				<AnnotationProvider>
					<CursorProvider>
						<Helmet>
							<title>{TITLE}</title>
						</Helmet>
						<BottomBar />
						<Outline
							windowSize={windowSize}
							selectedOutlinePage={selectedOutlinePage}
							setSelectedOutlinePage={setSelectedOutlinePage}
						/>
						<Titlebar title={TITLE} />
						<TempPage />
						<Panel />
						<Toolbar />
						<Cursor />
					</CursorProvider>
				</AnnotationProvider>
			</Wrap>
		</TomeProvider>
	);
};
