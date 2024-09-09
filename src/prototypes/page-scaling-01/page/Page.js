import React from "react";
import styled from "styled-components";

import { Tile } from "../tile/Tile";
import { TextTile } from "../tile/TextTile";
import { metrics } from "../index";

const TilesWrap = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: ${props => props.width}px;
	padding: ${props => props.padding}px;
	border-radius: ${props => props.pageRadius}px;
	background-color: rgba(89, 36, 88, 1);
`;

export const Page = props => {
	const scale = props.windowWidth / metrics.cViewportWidth;
	const tHeight = Math.floor(metrics.cTileHeight * scale);
	const tWidth = tHeight;
	const tRadius = Math.floor(metrics.cTileRadius * scale);
	const pPadding = Math.floor(metrics.cTileMargin * scale);
	const pWidth = (pPadding * 3) + (tWidth * 2);
	const pRadius =  Math.floor(metrics.cPageRadius * scale);
	return (
		<TilesWrap padding={pPadding} width={pWidth} pageRadius={pRadius}>
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
			<Tile scale={scale} tileWidth={tWidth} tileHeight={tHeight} tileRadius={tRadius}></Tile>
		</TilesWrap>
	);
};
