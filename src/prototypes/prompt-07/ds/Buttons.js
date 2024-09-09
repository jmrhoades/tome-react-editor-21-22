import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../ds/Icon";
import { transitions } from "./Transitions";

export const fieldTypeStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "15px",
	lineHeight: "20px",
};

export const buttonLabelStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	lineHeight: "20px",
};

export const recordLabelStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "13px",
	lineHeight: 1,
};

const Button = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Anchor = styled(motion.a)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Label = styled(motion.div)`
	position: relative;
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
`;
const HoverBackground = styled(Background)``;
const ActiveBackground = styled(Background)``;

export const IconButton = ({
	theme,
	width = 40,
	height = 40,
	borderRadius = 8,
	iconSize = 28,
	onTap = null,
	active = false,
	backgroundColor = "transparent",
	color = theme.colors.controls.icon,
	activeColor = theme.colors.accent,
	hoverBackgroundColor = theme.colors.t2,
	activeBackgroundColor = theme.colors.t2,
	hasActiveBackground = true,
	icon = "PlaybackPlay",
	hasHover = true,
	to = undefined,
	style = {},
	showBorder = false,
	id = undefined,
	disabled = undefined,
}) => {
	const El = to ? Anchor : Button;
	const href = to;

	const containerVariants = {
		default: {
			scale: 1,
		},
		active: {
			scale: 1,
		},
		pressing: {
			scale: 0.95,
		},
		hovering: {
			scale: 1,
		},
	};
	const hoverVariants = {
		default: {
			opacity: 0,
		},
		hovering: {
			opacity: 1,
		},
	};

	return (
		<El
			variants={containerVariants}
			initial={"default"}
			whileHover={"hovering"}
			whileTap={"pressing"}
			style={{
				width,
				height,
				borderRadius,
				//background: background,
				//backdropFilter: "blur(30px)",
				boxShadow: showBorder ? `0px 0px 0px 1px ${theme.colors.t3}` : "none",
				...style,
				pointerEvents: disabled ? "none" : "auto",
				opacity: disabled ? 0.5 : 1,
			}}
			onTap={onTap}
			href={href}
			id={id}
		>
			<Background
				style={{
					backgroundColor: backgroundColor,
				}}
			/>

			{active && hasActiveBackground && (
				<ActiveBackground
					initial={false}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					style={{ backgroundColor: activeBackgroundColor }}
				/>
			)}

			{!active && hasHover && (
				<HoverBackground
					variants={hoverVariants}
					transition={transitions.basic}
					style={{ backgroundColor: hoverBackgroundColor }}
				/>
			)}

			<Icon
				name={icon}
				size={iconSize}
				opacity={1}
				color={active ? activeColor : color}
				transition={{ duration: 0.2 }}
			/>
		</El>
	);
};

export const LabelButton = ({
	theme,
	height = 32,
	paddingX = 8,
	borderRadius = 6,
	onTap = null,
	active = false,
	backgroundColor = "transparent",
	backgroundHoverColor = theme.colors.t3,
	label = "Label",
	fontSize = 15,
	labelColor = theme.colors.controls.label,
	labelHoverColor = theme.colors.controls.labelHover,
	labelActiveColor = theme.colors.labelActive,
	style = {},
}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	//const background = hasBackground ? theme.colors.t2 : theme.colors.controls.canvasMaterial;
	//const backgroundHover = theme.colors.t3;

	// const backgroundVariants = {
	// 	default: {
	// 		backgroundColor: theme.colors.controls.canvasMaterial,
	// 	},
	// 	hovering: {
	// 		backgroundColor: backgroundHover,
	// 	},
	// };

	return (
		<Button
			// variants={ContainerVariants}
			// initial={"default"}

			// whileTap={"pressing"}
			style={{
				paddingLeft: paddingX,
				paddingRight: paddingX,
				height,
				borderRadius,
				...style,
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			whileTap={{
				scale: 0.95,
			}}
			onTap={onTap}
		>
			<Background
				style={{
					backgroundColor: backgroundColor,
				}}
			/>
			<HoverBackground
				style={{
					backgroundColor: backgroundHoverColor,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			/>
			<Label
				style={{
					...buttonLabelStyles,
					fontSize: fontSize,
				}}
				animate={{
					color: active ? labelActiveColor : isHovering ? labelHoverColor : labelColor,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			>
				{label}
			</Label>
		</Button>
	);
};

export const IconLabelButton = ({
	theme,
	borderRadius = 6,
	onTap = null,
	active = false,
	label = "Label",
	//color = theme.colors.controls.label,
	color = "white",
	activeColor = theme.colors.labelActive,
	icon = "DoubleSparkle",
}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	return (
		<Button
			style={{
				paddingLeft: 6,
				paddingRight: 8,
				paddingTop: 2,
				paddingBottom: 2,
				gap: 6,
				borderRadius: borderRadius,
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			onMouseDown={e => {
				e.stopPropagation();
			}}
			onMouseUp={e => {
				e.stopPropagation();
			}}
			whileTap={{ scale: 0.95 }}
			onTap={onTap}
		>
			<Background
				style={{
					backgroundColor: "rgba(0,0,0,0.25)",
					borderRadius: borderRadius,
					backdropFilter: "blur(100px)",
				}}
			/>
			<HoverBackground
				style={{
					backgroundColor: theme.colors.t3,
					borderRadius: borderRadius,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			/>

			<Icon name={icon} opacity={1} color={active ? activeColor : color} transition={{ duration: 0.2 }} size={16} />

			<Label
				style={{
					...buttonLabelStyles,
					fontSize: 13,
					color: active ? activeColor : color,
				}}
			>
				{label}
			</Label>
		</Button>
	);
};
