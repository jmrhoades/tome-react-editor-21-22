import React, { useContext } from "react";
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
	overflow: hidden;
`;

const TileBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	background: #191919;
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
	box-shadow: inset 0px 0px 0px 4px #141414;
`;

export const Tile = ({ tile, isThumbnail }) => {
	const {
		selectedTile,
		setSelectedTile,
		editorState,
		panelOpen,
		setPanelOpen,
		setPanelName,
		panelName,
		clickCount,
		setPanelPosition,
		showUI,
	} = useContext(TomeContext);
	const {
		tileWidth,
		tileHeight,
		tileCornerRadiusOutside,
		tileCornerRadiusInside,
		tilePadding,
		tileSelectionBorderSize,
	} = useContext(MetricsContext).metrics;

	const borderRadius =
		tile.order === 1
			? `${tileCornerRadiusOutside}px ${tileCornerRadiusInside}px ${tileCornerRadiusInside}px ${tileCornerRadiusOutside}px`
			: `${tileCornerRadiusInside}px ${tileCornerRadiusOutside}px ${tileCornerRadiusOutside}px ${tileCornerRadiusInside}px`;

	return (
		<TileWrap
			key={tile.id}
			style={{
				width: tileWidth,
				height: tileHeight,
			}}
			animate={{
				opacity: selectedTile && selectedTile.id !== tile.id && showUI && !isThumbnail ? 0.5 : 1,
			}}
			transition={showUI ? transitions.layoutTransition : transitions.defaultTransition}
			onTap={() => {
				if (editorState === editorStates.EDITING) {
					
					setSelectedTile(tile);

					// Always open panel
					setPanelName(tile.type.name);
					setPanelPosition(`tile-${tile.size}-${tile.order}`);
					setPanelOpen(true);
					
					if (panelOpen && panelName !== tile.type.name) {
						setPanelName(tile.type.name);
						setPanelPosition(`tile-${tile.size}-${tile.order}`);
					}
					if (tile.type.name === tiles.NULL.name) {
						setPanelOpen(true);
						setPanelName(panels.TILES);
						setPanelPosition(`tile-${tile.size}-${tile.order}`);
					}
					
					clickCount.set(Math.random());
				}
			}}
		>
			<TileBackground
				style={{
					borderRadius: borderRadius,
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

			<SelectedOutline
				style={{
					borderRadius: borderRadius,
					display: isThumbnail ? "none" : "block",
					borderWidth: tileSelectionBorderSize,
					boxShadow: `inset 0px 0px 0px ${tileSelectionBorderSize * 1.5}px #141414`,
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				}}
			/>
		</TileWrap>
	);
};
