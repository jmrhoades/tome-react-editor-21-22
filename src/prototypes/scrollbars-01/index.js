import React from "react";
import { useTransform, useMotionValue } from "framer-motion";

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

const TITLE = "Scrollbars 01";
const GlobalStyle = createGlobalStyle`
	html,body,#root {
  		// overscroll-behavior-y: none;
		// overflow-x: hidden;
		/* height: auto; */
		height: 100vh;
		background-color: black;
		/* overflow: hidden; */
	}

	.CustomScrollerTrack {
  position: absolute;
  top: 0;
  right: 3px;
  cursor: default;
  user-select: none;
  width: 6px;
  min-height: 30px;
  max-height: 100%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  opacity: 1;
  transition: opacity 0.25s ease-in;
  z-index: 1;
}

`;

export const Scrollbars01 = props => {
	// Prevent Safari from showing the text cursor when dragging shit
	// https://stackoverflow.com/questions/47295211/safari-wrong-cursor-when-dragging
	document.onselectstart = function () {
		return false;
	};

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
					{/* <AutoScrollRegionBottom /> */}
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
