import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// import { transitions } from "../../../ds/Transitions";

import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";

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

const PlaceholderClickTarget = styled(motion.div)`
	& svg {
		fill: none;
		& path {
			fill: rgba(255, 255, 255, 0.2);
		}
	}
`;

export const TileImage = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<ImageWrap
		style={{
			backgroundColor: props.backgroundColor ? props.backgroundColor : "transparent",
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
				<MediaPlaceholder style={{}}>
					<PlaceholderClickTarget>
						<Icon name={"Image"} size={102 * scale} opacity={1} />
					</PlaceholderClickTarget>
				</MediaPlaceholder>
			)}
		</ImageWrap>
	);
};
