import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { TextTile } from "./TextTile";
import { ImageTile } from "./ImageTile";
import { VideoTile } from "./VideoTile";

export const tiles = {
	NULL: { name: "null", icon: "Add" },
	TITLE: { name: "title", icon: "Title" },
	TEXT: { name: "text", icon: "Text" },
	CODE: { name: "code", icon: "Code" },
	TABLE: { name: "table", icon: "Table" },
	IMAGE: { name: "image", icon: "Image" },
	VIDEO: { name: "video", icon: "Video" },
	WEB: { name: "web", icon: "Add" },
	TWITTER: { name: "twitter", icon: "Add" },
	GIPHY: { name: "giphy", icon: "Add" },
	FIGMA: { name: "figma", icon: "Add" },
	FRAMER: { name: "framer", icon: "Add" },
	AIRTABLE: { name: "airtable", icon: "Add" },
	METRICS: { name: "metrics", icon: "Add" },
};

const TileWrap = styled(motion.div)`
	position: relative;

	pointer-events: auto;
`;



const TileContent = styled(motion.div)`
	overflow: hidden;
`;

const SelectedOutline = styled(TileContent)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-style: solid;
	border-color: #ed00eb;
	box-sizing: border-box;
	box-shadow: inset 0px 0px 0px 4px #141414;
`;

const HoverOutline = styled(SelectedOutline)`
	border-color: rgba(255, 255, 255, 0.08);
	box-shadow: none;
`;

/*
const ResizeHandle = styled(motion.div)`
	position: absolute;
	background-color: #ed00eb;
	box-shadow: 0 0px 8px 0.5px rgba(0, 0, 0, 0.1);
`;
*/


export const Tile = ({ tile, isThumbnail }) => {
	const { selectedTile, setSelectedTile, setSelectedOutlinePage } = useContext(TomeContext);
	const { scale } = useContext(MetricsContext).metrics;

	const [tileHoverOpacity, setTileHoverOpacity] = useState(0);

	// const borderRadius = 0;
	const tileBorderSize = 3;

	// const resizeHandleWidth = 4;
	// const resizeHandleHeight = 64;
	// const resizeHandleDistance = 8;

	const isSelected = selectedTile && selectedTile.id === tile.id;
	let borderRadiusTopLeft = isSelected ? 20 * scale : 0;
	let borderRadiusTopRight = isSelected ? 20 * scale : 0;
	let borderRadiusBottomLeft = isSelected ? 20 * scale : 0;
	let borderRadiusBottomRight = isSelected ? 20 * scale : 0;

	return (
		<TileWrap
			key={tile.id}
			layout
			transition={transitions.layoutTransition}
			style={{
				// width: tileWidth,
				// height: tileHeight,
				gridColumn: tile.gridColumn,
				overflow: tileHoverOpacity === 1 || (selectedTile && selectedTile.id === tile.id) ? "hidden" : "auto",
				borderRadius: tileHoverOpacity === 1 || (selectedTile && selectedTile.id === tile.id) ? 20 * scale : 0,
			}}
			onMouseEnter={() => {
				setTileHoverOpacity(1);
			}}
			onMouseLeave={() => {
				setTileHoverOpacity(0);
			}}
			onMouseUp={() => {
				setSelectedOutlinePage(null);
				setSelectedTile(tile);
			}}
		>
			<TileContent style={{ borderRadius: borderRadiusTopLeft }} layout>
				{tile.type === tiles.TEXT && <TextTile blocks={tile.params.blocks} tileSize={tile.size} />}
				{tile.type === tiles.IMAGE && (
					<ImageTile image={tile.params.image} imageSize={tile.params.size} tileSize={tile.size} />
				)}
				{tile.type === tiles.VIDEO && <VideoTile video={tile.params.video} tileSize={tile.size} />}
			</TileContent>

			<HoverOutline
				style={{
					borderRadius: 20 * scale,
					display: isThumbnail ? "none" : "block",
					borderWidth: tileBorderSize,
				}}
				animate={{
					opacity: tileHoverOpacity,
				}}
				initial={{
					opacity: 0,
				}}
			/>
			<SelectedOutline
				style={{
					borderTopLeftRadius: borderRadiusTopLeft,
					borderTopRightRadius: borderRadiusTopRight,
					borderBottomLeftRadius: borderRadiusBottomLeft,
					borderBottomRightRadius: borderRadiusBottomRight,
					display: isThumbnail ? "none" : "block",
					borderWidth: tileBorderSize,
					boxShadow: `inset 0px 0px 0px 2px #141414`,
					borderColor: colors.accent,
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				}}
			/>

			
		</TileWrap>
	);
};
