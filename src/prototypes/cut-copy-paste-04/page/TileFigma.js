import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	& iframe {
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
`;

export const TileFigma = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap
			style={{
				// backgroundColor: colors.nullTileBackgrounds.figma,
				backgroundColor: colors.z2,
			}}
		>
			<NullMediaTile
				rowHeight={props.rowHeight}
				tileWidth={props.tileWidth}
				scale={scale}
				iconName={"Figma"}
				isEmbed={true}
				inputPlaceholder={"Paste Figma link..."}
			/>

			{/* <iframe
				style={{
					pointerEvents: props.isSelected ? "auto" : "none",
				}}
				title="figma embed"
				width="100%"
				height="100%"
				src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FqSC5as3vEwC7T4Ri1WJBwM%2FUntitled%3Fnode-id%3D0%253A1"
			></iframe> */}
		</Wrap>
	);
};
