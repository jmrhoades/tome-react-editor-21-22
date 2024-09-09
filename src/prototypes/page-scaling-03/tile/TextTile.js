import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
	position: relative;
	padding: ${props => props.padding}px;
`;

const TileH1 = styled.div`
	font-weight: 700;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
`;

const TileP = styled.div`
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: ${props => props.marginBottom}px;
`;

export const TextTile = props => {
	const tPadding = props.scale * 16;
	const h1Size = props.scale * 21;
	const h1MarginBottom = props.scale * 12;
	const pMarginBottom = props.scale * 12;
	const pSize = props.scale * 16;

	return (
		<Wrap padding={tPadding} layout>
			<TileH1 size={h1Size} marginBottom={h1MarginBottom}>
				Window width is {props.windowWidth}
			</TileH1>

			<TileP size={pSize} marginBottom={pMarginBottom}>
				Tile size is {props.tileWidth}x{props.tileHeight}
				<br />
				Tile corner radius is {props.tileRadius}
			</TileP>

			<TileP size={pSize} marginBottom={pMarginBottom}>
				Page width is {props.pageWidth}
				<br />
				Page margins are {props.pagePadding}
				<br />
				Page corner radius is {props.pageRadius}
			</TileP>
		</Wrap>
	);
};
