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
import { DiagramTile } from "../diagram/DiagramTile";
import { DiagramContext } from "../diagram/DiagramContext";
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
	DIAGRAM: { name: "diagram", icon: "Diagram" },
	WEB: { name: "web", icon: "Add" },
	TWITTER: { name: "twitter", icon: "Add" },
	GIPHY: { name: "giphy", icon: "Add" },
	FIGMA: { name: "figma", icon: "Add" },
	FRAMER: { name: "framer", icon: "Add" },
	AIRTABLE: { name: "airtable", icon: "Add" },
	METRICS: { name: "metrics", icon: "Add" },
};

const TileWrap = styled(motion.div)`
	position: absolute;
	top: 0;
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
		imageExpanded,
	} = useContext(TomeContext);

	const {
		tileHalfSize,
		pageWidth,
		tileCornerRadius,
		tileBorderSize,
		colors,
		scale,
		viewportWidth,
		viewportHeight,
		pagePadding,
		pageHeight,
	} = useContext(MetricsContext).metrics;

	const { shapeSelected, diagramExpanded } = useContext(DiagramContext);

	const [tileHoverOpacity, setTileHoverOpacity] = useState(0);
	const borderRadius = tileCornerRadius;

	const resizeHandleWidth = Math.round(clamp(4 * scale, 3, 6));
	const resizeHandleHeight = Math.round(clamp(44 * scale, 24, 64));
	const resizeHandleDistance = -1 * (resizeHandleWidth + 2);

	let tileWidth = tile.size === "half" ? tileHalfSize : pageWidth;
	let tileHeight = tileHalfSize;
	let tileLeft = tile.order === 1 ? pagePadding : pagePadding + tileHalfSize + pagePadding;
	let tileTop = pagePadding;
	let tileBorderRadius = borderRadius;

	if (diagramExpanded && tile.type === tiles.DIAGRAM) {
		tileWidth = viewportWidth;
		tileHeight = viewportHeight;
		tileTop = (pageHeight - viewportHeight) / 2;
		tileLeft = (pageWidth - viewportWidth) / 2;
		tileBorderRadius = 0;
	}

	if (imageExpanded && tile.type === tiles.DIAGRAM) {
		const tileSize = tileHalfSize * 1.25;
		tileWidth = tileSize;
		tileHeight = tileSize;
		tileLeft = (pageWidth - viewportWidth) / 2 + (viewportWidth - tileSize) / 2;
		tileTop = (pageHeight - viewportHeight) / 2 + (viewportHeight - tileSize) / 2;
	}

	return (
		<TileWrap
			layout
			key={tile.id}
			style={{
				width: tileWidth,
				height: tileHeight,
				left: tileLeft,
				top: tileTop,
				zIndex:
					(selectedTile && selectedTile.id === tile.id) || (imageExpanded && tile.type === tiles.DIAGRAM) ? 1 : 0,
			}}
			animate={{
				opacity: imageExpanded && tile.type !== tiles.DIAGRAM ? 0 : 1,
			}}
			transition={showUI ? transitions.layoutTransition : transitions.defaultTransition}
			onMouseEnter={() => {
				setTileHoverOpacity(1);
			}}
			onMouseLeave={() => {
				setTileHoverOpacity(0);
			}}
			onMouseUp={() => {
				setSelectedThumbnail(null);

				if (imageExpanded) return false;

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
				layout
				transition={transitions.layoutTransition}
				style={{
					borderRadius: tileBorderRadius,
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
				{tile.type === tiles.DIAGRAM && (
					<DiagramTile
						tileHoverOpacity={tileHoverOpacity}
						selected={selectedTile && selectedTile.id === tile.id}
						imageExpanded={imageExpanded && tile.type === tiles.DIAGRAM}
					/>
				)}
				{tile.type === tiles.VIDEO && <VideoTile video={tile.params.video} isThumbnail={isThumbnail} />}
			</TileContent>

			<motion.div
				animate={{
					opacity: diagramExpanded ? 0 : 1,
				}}
			>
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
						opacity: 0,
					}}
				/>
				<SelectedOutline
					style={{
						borderRadius: borderRadius,
						display: isThumbnail ? "none" : "block",
						borderWidth: tileBorderSize,
						boxShadow: shapeSelected ? "none" : `inset 0px 0px 0px ${tileBorderSize * 1.5}px #141414`,
						borderColor: shapeSelected ? colors.z4 : colors.accent,
						opacity: selectedTile && selectedTile.id === tile.id ? 1 : 0,
					}}
				/>
			</motion.div>

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
