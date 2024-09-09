import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../metrics/MetricsContext";
import { tiles } from "../tome/TomeContext";
import { TextTile, MetricsTile } from "./TextTile";
import { ImageTile } from "./ImageTile";
import { LargeLetterTile } from "./LargeLetterTile";


const TileWrap = styled(motion.div)`
	position: relative;
	overflow: hidden;
	/* background-color: magenta; */
	/* opacity: 0.1; */
`;

export const Tile = ({ tile }) => {
	// const tome = useContext(TomeContext);
	const { tileWidth, tileHeight, tileCornerRadius, tilePadding } = useContext(MetricsContext).metrics;

	return (
		<TileWrap
			key={tile.id}
			style={{
				width: tileWidth,
				height: tileHeight,
				borderRadius: tileCornerRadius,
				padding: tilePadding,
			}}
		>
			{tile.type === tiles.TEXT && (
				<TextTile blocks={tile.params.blocks} />
			)}
			{tile.type === tiles.IMAGE && (
				<ImageTile image={tile.params.image} />
			)}
			{tile.type === tiles.METRICS && (
				<MetricsTile />
			)}
			{tile.type === tiles.LARGELETTER && (
				<LargeLetterTile />
			)}
		</TileWrap>
	);
};
