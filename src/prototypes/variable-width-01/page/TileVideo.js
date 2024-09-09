import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { colors } from "../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";
import { Icon } from "../../../ds/Icon";

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
	video {
		object-fit: cover;
	}
`;

const LargePlayButton = styled(motion.div)`
	position: absolute;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	background: hsla(0, 0%, 16%, 0.8);
	backdrop-filter: blur(100px);
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	cursor: pointer;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.$image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

export const TileVideo = props => {
	const { scale } = useContext(MetricsContext).metrics;
	const videoRef = useRef(null);
	const imageAlpha = useMotionValue(1);

	const startPlayback = e => {
		if (videoRef.current) {
			videoRef.current.play();
			imageAlpha.set(0);
		}
		e.stopPropagation();
	};
	const onTimeUpdate = () => {
		if (videoRef.current) {
			// console.log(videoRef.current.currentTime, videoRef.current.duration);
		}
	};

	const stopMouse = e => {
		e.stopPropagation();
	};

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
						autoPlay={props.autoPlay}
						preload="true"
						loop={true}
						ref={videoRef}
						//controls
						onTimeUpdate={onTimeUpdate}
					>
						<source src={props.video} type="video/mp4" />
					</video>
				</Video>
			)}
			{props.image && (
				<Image
					style={{
						backgroundSize: props.imageSize ? props.imageSize : "cover",
						backgroundPosition: props.imagePosition ? props.imagePosition : "center",
						opacity: imageAlpha,
					}}
					$image={props.image}
				/>
			)}
			{props.video && !props.autoPlay && (
				<LargePlayButton
					style={{ width: 80 * scale, height: 80 * scale, left: `calc(50% - ${40 * scale}px`, top: `calc(50% - ${40 * scale}px`,opacity: imageAlpha }}
					animate={{ scale: props.tileUnitWidth > 3 ? 1 : props.tileUnitWidth === 1 ? 0.5 : 0.75 }}
					onMouseDown={stopMouse}
					onMouseUp={startPlayback}
				>
					<Icon name="PlaybackPlay" opacity={1} color={"white"} size={48 * scale} />
				</LargePlayButton>
			)}
			{!props.video && !props.image && (
				<NullMediaTile
					rowHeight={props.rowHeight}
					scale={scale}
					iconName={"Video"}
					buttonLabel={"Upload video"}
					labelLabel={"Or drop here"}
					theme={props.theme}
					tileWidth={props.tileUnitWidth}
				/>
			)}
		</Wrap>
	);
};
