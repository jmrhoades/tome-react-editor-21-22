import React from "react";
import styled from "styled-components";
import { motion, transform } from "framer-motion";

import { metrics, defaultLayoutTransition } from "../index";
import { TextTile } from "../tile/TextTile";
import { ImageTile } from "../tile/ImageTile";

const PageWrap = styled(motion.div)`
	background-color: #121212;
	position: relative;
	display: flex;
	justify-content: space-between;
`;

const Tile = styled(motion.div)`
	background-color: #121212;
	position: relative;
	overflow: hidden;
`;

export const Page = props => {
	const w = props.windowSize.width;
	const h = props.windowSize.height;
	const lRatio = metrics.cPageWidth / metrics.cPageHeight;
	const pRatio = metrics.cPageHeight / metrics.cPageWidth;
	const marginX = Math.round(transform(w, [640, 1280, 1920], [148, 254, 512]));
	//const marginX = Math.round(254 * (w/metrics.cViewportWidth));
	const marginY = 80;
	const minMarginRightWithPanelOpen = metrics.cPanelRight + metrics.cPanelWidth + 32;
	const minMarginLeftWithPanelOpen = 144;
	const isPortrait = w / h <= 0.75;
	const pageHeightRatio = isPortrait ? lRatio : pRatio;
	let pWidth = Math.round(w - marginX * 2);
	let pHeight = Math.round(pWidth * pageHeightRatio);
	let pMarginLeft = 0;
	if (pHeight > h - marginY * 2) {
		pHeight = h - marginY * 2;
		pWidth = Math.round(lRatio * pHeight);
	}
	if (props.panelOpen) {
		if (minMarginRightWithPanelOpen > marginX) {
			// pMarginLeft = (marginX - minMarginRightWithPanelOpen);
			pMarginLeft = -172;
		}
		if (w < metrics.cViewportWidth) {
			const maxPWidth = w - minMarginRightWithPanelOpen - minMarginLeftWithPanelOpen;
			pWidth = maxPWidth;
			pHeight = Math.round(pWidth * pageHeightRatio);
		}
	}

	const scale = isPortrait ? pHeight / metrics.cPageWidth : pWidth / metrics.cPageWidth;
	const pRadius = Math.round(metrics.cPageRadius * scale);
	const pPadding = Math.round(metrics.cTileMargin * scale);
	const tRadius = Math.round(metrics.cTileRadius * scale);
	const tHeight = Math.round(((isPortrait ? pHeight : pWidth) - pPadding * 3) / 2);

	return (

			<PageWrap
				style={{
					width: pWidth,
					height: pHeight,
					borderRadius: pRadius,
					padding: pPadding,
					marginLeft: pMarginLeft,
					flexDirection: isPortrait ? "column" : "row",
				}}
				layout
				transition={defaultLayoutTransition}
			>
				<Tile
					style={{
						width: tHeight,
						height: tHeight,
						borderRadius: tRadius,
						padding: pPadding,
					}}
					layout
					transition={defaultLayoutTransition}
				>
					<TextTile
						windowWidth={w}
						scale={scale}
						tileSize={tHeight}
						tileRadius={tRadius}
						tilePadding={pPadding}
						pageWidth={pWidth}
						pagePadding={pPadding}
						pageRadius={pRadius}
					/>
				</Tile>
				<Tile
					style={{
						width: tHeight,
						height: tHeight,
						borderRadius: tRadius,
						padding: pPadding,
					}}
					layout
					transition={defaultLayoutTransition}
				>
					<ImageTile image="./images/ds-image-tile-mountains.jpg" />
				</Tile>
			</PageWrap>
		
	);
};
