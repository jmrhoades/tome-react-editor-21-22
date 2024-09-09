import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";

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

const MediaPlaceholder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PlaceholderClickTarget = styled(motion.div)``;

export const TileFigma = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap>
			<MediaPlaceholder
				style={{
					//backgroundColor: "rgba(24, 44, 36, 1)",
					backgroundColor: colors.z2,
				}}
			>
				<PlaceholderClickTarget>
					<Icon name={"Figma"} size={102 * scale} opacity={0.2} forceColor={true} />
				</PlaceholderClickTarget>
			</MediaPlaceholder>

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


