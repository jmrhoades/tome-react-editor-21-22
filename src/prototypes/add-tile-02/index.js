import React from "react";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { Viewport } from "./Viewport";
import { Page } from "./Page";
import { Tile } from "./Tile";
import { TomeProvider } from "./TomeContext";
import { MetricsProvider } from "./MetricsContext";
import { Toolbar } from "./Toolbar";
import { Panel } from "./Panel";
import { TextTile } from "./TextTile";
import { AddTileDropIndicator } from "./AddTileDropIndicator";

const TITLE = "Add Tile 02";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
   overflow: hidden;
  }
`;

export const AddTile02 = props => {
	return (
		<TomeProvider>
			<MetricsProvider>
				<Helmet>
					<title>{TITLE}</title>
				</Helmet>
				<GlobalStyle />
				<Viewport>
                <Panel />
					<Page />
					<Tile id={"tile_01"} size={"wide"} order={1}>
						<TextTile />
					</Tile>
					<AddTileDropIndicator />
					<Toolbar />
					
				</Viewport>
			</MetricsProvider>
		</TomeProvider>
	);
};
