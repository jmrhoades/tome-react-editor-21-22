import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Tile } from "../tile/Tile";
import { TextTile } from "../tile/TextTile";
import { ImageTile } from "../tile/ImageTile";
import { metrics } from "../index";

const TilesWrap = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: ${props => props.padding}px;
	border-radius: ${props => props.pageRadius}px;
	background-color: rgba(20, 20, 20, 1);
`;

const pageMoveTransition = {
	type: "spring",
	stiffness: 700,
	damping: 40,
	mass: 1,
};

export const Page = props => {
	let windowWidth = props.windowWidth < 1920 ? props.windowWidth : 1920;
	// windowWidth = props.panelOpen ?  (windowWidth-184) :  windowWidth;

	const scale = windowWidth / metrics.cViewportWidth;
	const pWidth = windowWidth - (metrics.cPageMarginX * 2);
	const pPadding = Math.floor(metrics.cTileMargin * scale);
	const pRadius = Math.floor(metrics.cPageRadius * scale);
	const pX = (props.windowWidth - pWidth) / 2;
	const pOffsetX = props.panelOpen ? -90 : 0;
	const tRadius = Math.floor(metrics.cTileRadius * scale);
	const tHeight = Math.floor((pWidth - pPadding*3)/2);
	const tWidth = tHeight;

	const pScale = props.panelOpen ? ((pWidth-160) / pWidth) : 1;
	
	/*
	const pPadding = Math.floor(metrics.cTileMargin * scale);
	const pRadius = Math.floor(metrics.cPageRadius * scale);
	const pX = (props.windowWidth - pWidth) / 2;
	const pOffsetX = props.panelOpen ? -90 : 0;
	const tRadius = Math.floor(metrics.cTileRadius * scale);
	const tHeight = Math.floor(metrics.cTileHeight * scale);
	const tWidth = tHeight;
	const pWidth = pPadding * 3 + tWidth * 2;
	console.log(pageX)
	*/

	return (
		<TilesWrap
			padding={pPadding}
			pageRadius={pRadius}
			style={{
				width: pWidth,
			}}
			animate={{
				x: pX + pOffsetX,
				scale: pScale,
			}}
			transition={pageMoveTransition}
			initial={false}
			layout
		>
			<Tile scale={scale} tileWidth={tWidth} tileHeight={tHeight} tileRadius={tRadius}>
				<TextTile
					scale={scale}
					windowWidth={windowWidth}
					tileWidth={tWidth}
					tileHeight={tHeight}
					tileRadius={tRadius}
					pageWidth={pWidth}
					pagePadding={pPadding}
					pageRadius={pRadius}
				/>
			</Tile>
			<Tile scale={scale} tileWidth={tWidth} tileHeight={tHeight} tileRadius={tRadius}>
				<ImageTile image="./images/ds-image-tile-mountains.jpg" />
			</Tile>
		</TilesWrap>
	);
};
