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

const TITLE = "Flexi Tome Builder 06";
const GlobalStyle = createGlobalStyle`
	html,body {
  		overscroll-behavior-y: none;
		
	}
	@font-face {
		font-family: CodeRegular;
		src: url(/fonts/MDIO0.3Trial-Regular.otf);
	}
`;
export const FlexiTomeBuilder06 = props => {
	
	// Prevent Safari from showing the text cursor when dragging shit
	// https://stackoverflow.com/questions/47295211/safari-wrong-cursor-when-dragging
	document.onselectstart = function(){ return false; }

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
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
