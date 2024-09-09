import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { Icon } from "../../../ds/Icon";
import { TomeContext } from "../tome/TomeContext";

export const NullTilePlaceholder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& svg {
		display: block;
		margin-bottom: 20px;
	}
	& button {
		display: block;
		position: absolute;
		text-align: center;
		
	}
	& input {
		display: block;
		position: absolute;
		text-align: left;

		&::placeholder {
			
			color: ${props => props.c_placeholder};
		}
		
	}
	& p {
		text-align: center;
		color: rgba(255, 255, 255, 0.4);
	}
`;

export const NullMediaTile = props => {

	const {
		isPlayMode,
	} = useContext(TomeContext);

	
	const buttonWidth = 109 * props.scale;
	const buttonHeight = 32 * props.scale;
	const buttonFontSize = 13 * props.scale;
	const buttonLineHeight = 15 * props.scale;
	const buttonBorderRadius = 8 * props.scale;
	const iconSize = 80 * props.scale;
	const labelFontSize = 11 * props.scale;
	const labelLineHeight = 13 * props.scale;
	
    const inputPadding = 8 * props.scale;

	let metrics = {
		iconY: -24,
		buttonY: 48,
		labelY: 88,

		iconScale: 1,
		iconOpacity: 1,

		labelOpacity: 1,
        buttonOpacity: 1,
        inputOpacity: 1,

        inputWidth: 190,
	};

    if (props.tileWidth <= 3) {
        metrics.inputWidth = 109;
    }

	if (props.rowHeight <= 5) {
        
		metrics.iconY = -34;
		metrics.buttonY = 32;
		metrics.labelY = 64;
	}

	if (props.rowHeight <= 4) {
		metrics.iconScale = 0.75;
		metrics.iconY = -20;
		metrics.buttonY = 36;
		metrics.labelY = 56;
		metrics.labelOpacity = 0;
	}

	if (props.rowHeight <= 3) {
		metrics.iconScale = 0.75;
		metrics.iconY = 0;
		metrics.buttonOpacity = 0;
		metrics.inputOpacity = 0;
		// metrics.buttonY = -8;
		// metrics.labelY = 24;
	}

	if (props.rowHeight <= 2) {
		metrics.iconScale = 0.5;
		metrics.buttonY = 0;
		metrics.labelOpacity = 0;
	}

    if (props.rowHeight <= 1) {
		metrics.iconScale = 0.25;
		metrics.buttonOpacity = 0;
        metrics.inputOpacity = 0;
	}

	if (isPlayMode) {
		metrics.inputOpacity = 0;
		metrics.buttonOpacity = 0;
		metrics.labelOpacity = 0;
	}

    const shortMessage = "Paste link…";

	return (
		<NullTilePlaceholder c_placeholder={props.theme ? props.theme.colors.t6 : "transparent"}>
			<motion.div
				style={{
					position: "absolute",
					top: `calc(50% - ${iconSize / 2}px)`,
					left: `calc(50% - ${iconSize / 2}px)`,
					width: iconSize,
					height: iconSize,
				}}
				animate={{
					scale: metrics.iconScale,
					y: metrics.iconY * props.scale,
					opacity: metrics.iconOpacity,
				}}
				initial={false}
				transition={transitions.layoutTransition}
			>
				<Icon name={props.iconName} size={iconSize} opacity={props.isEmbed ? 1 : 0.6} />
			</motion.div>

			{!props.isEmbed && (
				<motion.button
					type="file"
					id="image_file"
					name="filename"
					style={{
						left: `calc(50% - ${buttonWidth / 2}px)`,
						top: `calc(50% - ${buttonHeight / 2}px)`,
						width: buttonWidth,
						height: buttonHeight,
						fontSize: buttonFontSize,
						lineHeight: buttonLineHeight + "px",
						borderRadius: buttonBorderRadius,
						color: props.theme ? props.theme.colors.t7 : "transparent",
						background: props.theme ? props.theme.colors.t2 : "transparent",
					}}
					animate={{
						y: metrics.buttonY * props.scale,
                        opacity: metrics.buttonOpacity,
					}}
					initial={false}
					transition={transitions.layoutTransition}
				>
					{props.buttonLabel}
				</motion.button>
			)}

			{props.isEmbed && (
				<motion.input
					
					style={{
						top: `calc(50% - ${buttonHeight / 2}px)`,
						height: buttonHeight,
						fontSize: buttonFontSize,
						lineHeight: buttonLineHeight + "px",
						borderRadius: buttonBorderRadius,
                        paddingLeft: inputPadding,
                        paddingRight: inputPadding,
						color: props.theme ? props.theme.colors.t7 : "transparent",
						background: props.theme ? props.theme.colors.t1 : "transparent",
						border: `1px solid ${props.theme ? props.theme.colors.t1 : "transparent"}`,
					}}
					animate={{
						y: metrics.buttonY * props.scale,
                        opacity: metrics.inputOpacity,
                        left: `calc(50% - ${(metrics.inputWidth* props.scale) / 2}px)`,
                        width: metrics.inputWidth * props.scale,
					}}
					initial={false}
					transition={transitions.layoutTransition}
					placeholder={props.tileWidth<=3 ? shortMessage : props.inputPlaceholder}
				/>
			)}

			{!props.isEmbed && (
				<motion.p
					style={{
						position: "absolute",
						top: `calc(50% - ${labelLineHeight / 2}px)`,
						left: `calc(50% - ${buttonWidth / 2}px)`,
						width: buttonWidth,
						height: labelLineHeight,
						fontSize: labelFontSize,
						lineHeight: labelLineHeight + "px",
					}}
					animate={{
						y: metrics.labelY * props.scale,
						opacity: metrics.labelOpacity,
					}}
					initial={false}
					transition={transitions.layoutTransition}
				>
					{props.labelLabel}
				</motion.p>
			)}
		</NullTilePlaceholder>
	);
};
