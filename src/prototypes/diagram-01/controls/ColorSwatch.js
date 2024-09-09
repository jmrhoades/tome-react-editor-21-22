import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { transitions } from "../tome/TomeContext";
import { gradient } from "../../../ds/GradientImage";
import { colors } from "../metrics/MetricsContext";

const ButtonWrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
`;

const HoverBackground = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.08);
	border-radius: 6px;
`;

const ColorWrap = styled(motion.div)`
	position: relative;
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ColorCircle = styled(motion.div)`
	position: absolute;
	width: 20px;
	height: 20px;
	border-radius: 50%;
`;

const GradientCircle = styled(motion.svg)`
	display: block;
	position: absolute;
	width: 20px;
	height: 20px;
`;

const ColorOutline = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	bottom: 0px;
	right: 0px;
	border-radius: 50%;
	border: 2px solid white;
`;

const colorWrapVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
};

const hoverBackgroundVariants = {
	default: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
	},
};

export const ColorSwatch = ({
	width = 36,
	height = 40,
	name,
	color,
	selected,
	onTap,
	isColorPicker = false,
	onHoverStart,
	onHoverEnd,
}) => {
	return (
		<ButtonWrap
			style={{
				width: width,
				height: height,
			}}
			key={name}
			initial="default"
			whileHover="hover"
			onHoverStart={onHoverStart ? onHoverStart : null}
			onHoverEnd={onHoverEnd ? onHoverEnd : null}
			variants={colorWrapVariants}
			onMouseUp={
				onTap
					? e => {
							onTap();
							e.stopPropagation();
					  }
					: null
			}
		>
			<HoverBackground variants={hoverBackgroundVariants} transition={transitions.defaultLayoutTransition} />
			<ColorWrap>
				{!isColorPicker && (
					<ColorCircle
						style={{ backgroundColor: color }}
						initial={false}
						animate={{ scale: selected ? 1 : 1 }}
						transition={transitions.defaultLayoutTransition}
					/>
				)}

				{isColorPicker && (
					<GradientCircle viewBox="0 0 20 20">
						<rect width="20" height="20" rx="10" fill="url(#pattern0)" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlinkHref="#image0" transform="scale(0.00217391)" />
							</pattern>
							<image id="image0" width="460" height="460" xlinkHref={gradient} />
						</defs>
					</GradientCircle>
				)}

				{/* <ColorOutlineInner style={{ opacity: name === "black" ? 0.4 : 0 }} /> */}

				{/* <ColorOutlineHover
					style={{ borderColor: color }}
					variants={colorHoverOutlineVariants}
					transition={transitions.defaultLayoutTransition}
				/> */}

				<ColorOutline
					style={{ borderColor: colors.accent }}
					initial={false}
					animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 1 }}
					transition={transitions.defaultLayoutTransition}
				/>
			</ColorWrap>
		</ButtonWrap>
	);
};
