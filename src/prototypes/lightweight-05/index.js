import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Helmet } from "react-helmet";
import { Titlebar } from "./titlebar/Titlebar";
import { BottomBar } from "./bottombar/BottomBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Panel } from "./panel/Panel";
import { AnnotationProvider } from "./annotation/AnnotationContext";
import { CursorProvider } from "./cursor/CursorContext";
import { MetricsProvider } from "./metrics/MetricsContext";
import { Cursor } from "./cursor/Cursor";
import { TomeProvider } from "./tome/TomeContext";
import { Pages } from "./page/Pages";
import { ConfettiWrapper } from "./controls/Confetti";
import { UIWrapper } from "./controls/UIWrapper";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";
import { Comments } from "./controls/Comments";

const TITLE = "Lightweight Idea Sharing 05";

const Wrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	background-color: #090909;
`;

export const Lightweight05 = props => {
	return (
		<TomeProvider>
			<Wrap id="viewport">
				<MetricsProvider>
					<AnnotationProvider>
						<CursorProvider>
							<Helmet>
								<title>{TITLE}</title>
							</Helmet>
							<KeyPress />
							<DeselectCatch />

							<Pages />
							
							<UIWrapper>
								<BottomBar />
								<Titlebar title={TITLE} />
								<Toolbar />
							</UIWrapper>

							<Panel />
							<Comments />

							<Cursor />
							<ConfettiWrapper />
						</CursorProvider>
					</AnnotationProvider>
				</MetricsProvider>
			</Wrap>
		</TomeProvider>
	);
};
