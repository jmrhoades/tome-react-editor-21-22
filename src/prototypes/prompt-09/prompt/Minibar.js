import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { promptbarMetrics } from "./Prompt";

const Wrap = styled(motion.div)`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	/* justify-content: center; */
	position: relative;
	gap: 4px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	/* cursor: pointer; */
`;

const IconContainer = styled(motion.div)`
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
`;

const Label = styled(motion.div)`
	pointer-events: none;
	font-size: 13px;
	line-height: 15px;
	position: absolute;
	top: 50%;
	right: 0;
	letter-spacing: 1px;
`;

const Bg = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Line = styled(motion.div)`
	width: 100%;
	overflow: hidden;
	border-radius: 2px;
	position: relative;
`;

const LineFill = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const Minibar = props => {
	const colors = props.theme.colors;
	//const [isHovering, setIsHovering] = React.useState(false);
	const foreground = colors.t75;
	const height = promptbarMetrics.mini.barHeight;
	const width = promptbarMetrics.mini.barWidth;
	return (
		<Wrap
			style={{
				//width: "100&",
				height: "100%",
				pointerEvents: "none",
			}}
		>
			<Bg
				style={{
					backgroundColor:  colors.promptbar.miniBackgroundHover,
				}}
				initial={false}
				animate={{
					opacity: props.isHovering ? 0 : 0,
				}}
			 /> 

			<Line
				style={{
					backgroundColor: colors.promptbar.miniBar, //colors.accent
					width: width,
					height: height,
					x: 10,
				}}
				initial={false}
				transition={{
					width: {
						duration: 0.2,
						type: "ease",
						ease: "easeOut",
					},
					opacity: {
						repeat: Infinity,
						repeatType: "mirror",
						duration: 0.5,
						delay: 0.5,
						ease: "easeOut",
					},
				}}
				animate={{
					opacity: [1, props.isHovering ? 0 : 1],
				}}
			>
				<LineFill
					style={{
						backgroundColor: colors.accent,
					}}
					animate={{
						opacity: props.isHovering ? 1 : 0,
					}}
					transition={{
						type: "ease",
						duration: 0.1,
					}}
					initial={false}
				/>
			</Line>
			<Label
				style={{
					color: colors.t6,
					y: "-50%",
					x: -8,
					opacity: 1,
					fontFamily: props.theme.typography.fontFamilyMono,
					fontSize: 14,
				}}
				initial={false}
				animate={{
					opacity: props.isHovering ? 1 : 1,
				}}
			>⌘K</Label>
		</Wrap>
	);
};
