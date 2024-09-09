import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../metrics/MetricsContext";
import { tiles, TomeContext, transitions } from "../tome/TomeContext";
import { TextTile, MetricsTile } from "./TextTile";
import { ImageTile } from "./ImageTile";
import { LargeLetterTile } from "./LargeLetterTile";
import { VideoTile } from "./VideoTile";

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
	background: #141414;
`;

const TileContent = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
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

const TileLabel = styled(motion.span)`
	font-size: 12px;
	line-height: 18px;
	letter-spacing: -0.01em;
	color: #000000;
	background: #ed00eb;
	border-radius: 4px;
	padding: 0 5px;
	text-transform: uppercase;
	font-weight: 900;
`;

const TileLabelWrap = styled(motion.div)`
	position: absolute;
	bottom: -40px;
	left: 0;
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Tile = ({ tile, isThumbnail }) => {
	const [showTileTypeChooser, setShowTileTypeChooser] = useState(false);
	const { selectedTileID, setSelectedTileID, showUI } = useContext(TomeContext);
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
				borderRadius: borderRadius,
			}}
			onTap={() => setSelectedTileID(tile.id)}
		>
			<TileBackground
				animate={{ opacity: showUI ? 1 : 1 }}
				transition={transitions.defaultTransition}
				style={{
					borderRadius: borderRadius,
				}}
			/>
			<TileContent style={{ padding: tilePadding }}>
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
					boxShadow: `inset 0px 0px 0px ${tileSelectionBorderSize * 2}px #141414`,
				}}
				animate={{
					opacity: selectedTileID === tile.id ? 1 : 0,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			/>
			<TileLabelWrap
				animate={{
					opacity: selectedTileID === tile.id ? 1 : 0,
				}}
				transition={{ duration: 0.1 }}
				initial={false}
			>
				<TileLabel
					style={{
						pointerEvents: selectedTileID === tile.id ? "auto" : "none",
					}}
					onTap={() => setShowTileTypeChooser(true)}
				>
					{tile.type}
				</TileLabel>
			</TileLabelWrap>
			{showTileTypeChooser && selectedTileID === tile.id && <></>}
		</TileWrap>
	);
};
