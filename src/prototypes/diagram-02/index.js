import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

import { Helmet } from "react-helmet";
import { Titlebar } from "./titlebar/Titlebar";
import { BottomBar } from "./bottombar/BottomBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Panel } from "./panel/Panel";
import { AnnotationProvider } from "./annotation/AnnotationContext";
import { CursorProvider } from "./cursor/CursorContext";
import { colors, MetricsProvider } from "./metrics/MetricsContext";
import { Cursor } from "./cursor/Cursor";
import { TomeProvider } from "./tome/TomeContext";
import { DiagramPage } from "./tome/DiagramPage";
import { DiagramProvider } from "./diagram/DiagramContext";
import { Pages } from "./page/Pages";
import { UIWrapper } from "./controls/UIWrapper";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";
import { Comments } from "./controls/Comments";
import { DiagramTileToolbar } from "./diagram/DiagramTileToolbar";
import { DiagramObjectProperties } from "./diagram/DiagramObjectProperties";

const TITLE = "Diagram Tile Demo 02";

const Wrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
   overflow: hidden;
  }

@font-face {
	font-family: TestRegular;
	src: url(/fonts/test-soehne-buch.woff2);
	// src: url(/fonts/MessinaSansWebTrial-Book.woff2);
}

@font-face {
	font-family: TestBold;
	font-weight: bold;
	src: url(/fonts/test-soehne-dreiviertelfett.woff2);
	// src: url(/fonts/MessinaSansWebTrial-Bold.woff2);
	
}

`;

export const Diagram02 = props => {
	return (
		<TomeProvider initialPageData={DiagramPage}>
			<GlobalStyle />

			<Wrap
				id="viewport"
				style={{
					backgroundColor: colors.z0,
				}}
			>
				<MetricsProvider>
					<AnnotationProvider>
						<DiagramProvider>
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

								<DiagramTileToolbar />
								<DiagramObjectProperties />
								<Panel />
								<Comments />

								<Cursor />
							</CursorProvider>
						</DiagramProvider>
					</AnnotationProvider>
				</MetricsProvider>
			</Wrap>
		</TomeProvider>
	);
};
