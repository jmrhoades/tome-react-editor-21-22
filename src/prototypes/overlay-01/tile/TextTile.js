import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
	font-size: ${props => props.size}px;
`;

const TileH1 = styled(motion.div)`
	position: relative;
	font-weight: 700;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
`;

const TileP = styled(motion.div)`
	position: relative;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
`;


export const TextTile = props => {
	const h1Size = Math.round(props.scale * 21);
	const h1MarginBottom = Math.round(props.scale * 12);
	const pMarginBottom = Math.round(props.scale * 12);
	const pSize = Math.round(props.scale * 16);

	return (
		<Wrap
			transition={{
				duration: 0.25,
				ease: [0.4, 0, 0.1, 1],
			}}
			animate={{
				opacity: props.imageTileClickEmphasized ? 0.25 : 1,
			}}
			size={pSize}
			layout
		>
			<TextTileWrap
			layout
			>
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

			

				<TileP size={pSize} marginBottom={0} layout>
					Text tile heading size is {h1Size}
					<br />
					Text tile body size is {pSize}
					
				</TileP>


			</TextTileWrap>

		</Wrap>
	);
};
