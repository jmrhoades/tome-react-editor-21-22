import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../ds/Icon";
import { transitions } from "./Transitions";

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

const SelectedBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const ContainerVariants = {
	default: {
		scale: 1,
	},
	active: {
		scale: 1,
	},
	pressing: {
		scale: 0.975,
		transition: { duration: 0.08 },
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
	activeColor = theme.colors.accent,
	icon = "PlaybackPlay",
	hasBackground = false,
	to = undefined,
	style = {},
}) => {
	hasBackground = active;
	const background = hasBackground ? theme.colors.t2 : theme.colors.controls.canvasMaterial;
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
			}}
			onTap={onTap}
			href={href}
		>
			
			<SelectedBackground variants={backgroundVariants} transition={transitions.basic} style={{backgroundColor: backgroundHover}}/>

			<Icon
				name={icon}
				opacity={1}
				color={active ? activeColor : theme.colors.controls.foreground}
				transition={{
					type: "tween",
					duration: active ? 0.4 : 0.2,
				}}
			/>
		</El>
	);
};

export const LabelButton = ({
	theme,
	height = 32,
	paddingX = 10,
	borderRadius = 6,
	onTap = null,
	active = false,
	label = "Label",
	hasBackground = false,
	style = {},
}) => {
	const background = hasBackground ? theme.colors.t2 : theme.colors.controls.canvasMaterial;
	const backgroundHover = theme.colors.t3;

	const backgroundVariants = {
		default: {
			backgroundColor: background,
		},
		hovering: {
			backgroundColor: backgroundHover,
		},
	};

	return (
		<Button
			variants={ContainerVariants}
			initial={"default"}
			whileHover={"hovering"}
			whileTap={"pressing"}
			style={{
				paddingLeft: paddingX,
				paddingRight: paddingX,
				height,
				borderRadius,
				...style,
			}}
			onTap={onTap}
		>
			<SelectedBackground variants={backgroundVariants} />

			<Label
				style={{
					color: active ? theme.colors.t9 : theme.colors.t7,
					fontFamily: "Inter",
					fontStyle: "normal",
					fontWeight: 500,
					fontSize: "15px",
					lineHeight: "20px",
				}}
			>
				{label}
			</Label>
		</Button>
	);
};
