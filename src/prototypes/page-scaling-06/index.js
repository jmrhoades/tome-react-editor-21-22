import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Helmet } from "react-helmet";
import { Titlebar } from "./titlebar/Titlebar";
import { Outline } from "./outline/Outline";
import { BottomBar } from "./bottombar/BottomBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Panel } from "./panel/Panel";
import { AnnotationProvider } from "./annotation/AnnotationContext";
import { CursorProvider } from "./cursor/CursorContext";
import { MetricsProvider } from "./metrics/MetricsContext";
import { Cursor } from "./cursor/Cursor";
import { TomeProvider } from "./tome/TomeContext";
import { Page } from "./page/Page";

const TITLE = "Page Scaling 06";

const Wrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;

	/*
	min-width: 768px;
	min-height: 480px;
	overflow: auto;
	*/
`;

export const PageScaling06 = props => {
	
	return (
		<TomeProvider>
			<Wrap id="viewport">
				<MetricsProvider>
				<AnnotationProvider>
					<CursorProvider>
						<Helmet>
							<title>{TITLE}</title>
						</Helmet>
						<BottomBar />
						<Outline />
						<Titlebar title={TITLE} />
						<Panel />
						<Page />
						<Toolbar />
						<Cursor />
					</CursorProvider>
				</AnnotationProvider>
				</MetricsProvider>
			</Wrap>
		</TomeProvider>
	);
};
