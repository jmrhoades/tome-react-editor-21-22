import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

export const VideoTile = props => {

	return (
		<Wrap>
			<Video>
				<video muted height="100%" autoPlay={props.isThumbnail ? false : true} preload="true" loop={true}>
					<source src={props.video} type="video/mp4" />
				</video>
			</Video>
		</Wrap>
	);
};
