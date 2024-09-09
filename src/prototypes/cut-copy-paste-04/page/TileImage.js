import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";
import { NullMediaTile } from "./NullTile";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;


export const TileImage = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<ImageWrap
			style={{
				backgroundColor: props.backgroundColor ? props.backgroundColor : props.image ? "transparent" : colors.z2,
			}}
		>
			{props.image && (
				<Image
					style={{
						backgroundSize: props.imageSize ? props.imageSize : "cover",
						backgroundPosition: props.imagePosition ? props.imagePosition : "center",
					}}
					image={props.image}
				/>
			)}
			{!props.image && (
				<NullMediaTile 
					rowHeight={props.rowHeight}
					scale={scale}
					iconName={"Image"}
					buttonLabel={"Upload image"}
					labelLabel={"Or drop here"}
				/>
			)}
		</ImageWrap>
	);
};
