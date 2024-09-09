import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { Icon } from "../../../ds/Icon";
import { MetricsContext } from "../tome/MetricsContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Video = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	padding: 5%;
	display: flex;
	align-items: center;
	justify-content: center;
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

export const TileVideo = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap>
			{props.video && (
				<Video>
					<video muted height="100%" autoPlay={props.isThumbnail ? false : true} preload="true" loop={true}>
						<source src={props.video} type="video/mp4" />
					</video>
				</Video>
			)}
			{!props.video && (
				<MediaPlaceholder
					style={{
						
					}}
				>
					<PlaceholderClickTarget>
						<Icon name={"Video"} size={102 * scale} opacity={1} />
					</PlaceholderClickTarget>
				</MediaPlaceholder>
			)}
		</Wrap>
	);
};
