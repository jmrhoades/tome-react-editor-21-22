import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { useAnimationFrame } from "../../../hooks/use-animation-frame";

import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";

import { MetricsContext } from "../metrics/MetricsContext";
import { transitions } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	top: ${props => props.margin}px;
	left: ${props => props.margin}px;
	bottom: ${props => props.margin}px;
	right: ${props => props.margin}px;
	pointer-events: none;
`;

const Target = styled(motion.div)`
	position: absolute;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	border-radius: ${props => props.size}px;
	background-color: magenta;
	opacity: 0.4;
	pointer-events: auto;
`;

const Target1 = styled(Target)`
	top: 0;
	left: 0;
`;

const Target2 = styled(Target)`
	top: 0;
	right: 0;
`;

const Target3 = styled(Target)`
	bottom: 0;
	right: 0;
`;

const Target4 = styled(Target)`
	bottom: 0;
	left: 0;
`;

const VideoOverlay = styled(Target)`
	top: 0;
	right: 0;
	pointer-events: none;
	background-color: transparent;
	/* background-image: url("/images/overlay-01.png");
	background-size: 100% 100%; */
	filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.25));
	opacity: 1;

	& video {
		display: block;
		border-radius: ${props => props.size}px;
	}
`;

const Dragger = styled(motion.div)`
	position: absolute;
	top: 0;
	right: 0;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	pointer-events: auto;
`;

const VideoPlaybackProgress = styled(motion.svg)`
	position: absolute;
	top: -9px;
	left: -9px;
	width: ${props => props.size + 18}px;
	height: ${props => props.size + 18}px;
`;

export const Overlay = props => {
	const { overlaySize, overlayMargin } = useContext(MetricsContext).metrics;

	const size = overlaySize;
	const margin = overlayMargin;

	const constraintsRef = useRef();
	const videoRef = useRef();
	const [toggleVideo, setToggleVideo] = useState(false);
	const [hovering, setHovering] = useState(false);
	const [targetDelay, setTargetDelay] = useState(0);

	// Can be: default, active, hover & dragging
	const [headState, setHeadState] = useState("default");

	const dragAnimation = useAnimation();
	const vX = useMotionValue(0);
	const vY = useMotionValue(0);

	const spring =
		headState === "dragging"
			? { damping: 30, stiffness: 300, mass: 0.5 }
			: { damping: 17.5, stiffness: 125, mass: 1 };

	const vXSpring = useSpring(vX, spring);
	const vYSpring = useSpring(vY, spring);

	const headVariants = {
		default: {
			scale: 1,
		},
		active: {
			scale: 1,
		},
		hover: {
			scale: 1.033,
		},
		dragging: {
			scale: 1.033,
		},
	};

	const targetVariants = {
		default: {
			scale: 0.0,
			opacity: 0,
			transition: {
				opacity: {
					duration: 0.35,
					ease: [0.4, 0, 0.1, 1],
					delay: targetDelay,
				},
				scale: {
					type: "spring",
					stiffness: 550,
					damping: 30,
					delay: targetDelay,
				},
			},
		},
		dragging: {
			scale: 0.5,
			opacity: 0.75,
			transition: {
				opacity: {
					duration: 0.5,
					ease: [0.4, 0, 0.1, 1],
					delay: 0.3,
				},
				scale: {
					type: "spring",
					stiffness: 550,
					damping: 30,
					delay: 0.3,
				},
			},
		},
	};

	const onDragEnd = (event, info) => {
		setTargetDelay(0.25);
		updateRestingPosition(event, info);
		// Framer Motion bug?
		setTimeout(() => setHeadState("default"), 60);
	};

	const updateRestingPosition = (event, info) => {
		const r = constraintsRef.current.getBoundingClientRect();
		// Assumes a starting top-right-aligned head position
		const LEFT = -r.width + size;
		const RIGHT = 0;
		const TOP = 0;
		const BOTTOM = r.height - size;
		const midX = LEFT / 2;
		const midY = BOTTOM / 2;
		const VELOCITY_MAX = 1500;
		let newX;
		if (vX.get() < midX) {
			newX = LEFT;
			if (info.velocity.x > VELOCITY_MAX) {
				newX = RIGHT;
			}
		} else {
			newX = RIGHT;
			if (info.velocity.x < -VELOCITY_MAX) {
				newX = LEFT;
			}
		}
		let newY;
		if (vY.get() < midY) {
			newY = TOP;
			if (info.velocity.y > VELOCITY_MAX) {
				newY = BOTTOM;
			}
		} else {
			newY = BOTTOM;
			if (info.velocity.y < -VELOCITY_MAX) {
				newY = TOP;
			}
		}
		// Move the dragger to the snapped position
		dragAnimation.start({
			x: newX,
			y: newY,
			transition: { duration: 0.1 },
		});
	};

	const progressCircleRadius = 39;
	const progressCircleCircumference = 2 * Math.PI * progressCircleRadius;
	const progressCircleRef = useRef(null);
	const [progressCircleProgress, setProgressCircleProgress] = useState(0);
	const [progressCircleOffset, setProgressCircleOffset] = useState(0);

	useEffect(() => {
		const progressOffset = ((100 - progressCircleProgress) / 100) * progressCircleCircumference;
		if (progressOffset) {
			setProgressCircleOffset(progressOffset);
		}
	}, [setProgressCircleOffset, progressCircleCircumference, progressCircleProgress, progressCircleOffset]);

	const onVideoProgress = () => {
		if (videoRef.current) {
			setProgressCircleProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
		}
	};

	useAnimationFrame(deltaTime => onVideoProgress());

	return (
		<Wrap ref={constraintsRef} margin={margin} transition={transitions.layoutTransition} key={props.id}>
			<Target1 size={size} animate={headState} variants={targetVariants} initial={"default"} />
			<Target2 size={size} animate={headState} variants={targetVariants} initial={"default"} />
			<Target3 size={size} animate={headState} variants={targetVariants} initial={"default"} />
			<Target4 size={size} animate={headState} variants={targetVariants} initial={"default"} />

			<VideoOverlay size={size} style={{ x: vXSpring, y: vYSpring }} variants={headVariants} animate={headState}>
				<video ref={videoRef} muted width="100%" onTimeUpdate={onVideoProgress}>
					<source src={props.video} type="video/mp4" />
				</video>
				<VideoPlaybackProgress size={size} viewBox="0 0 82 82">
					<motion.circle
						ref={progressCircleRef}
						fill="none"
						strokeWidth="3"
						stroke="white"
						strokeDasharray={progressCircleCircumference}
						strokeDashoffset={progressCircleOffset}
						r={progressCircleRadius}
						cx="41"
						cy="41"
						style={{
							rotate: -90,
						}}
					/>
				</VideoPlaybackProgress>
			</VideoOverlay>

			<Dragger
				drag
				dragConstraints={constraintsRef}
				size={size}
				style={{ x: vX, y: vY }}
				dragElastic={0.1}
				animate={dragAnimation}
				onHoverStart={() => {
					setHeadState("hover");
					setHovering(true);
				}}
				onHoverEnd={() => {
					setHeadState("default");
					setHovering(false);
				}}
				onMouseDown={() => {
					setHeadState("active");
					setToggleVideo(true);
				}}
				onMouseUp={e => {
					if (videoRef.current && toggleVideo) {
						videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
					}

					setHeadState(hovering ? "hover" : "default");

					setTargetDelay(0);
					e.stopPropagation();
				}}
				onDragStart={() => {
					setToggleVideo(false);
					setHeadState("dragging");
				}}
				onDragEnd={onDragEnd}
			/>
		</Wrap>
	);
};
