import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";

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
`;

export const TileVideo = props => {
	const { scale } = useContext(MetricsContext).metrics;

	return (
		<Wrap
			style={{
				backgroundColor: props.backgroundColor ? props.backgroundColor : props.video ? "transparent" : colors.z2,
			}}
		>
			{props.video && (
				<Video>
					<video
						muted
						height="100%"
						width="100%"
						autoPlay={props.isThumbnail ? false : true}
						preload="true"
						loop={true}
					>
						<source src={props.video} type="video/mp4" />
					</video>
				</Video>
			)}
			{!props.video && (
				<NullMediaTile
					rowHeight={props.rowHeight}
					scale={scale}
					iconName={"Video"}
					buttonLabel={"Upload video"}
					labelLabel={"Or drop here"}
				/>
			)}
		</Wrap>
	);
};
