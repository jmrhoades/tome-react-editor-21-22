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

const TITLE = "Flexi Tome Builder 05 — Gapless";
const GlobalStyle = createGlobalStyle`
	html,body {
  		overscroll-behavior-y: none;
	}
	@font-face {
		font-family: CodeRegular;
		src: url(/fonts/MDIO0.3Trial-Regular.otf);
	}
`;
export const FlexiTomeBuilder05Gapless = props => {
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

					<Page />
					<Panel />
					<Outline />
					<Toolbar />
					<Titlebar title={TITLE} />
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
