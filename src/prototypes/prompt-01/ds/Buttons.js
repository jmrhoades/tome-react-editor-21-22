import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../ds/Icon";
import { transitions } from "./Transitions";

export const fieldTypeStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 500,
	fontSize: "15px",
	lineHeight: "20px",
};

export const buttonLabelStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 500,
	fontSize: "15px",
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

const ContainerVariants = {
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

export const IconButton = ({
	theme,
	width = 40,
	height = 32,
	borderRadius = 8,
	onTap = null,
	active = false,
	color = theme.colors.controls.icon,
	activeColor = theme.colors.accent,
	icon = "PlaybackPlay",
	hasBackground = false,
	hasHover = true,
	to = undefined,
	style = {},
	showBorder = false,
}) => {
	hasBackground = active;
	const background = theme.colors.controls.canvasMaterial;
	const backgroundHover = theme.colors.t3;

	const El = to ? Anchor : Button;
	const href = to;

	const backgroundVariants = {
		default: {
			opacity: 0,
		},
		hovering: {
			opacity: 1,
		},
	};
	return (
		<El
			variants={ContainerVariants}
			initial={"default"}
			whileHover={"hovering"}
			whileTap={"pressing"}
			style={{
				width,
				height,
				borderRadius,
				...style,
				background: background,
				backdropFilter: "blur(30px)",
				boxShadow: showBorder ? `0px 0px 0px 1px ${theme.colors.t3}` : "none",
			}}
			onTap={onTap}
			href={href}
		>
			{active && (
				<ActiveBackground
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					style={{ backgroundColor: theme.colors.t2 }}
				/>
			)}

			{!active && hasHover && (
				<HoverBackground
					variants={backgroundVariants}
					transition={transitions.basic}
					style={{ backgroundColor: backgroundHover }}
				/>
			)}

			<Icon name={icon} opacity={1} color={active ? activeColor : color} transition={{ duration: 0.2 }} />
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
	label = "Label",
	hasBackground = false,
	color = theme.colors.controls.label,
	activeColor = theme.colors.labelActive,
	style = {},
}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	const background = hasBackground ? theme.colors.t2 : theme.colors.controls.canvasMaterial;
	const backgroundHover = theme.colors.t3;

	const backgroundVariants = {
		default: {
			backgroundColor: theme.colors.controls.canvasMaterial,
		},
		hovering: {
			backgroundColor: backgroundHover,
		},
	};

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
					backgroundColor: background,
				}}
			/>
			<HoverBackground
				style={{
					backgroundColor: theme.colors.t3,
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
					color: active ? activeColor : color,
				}}
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
			onMouseDown={(e)=>{e.stopPropagation()}}
			onMouseUp={(e)=>{e.stopPropagation()}}
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

			<Icon name={icon} opacity={1} color={active ? activeColor : color} transition={{ duration: 0.2 }} size={16}/>

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
