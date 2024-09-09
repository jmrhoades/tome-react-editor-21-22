import React, { useState, useEffect } from "react";
import styled from "styled-components";

const cViewportWidth = 1280;
const cPageWidth = 772;
const cPageHeight = 394;
const cPageRadius = 24;
const cPageMargin = 16;
const cTileRadius = 12;
const cTilePadding = 16;

const PageWrap = styled.div`
	min-width: 240px;
	width: 100%;
	max-width: 1440px;
	margin-left: 254px;
	margin-right: 254px;
`;

const AspectRatioContainer = styled.div`
	height: 0;
	overflow: hidden;
	position: relative;
	padding-top: calc(${cPageHeight} / ${cPageWidth} * 100%);
	border-radius: ${props => props.pageRadius}px;
	background-color: #121212;
`;

const AspectRatioContainerContent = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const TilesContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: ${props => props.pageMargin}px;
	padding: ${props => props.pageMargin}px;
	height: 100%;
`;

const Tile = styled.div`
	padding: ${props => props.tilePadding}px;
	height: 100%;
	border-radius: ${props => props.tileRadius}px;
	background-color: #121212;
    position: relative;
    overflow: hidden;
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
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

const TextTile = props => {
	const h1Size = props.scale * 21;
	const h1MarginBottom = props.scale * 12;
	const pSize = props.scale * 16;
	return (
		<Tile tilePadding={props.tilePadding} tileRadius={props.tileRadius} scale={props.scale}>
			<TileH1 size={h1Size} marginBottom={h1MarginBottom}>
				Headline
			</TileH1>
			<TileP size={pSize}>Body text</TileP>
		</Tile>
	);
};

const ImageTile = props => {
	return (
		<Tile tilePadding={props.tilePadding} tileRadius={props.tileRadius} scale={props.scale}>
			<Image image={props.image} />
		</Tile>
	);
};

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

function useWindowWidth() {
	const [width, setWidth] = useState(getWindowWidth());
	useEffect(() => {
		const resizeListener = () => {
			setWidth(getWindowWidth());
		};
		window.addEventListener("resize", resizeListener);
		// clean up function
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, []);
	return width;
}

export const Page = props => {
	const windowWidth = useWindowWidth();
	const scale = windowWidth / cViewportWidth;
	const pageRadius = scale * cPageRadius;
	const pageMargin = scale * cPageMargin;
	const tilePadding = scale * cTilePadding;
	const tileRadius = scale * cTileRadius;
	// console.log(scale);
	return (
		<PageWrap>
			<AspectRatioContainer pageRadius={pageRadius}>
				<AspectRatioContainerContent>
					<TilesContainer pageMargin={pageMargin}>
						<TextTile tilePadding={tilePadding} tileRadius={tileRadius} scale={scale} />
						<ImageTile tilePadding={tilePadding} tileRadius={tileRadius} scale={scale} image="./images/ds-image-tile-mountains.jpg" />
					</TilesContainer>
				</AspectRatioContainerContent>
			</AspectRatioContainer>
		</PageWrap>
	);
};
