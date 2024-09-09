import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	position: relative;
`;

const TileH1 = styled(motion.div)`
	font-weight: 700;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
`;

const TileP = styled(motion.div)`
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: ${props => props.marginBottom}px;
`;

export const TextTile = props => {
	const h1Size = Math.round(props.scale * 21);
	const h1MarginBottom = Math.round(props.scale * 12);
	const pMarginBottom = Math.round(props.scale * 12);
	const pSize = Math.round(props.scale * 16);

	return (
		<Wrap layout>
			<TileH1 size={h1Size} marginBottom={h1MarginBottom} layout>
				Window width is {props.windowWidth}
			</TileH1>

			
			<TileP size={pSize} marginBottom={pMarginBottom} layout>
				Page width is {props.pageWidth}
				<br />
				Page padding is {props.pagePadding}
				<br />
				Page corner radius is {props.pageRadius}
			</TileP>


			<TileP size={pSize} marginBottom={pMarginBottom} layout>
				Tile size is {props.tileSize}x{props.tileSize}
				<br />
				Tile corner radius is {props.tileRadius}
				<br />
				Tile padding is {props.tilePadding}
			</TileP>

			<TileP size={pSize} marginBottom={pMarginBottom} layout>
				Text tile heading size is {h1Size}
				<br />
				Text tile body size is {pSize}
			</TileP>

		</Wrap>
	);
};
