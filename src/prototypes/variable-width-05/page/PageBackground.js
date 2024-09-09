import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";
import { transitions } from "../ds/Transitions";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	//overflow: hidden;
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

const Video = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	video {
		object-fit: cover;
	}
`;

const BackgroundDropIndicator = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

export const PageBackground = props => {
	const onFileLoaded = () => {
		//console.log("image tile: file loaded")
		//calcRowHeights();
	};

	const isLoading = true;

	//console.log("PageBackground");
	
	if (props.params) {
		console.log(props.params);
	}

	return (
		<Wrap
			style={
				{
					// backgroundColor: "purple"
				}
			}
		>
			{props.params && props.params.image && (
				<Image
					style={{
						backgroundSize: props.imageSize ? props.imageSize : "cover",
						backgroundPosition: props.imagePosition ? props.imagePosition : "center",
						//backgroundImage: `url("${props.params.image})`,
						//backgroundRepeat: "no-repeat",
					}}
					image={props.params.image}
					initial={{
						opacity: 1,
					}}
					animate={{
						opacity: isLoading ? 1 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.35,
					}}
				/>
			)}

			{props.params && props.params.video && (
				<Video
					initial={{
						opacity: 1,
					}}
					animate={{
						opacity: isLoading ? 1 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.35,
					}}
				>
					<video
						muted
						height="100%"
						width="100%"
						autoPlay
						loop
					>
						<source src={props.params.video} type="video/mp4" />
					</video>
				</Video>
			)}

			<BackgroundDropIndicator
				style={{
					width: "100%",
					height: "100%",
					background: props.theme.colors.accent,
					opacity: props.dropIndicatorInfo.backgroundDropOpacity,
					pointerEvents: "none",
					transition: "opacity 0.2s ease-out",
				}}
				animate={{}}
			/>
		</Wrap>
	);
};
