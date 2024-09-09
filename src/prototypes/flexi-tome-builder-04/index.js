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

const TITLE = "Flexi Tome Builder 04";
const GlobalStyle = createGlobalStyle`
	html,body {
  		overscroll-behavior-y: none;
	}
	@font-face {
		font-family: CodeRegular;
		src: url(/fonts/MDIO0.3Trial-Regular.otf);
	}
`;
export const FlexiTomeBuilder04 = props => {
	return (
		<TomeProvider>
			<MetricsProvider
				pageMargin={props.pageMargin ? props.pageMargin : 12}
				gaps={props.gaps ? props.gaps : 12}
				tileCornerRadius={props.tileCornerRadius ? props.tileCornerRadius : 12}
			>
				<Viewport>
					<Helmet>
						<title>{TITLE}</title>
					</Helmet>
					<KeyPress />
					<GlobalStyle />
					<DeselectCatch />

					<Page tileBackgroundColor={props.tileBackgroundColor} pageBackgroundColor={props.pageBackgroundColor} />
					<Panel />
					<Outline />
					<Toolbar />
					<Titlebar title={TITLE} />
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
