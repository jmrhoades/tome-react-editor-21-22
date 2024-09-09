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
	/* width: ${props => props.width}px; */
	/* transform: translateX(${props => props.offsetX}px); */
`;

const pageMoveTransition = {
	type: "spring",
	stiffness: 773,
	damping: 47,
	mass: 1.2,
};

export const Page = props => {

	const windowWidth = props.windowWidth < 2086 ? props.windowWidth : 2086;

	const scale = windowWidth / metrics.cViewportWidth;
	const pWidth = windowWidth - (metrics.cPageMarginX * 2);
	
	
	const pPadding = Math.floor(metrics.cTileMargin * scale);
	const pRadius = Math.floor(metrics.cPageRadius * scale);

	const pX = (props.windowWidth - pWidth) / 2;
	
	const pOffsetX = props.panelOpen ? -90 : 0;
	const tRadius = Math.floor(metrics.cTileRadius * scale);
	const tHeight = Math.floor((pWidth - pPadding*3)/2);
	const tWidth = tHeight;
	
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
			animate={{
				x: pX + pOffsetX,
				width: pWidth,
			}}
			transition={pageMoveTransition}
			initial={false}
		>
			<Tile scale={scale} tileWidth={tWidth} tileHeight={tHeight} tileRadius={tRadius}>
				<TextTile
					scale={scale}
					windowWidth={props.windowWidth}
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
