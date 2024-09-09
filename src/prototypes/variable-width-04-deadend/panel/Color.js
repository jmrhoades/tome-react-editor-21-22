import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { colors } from "../ds/Colors";
import { Icon } from "../../../ds/Icon";
import { gradient } from "../../../ds/GradientImage";

export const colorType = {
	FILL: "fill",
	PICKER: "picker",
};

const colorSize = 24;

const Wrap = styled(motion.div)`
	position: relative;
	flex-shrink: 0;
`;

const Fill = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 50%;
`;

const Picker = styled(motion.svg)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: block;
`;

const SelectedRing = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 50%;

	border: 1.5px solid #ed00eb;
	/* box-shadow: inset 0px 0px 0px 3px #1a231d; */
`;

export const Color = props => {
	//console.log(props.id, props.activeColor);
	const isSelected = props.activeColor === props.id;
	return (
		<Wrap
			style={{
				width: colorSize,
				height: colorSize,
			}}
			onTap={() => {
				props.onTap(props.id, props.fillColor);
			}}
			whileTap={{ scale: 0.9 }}
			key={"color_option_" + props.id}
		>
			{isSelected && (
				<SelectedRing
				layoutId="color_selection_ring"
				style={{
					width: colorSize + 3,
					height: colorSize + 3,
					top: -1.5,
					left: -1.5,
				}}
				initial={false}
				animate={{
					opacity: isSelected ? 1 : 0,
					scale: isSelected ? 1 : 0.85,
				}}
				transition={{
					type: "tween",
					duration: 0.1,
				}}
			/>
			)}

			{props.type === colorType.FILL && (
				<Fill
					style={{
						backgroundColor: props.fillColor,
					}}
					initial={false}
					animate={{
						scale: isSelected ? 16 / 22 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.1,
					}}
				/>
			)}

			{props.type === colorType.PICKER && (
				// <Icon name="ColorRing" />

				<Picker
					width={colorSize}
					height={colorSize}
					viewBox={`0 0 ${colorSize} ${colorSize}`}
					fill="none"
					initial={false}
					animate={{
						scale: isSelected ? 16 / 22 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.1,
					}}
				>
					<rect width={colorSize} height={colorSize} rx={colorSize / 2} fill="url(#pattern0)" fillOpacity="0.9" />
					<defs>
						<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
							<use xlinkHref="#image0_5_6217" transform="scale(0.00217391)" />
						</pattern>
						<image id="image0_5_6217" width="460" height="460" xlinkHref={gradient} />
					</defs>
				</Picker>
			)}

			{/* {props.activeColor === props.id && <SelectedRing layoutId="color_Selection_ring" style={{
				width: colorSize+3,
				height: colorSize+3,
				top: -1.5,
				left: -1.5,
			}}/>} */}
		</Wrap>
	);
};
