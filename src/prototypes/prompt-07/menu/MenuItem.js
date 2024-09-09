import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { Icon } from "../../../ds/Icon";
import { Switch } from "../ds/Switch";

import { MetricsContext } from "../tome/MetricsContext";

import open_menu_sound from "../../../sounds/button_40.mp3";
import close_menu_sound from "../../../sounds/button_37.mp3";
import hover_sound_01 from "../../../sounds/button_38.mp3";
import delete_sound_01 from "../../../sounds/action_11.mp3";

const Item = styled(motion.div)`
	position: relative;
	cursor: pointer;
	display: grid;
`;

const Label = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
`;

const Accessory = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
	padding-right: 8px;
`;

const Hover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
`;

export const MenuItem = props => {
	const [isHovering, setIsHovering] = React.useState(false);

	let iconColor = props.theme.colors.menu.icon;
	let iconHoverColor = props.theme.colors.menu.iconHover;
	let labelColor = props.theme.colors.menu.label;
	let labelHoverColor = props.theme.colors.menu.labelHover;
	let backgroundHoverColor = props.theme.colors.menu.backgroundHover;

	if (props.label === "Delete") {
		iconColor = props.theme.colors.delete;
		labelColor = props.theme.colors.delete;
		backgroundHoverColor = props.theme.colors.delete;
	}

	const padding = "6px 8px";
	const borderRadius = 6;
	const hasAccessory = props.hasSwitch || props.hasCheckmark;
	const gridTemplateColumns = hasAccessory ? "24px 1fr 48px" : "24px 1fr";

	const getAccessory = (isHover = false) => {
		return (
			<Accessory>
				{props.hasSwitch && <Switch theme={props.theme} isOn={props.isOn} isSmall={true} />}
				{props.hasCheckmark && (
					<Icon name={"Checkmark"} opacity={1} color={isHover ? iconHoverColor : iconColor} size={16} />
				)}
			</Accessory>
		);
	};

	return (
		<Item
			style={{
				minWidth: 168,
				gridTemplateColumns,
				padding,
			}}
			onHoverStart={() => {
				setIsHovering(true);
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onTap={props.onTap}
		>
			<Icon name={props.icon} opacity={props.hasSwitch && !props.isOn ? 0.4 : 1} color={iconColor} size={16} transition={{
					duration: 0.2,
				}}/>
			<Label
				style={{ color: labelColor }}
				animate={{ opacity: props.hasSwitch && !props.isOn ? 0.4 : 1 }}
				transition={{
					duration: 0.2,
				}}
			>
				{props.label}
			</Label>
			
			{hasAccessory && getAccessory()}
			{!props.hasSwitch && (
				<Hover
					style={{
						display: "grid",
						gridTemplateColumns,
						padding,
						borderRadius,
						background: backgroundHoverColor,
						opacity: isHovering ? 1 : 0,
					}}
				>
					<Icon name={props.icon} opacity={1} color={iconHoverColor} size={16} />
					<Label style={{ color: labelHoverColor }}>{props.label}</Label>
					{hasAccessory && getAccessory(true)}
				</Hover>
			)}
		</Item>
	);
};

const Separator = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SeparatorLine = styled(motion.div)`
	position: relative;
`;

export const MenuSeparator = props => {
	return (
		<Separator
			style={{
				height: 12,
				padding: "0 8px",
			}}
		>
			<SeparatorLine
				style={{
					height: 1,
					width: "100%",
					backgroundColor: props.theme.colors.t2,
				}}
			/>
		</Separator>
	);
};
