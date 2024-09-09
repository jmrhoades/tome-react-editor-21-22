import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: relative;
	height: 100%;
`;

const TextTileWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const TileH1 = styled(motion.div)`
	position: relative;
	font-weight: 700;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
	letter-spacing: -0.405634px;
`;

const TileP = styled(motion.div)`
	position: relative;
	font-size: ${props => props.size}px;
	line-height: 128%;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
`;

const TileUL = styled(motion.ul)`
	position: relative;
	font-size: ${props => props.size}px;
	line-height: 128%;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
	padding-inline-start: 16px;
	list-style-type: disc;

	& li {
		padding: 0.35em 0;
		&::marker {
			color: rgb(166, 166, 166);
		}
	}
`;

export const TextTile = props => {
	const tome = useContext(TomeContext);
	const { viewportWidth, viewportHeight, pageWidth, pageHeight, scale } = tome.metrics;

	const h1Size = Math.round(scale * 26);
	const h1MarginBottom = Math.round(scale * 16);
	const pMarginBottom = Math.round(scale * 16);
	const pSize = Math.round(scale * 20);

	return (
		<Wrap layout transition={tome.layoutTransition}>
			<TextTileWrap layout transition={tome.layoutTransition}>
				<TileH1 size={h1Size} marginBottom={h1MarginBottom} layout transition={tome.layoutTransition}>
					Page sizing approach A
				</TileH1>
				<TileP size={pSize} marginBottom={pMarginBottom} layout transition={tome.layoutTransition}>
					Viewport dimensions: {viewportWidth}x{viewportHeight}
					<br />
					Page dimensions: {pageWidth}x{pageHeight}
				</TileP>
				<TileUL size={pSize} marginBottom={pMarginBottom} layout transition={tome.layoutTransition}>
					<li>No scaling between 1280 and 1440 wide viewports</li>
					<li>Prevents scaling or moving on 1440 or wider viewports</li>
					<li>No max page size</li>
					<li>Panel never overlaps page</li>
				</TileUL>
			</TextTileWrap>
		</Wrap>
	);
};
