import React from "react";

import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { Viewport } from "./viewport/Viewport";
import { Page } from "./page/Page";
import { TomeProvider } from "./tome/TomeContext";
import { MetricsProvider } from "./tome/MetricsContext";
import { Toolbar } from "./toolbar/Toolbar";
import { Panel } from "./panel/Panel";
import { Titlebar } from "./titlebar/Titlebar";
import { Outline } from "./outline/Outline";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";
import { AutoScrollRegionBottom } from "./controls/AutoScrollRegionBottom";
import { ContextMenu } from "./controls/ContextMenu";

const TITLE = "Cut, Copy, Paste v3";
const GlobalStyle = createGlobalStyle`
	html,body {
		height: auto;
		min-height: 100vh;
		background-color: black;
	}
	#root {
		height: auto;
		min-height: 100vh;
		background-color: black;
	}
`;

export const CutCopyPaste03 = props => {
	
	// Prevent Safari from showing the text cursor when dragging shit
	// https://stackoverflow.com/questions/47295211/safari-wrong-cursor-when-dragging
	document.onselectstart = function(){ return false; }

	/*
	const windowWidth = useMotionValue(800)
	const windowRange = [490, 1344, 2000]
	const marginRange = [144, 192, 256]
	const margin = useTransform(windowWidth, windowRange, marginRange)
	console.log(margin.get());
	*/

	return (
		<TomeProvider>
			<MetricsProvider>
				<Viewport>
					<Helmet>
						<title>{TITLE}</title>
					</Helmet>
					<KeyPress />
					<GlobalStyle />
					<DeselectCatch />

					
					<Panel />
					<Outline />
					<Toolbar />
					<Page />
					<Titlebar title={TITLE} />
					<AutoScrollRegionBottom />
					<ContextMenu />
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
