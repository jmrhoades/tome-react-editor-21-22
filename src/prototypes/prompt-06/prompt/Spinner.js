import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { BuildStates } from "./Prompt";

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
};

const makeArcPath = (x, y, radius, startAngle, endAngle) => {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
	return d;
};

const makeCheckPath = size => {
	let d = [
		"M",
		0.332031 * size,
		0.5 * size,
		"L",
		0.445312 * size,
		0.660156 * size,
		"L",
		0.671875 * size,
		0.335938 * size,
	].join(" ");
	return d;
};

export const Spinner = ({ theme, size = 22, strokeWidth = 2.5, state = BuildStates.WAITING }) => {
	const colors = theme.colors;
	const x = size / 2;
	const y = size / 2;
	const r = size / 2 - strokeWidth / 2;

	const arcPath = makeArcPath(x, y, r, 0, 270);
	const circlePath = makeArcPath(x, y, r, 0, 359);
	const successColor = colors.generated;

	return (
		<motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
			<motion.circle
				cx={x}
				cy={y}
				r={r}
				strokeWidth={strokeWidth}
				stroke={colors.t4}
			/>
			<motion.path
				d={arcPath}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				animate={{
					rotate: 360,
					opacity: state === BuildStates.FINISHED ? 0 : 1,
					stroke: state === BuildStates.WAITING ? colors.accent : colors.accent,
				}}
				transition={{
					opacity: {
						ease: "easeOut",
						duration: 0.4,
					},
					rotate: {
						ease: "linear",
						repeat: Infinity,
						duration: 3,
					},
				}}
			/>
			{state === BuildStates.FINISHED && (
				<motion.circle
					cx={x}
					cy={y}
					r={r}
					strokeWidth={strokeWidth}
					stroke={successColor}
					initial={{
						pathLength: 0,
						rotate: -90,
						opacity: 0,
					}}
					animate={{
						pathLength: 1,
						opacity: 1,
						rotate: -90,
					}}
					transition={{
						type: "spring",
						duration: 0.5,
						bounce: 0,
						delay: 0.1,
					}}
				/>
			)}
			{state === BuildStates.FINISHED && (
				<motion.path
					d={makeCheckPath(size)}
					stroke={successColor}
					strokeWidth={strokeWidth}
					// strokeLinecap="round"
					strokeLinejoin="round"
					initial={{
						pathLength: 0,
						opacity: 0,
					}}
					animate={{
						pathLength: 1,
						opacity: 1,
					}}
					transition={{
						pathLength: {
							type: "spring",
							bounce: 0,
							duration: 0.65,
							delay: 0.4,
						},
						opacity: {
							type: "spring",
							bounce: 0,
							duration: 0.2,
							delay: 0.4,
						},
					}}
				/>
			)}
		</motion.svg>
	);
};
