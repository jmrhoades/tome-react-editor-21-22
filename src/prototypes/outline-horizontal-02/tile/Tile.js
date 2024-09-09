import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { clamp } from "lodash";

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
	background-color: #ed00eb;
	box-shadow: 0 0px 8px 0.5px rgba(0, 0, 0, 0.1);
	visibility: hidden;
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

	const { tileHalfSize, pageWidth, tileCornerRadius, tileBorderSize, colors, scale } =
		useContext(MetricsContext).metrics;

	const [tileHoverOpacity, setTileHoverOpacity] = useState(0);
	const borderRadius = tileCornerRadius;

	const resizeHandleWidth = Math.round(clamp(4 * scale, 3, 6));
	const resizeHandleHeight = Math.round(clamp(44 * scale, 24, 64));
	const resizeHandleDistance = -1 * (resizeHandleWidth + 2);

	return (
		<TileWrap
			key={tile.id}
			style={{
				width: tile.size === "half" ? tileHalfSize : pageWidth,
				height: tileHalfSize,
				zIndex: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				transform: "translate3d( 0, 0, 0)",
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
					backgroundColor: tile.type === tiles.NULL ? colors.nullTileBackground : colors.tileBackground,
				}}
				animate={{
					opacity: editorState === editorStates.FULLSCREEN ? 0 : 1,
				}}
			/>

			<TileContent style={{ borderRadius: borderRadius }}>
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
					borderWidth: tileBorderSize,
				}}
				animate={{
					opacity: tileHoverOpacity,
				}}
				initial={{
					opacity: 0
				}}
			/>

			<SelectedOutline
				style={{
					borderRadius: borderRadius,
					display: isThumbnail ? "none" : "block",
					borderWidth: tileBorderSize,
					boxShadow: `inset 0px 0px 0px ${tileBorderSize * 1.5}px #141414`,
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
				}}
			/>

			<ResizeHandle
				style={{
					display: (tile.size === "half" && tile.order === 1) || tile.size === "full" ? "block" : "none",
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
					top: `calc(50% - ${resizeHandleHeight / 2}px)`,
					width: `${resizeHandleWidth}px`,
					height: `${resizeHandleHeight}px`,
					borderRadius: `${resizeHandleWidth / 2}px`,
					right: resizeHandleDistance,
				}}
			/>
			<ResizeHandle
				style={{
					display: (tile.size === "half" && tile.order === 2) || tile.size === "full" ? "block" : "none",
					opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
					top: `calc(50% - ${resizeHandleHeight / 2}px)`,
					width: `${resizeHandleWidth}px`,
					height: `${resizeHandleHeight}px`,
					borderRadius: `${resizeHandleWidth / 2}px`,
					left: resizeHandleDistance,
				}}
			/>
		</TileWrap>
	);
};
