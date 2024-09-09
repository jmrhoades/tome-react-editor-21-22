import React from "react";



import { Viewport } from "./viewport/Viewport";
import { Page } from "./page/Page";
import { ClipboardProvider } from "./tome/ClipboardContext";
import { TomeProvider } from "./tome/TomeContext";
import { MetricsProvider } from "./tome/MetricsContext";
import { Toolbar } from "./bars/Toolbar";
import { Panel } from "./panel/Panel";
import { Titlebar } from "./bars/Titlebar";
import { Outline } from "./outline/Outline";
import { KeyPress } from "./controls/KeyPress";
import { DeselectCatch } from "./controls/DeselectCatch";
//import { AutoScrollRegionBottom } from "./controls/AutoScrollRegionBottom";
import { ContextMenu } from "./controls/ContextMenu";
import { Bottombar } from "./bars/Bottombar";
//import { TileWidthIndicator } from "./page/TileWidthIndicator";




export const VarWidth01 = props => {
	// Prevent Safari from showing the text cursor when dragging shit
	// https://stackoverflow.com/questions/47295211/safari-wrong-cursor-when-dragging
	// document.onselectstart = function () {
	// 	return false;
	// };

	return (
		<TomeProvider>
			<MetricsProvider>
				<ClipboardProvider>
					<Viewport>
						
						<KeyPress />
						
						<DeselectCatch />

						
						<Outline />
						<Toolbar />
						<Page />
						<Bottombar />
						<Titlebar />
						<Panel />

						
						{/* <TileWidthIndicator /> */}
						{/* <AutoScrollRegionBottom /> */}
						<ContextMenu />
					</Viewport>
				</ClipboardProvider>
			</MetricsProvider>
		</TomeProvider>
	);
};
