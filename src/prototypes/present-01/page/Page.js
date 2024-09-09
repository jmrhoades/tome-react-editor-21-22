import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
	const cPageWidth = metrics.cPageWidth;
	const cPageHeight = metrics.cPageHeight;

	// Ratios
	const w = props.windowSize.width;
	const h = props.windowSize.height;
	const lRatio = cPageWidth / cPageHeight;
	const pRatio = cPageHeight / cPageWidth;
	const minMarginRightWithPanelOpen = metrics.cPanelRight + metrics.cPanelWidth + 32;

	// Margins
	let marginX = Math.round(254 * (w / metrics.cViewportWidth));
	const minMarginLeftWithOutlineOpen = 144;
	// if (marginX < minMarginLeftWithOutlineOpen) marginX = minMarginLeftWithOutlineOpen;
	// console.log(marginX);
	if (props.editorState === "presenting") {
		marginX = 128;
	}
	const marginY = 100;

	// Metrics
	const isPortrait = w < h;
	const pageHeightRatio = isPortrait ? lRatio : pRatio;
	let pWidth = Math.round(w - marginX * 2);
	let pHeight = Math.round(pWidth * pRatio);
	let pMarginLeft = 0;

	if (pHeight > h - marginY * 2) {
		pHeight = h - marginY * 2;
		pWidth = Math.round(lRatio * pHeight);
	}
	if (isPortrait) {
		pHeight = Math.round(h - marginY * 2);
		pWidth = Math.round(pHeight * pRatio);
	}

	if (props.panelOpen && props.editorState !== "presenting") {
		if (minMarginRightWithPanelOpen > marginX) {
			// pMarginLeft = (marginX - minMarginRightWithPanelOpen);
			pMarginLeft = -172;
		}
		if (w < metrics.cViewportWidth) {
			const maxPWidth = w - minMarginRightWithPanelOpen - minMarginLeftWithOutlineOpen;
			if (maxPWidth < pWidth) {
				pWidth = maxPWidth;
				pHeight = Math.round(pWidth * pageHeightRatio);
			}
		}
	}

	const scale = isPortrait ? pHeight / cPageWidth : pWidth / cPageWidth;
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
			onMouseEnter={() => props.setPageIsHovered(true)}
			onMouseLeave={() => props.setPageIsHovered(false)}
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
