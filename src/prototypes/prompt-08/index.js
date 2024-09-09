import React from "react";

import { Viewport } from "./viewport/Viewport";
import { Page } from "./page/Page";
import { ClipboardProvider } from "./tome/ClipboardContext";
import { TomeProvider } from "./tome/TomeContext";
import { MetricsProvider } from "./tome/MetricsContext";
import { Toolbar } from "./bars/Toolbar";
import { Panels } from "./panel/Panels";
import { Titlebar } from "./bars/Titlebar";
import { Outline } from "./outline/Outline";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";
//import { AutoScrollRegionBottom } from "./controls/AutoScrollRegionBottom";
import { ContextMenu } from "./menu/ContextMenu";
import { TomeMenu } from "./menu/TomeMenu";
import { Bottombar } from "./bars/Bottombar";
import { Prompt } from "./prompt/Prompt";
//import { TileWidthIndicator } from "./page/TileWidthIndicator";

export const Prompt08 = props => {
	return (
		<TomeProvider>
			<MetricsProvider>
				<ClipboardProvider>
					<Viewport>
						<KeyPress />

						<DeselectCatch />

						<Page />
						<Toolbar />
						
						<Bottombar />
						<Titlebar />
						<Panels />

						{/* <TileWidthIndicator /> */}
						{/* <AutoScrollRegionBottom /> */}
						
						<TomeMenu />
						<ContextMenu />
						<Prompt />
						<Outline />
					</Viewport>
				</ClipboardProvider>
			</MetricsProvider>
		</TomeProvider>
	);
};
