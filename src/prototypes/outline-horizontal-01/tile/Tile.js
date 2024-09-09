import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../metrics/MetricsContext";
import { editorStates, TomeContext, transitions } from "../tome/TomeContext";
import { TextTile, MetricsTile } from "./TextTile";
import { ImageTile } from "./ImageTile";
import { LargeLetterTile } from "./LargeLetterTile";
import { VideoTile } from "./VideoTile";
import { NullTile } from "./NullTile";
import { panels } from "../panel/Panel";

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
`;

const TileBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

const TileContent = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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
`;

const HoverOutline = styled(SelectedOutline)`
	border-color: rgba(255, 255, 255, 0.08);
`;

const ResizeHandle = styled(motion.div)`
	position: absolute;
	top: calc(50% - 20px);
	width: 2px;
	height: 40px;
	border-radius: 2px;
	background-color: #ed00eb;
`;

const ResizeHandleRight = styled(ResizeHandle)`
	right: -5px;
`;

const ResizeHandleLeft = styled(ResizeHandle)`
	left: -5px;
`;

export const Tile = ({ tile, isThumbnail }) => {
	const {
		selectedTile,
		setSelectedTile,
		editorState,
		panelOpen,
		setPanelName,
		panelName,
		clickCount,
		showUI,
		setSelectedThumbnail,
	} = useContext(TomeContext);
	const {
		tileWidth,
		tileHeight,
		pageWidth,
		tileCornerRadiusOutside,
		tileCornerRadiusInside,
		tilePadding,
		tileSelectionBorderSize,
		colors,
	} = useContext(MetricsContext).metrics;

	const [tileHoverOpacity, setTileHoverOpacity] = useState(0);

	const borderRadius =
		tile.order === 1
			? `${tileCornerRadiusOutside}px ${tileCornerRadiusInside}px ${tileCornerRadiusInside}px ${tileCornerRadiusOutside}px`
			: `${tileCornerRadiusInside}px ${tileCornerRadiusOutside}px ${tileCornerRadiusOutside}px ${tileCornerRadiusInside}px`;

	return (
		<TileWrap
			key={tile.id}
			style={{
				width: tile.size === "half" ? tileWidth : pageWidth,
				height: tileHeight,
				zIndex: selectedTile && selectedTile.id === tile.id ? 1 : 0,
			}}
			transition={showUI ? transitions.layoutTransition : transitions.defaultTransition}
			onMouseEnter={() => {
				setTileHoverOpacity(1);
			}}
			onMouseLeave={() => {
				setTileHoverOpacity(0);
			}}
			onTap={() => {
				setSelectedThumbnail(null);

				if (editorState === editorStates.EDITING) {
					setSelectedTile(tile);

					// Always open panel
					setPanelName(tile.type.name);
					// setPanelPosition(`tile-${tile.size}-${tile.order}`);
					// setPanelOpen(true);

					if (panelOpen && panelName !== tile.type.name) {
						setPanelName(tile.type.name);
						// setPanelPosition(`tile-${tile.size}-${tile.order}`);
					}

					if (tile.type.name === tiles.NULL.name) {
						// setPanelOpen(true);
						setPanelName(panels.TILES);
						// setPanelPosition(`tile-${tile.size}-${tile.order}`);
					}

					clickCount.set(Math.random());
				}
			}}
		>
			<TileBackground
				style={{
					borderRadius: borderRadius,
					backgroundColor: colors.tileBackground,
				}}
				animate={{
					opacity: editorState === editorStates.FULLSCREEN ? 0 : 1,
				}}
			/>

			<TileContent style={{ padding: tilePadding, borderRadius: borderRadius }}>
				{tile.type === tiles.NULL && <NullTile />}
				{tile.type === tiles.TEXT && <TextTile blocks={tile.params.blocks} />}
				{tile.type === tiles.IMAGE && <ImageTile image={tile.params.image} />}
				{tile.type === tiles.METRICS && <MetricsTile />}
				{tile.type === tiles.LARGELETTER && <LargeLetterTile />}
				{tile.type === tiles.VIDEO && <VideoTile video={tile.params.video} isThumbnail={isThumbnail} />}
			</TileContent>

			<HoverOutline
				style={{
					borderRadius: borderRadius,
					display: isThumbnail ? "none" : "block",
					borderWidth: tileSelectionBorderSize,
				}}
				animate={{
					opacity: tileHoverOpacity,
				}}
			/>

			<SelectedOutline
				style={{
					borderRadius: borderRadius,
					display: isThumbnail ? "none" : "block",
					borderWidth: tileSelectionBorderSize,
					boxShadow: `inset 0px 0px 0px ${tileSelectionBorderSize * 1.5}px #141414`,
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				}}
			/>

			<ResizeHandleRight
				style={{
					display: (tile.size === "half" && tile.order === 1) || tile.size === "full" ? "block" : "none",
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				}}
			/>
			<ResizeHandleLeft
				style={{
					display: (tile.size === "half" && tile.order === 2) || tile.size === "full" ? "block" : "none",
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				}}
			/>
		</TileWrap>
	);
};
