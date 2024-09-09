import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { InputStates } from "./Prompt";
//import { Icon } from "../../../ds/Icon";
//import { Info } from "../menu/PromptCreateTomeInfo";
import { IconButton } from "../ds/Buttons";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	width: 100%;
	position: absolute;
	top: 16px;
	left: 0;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
	padding-right: 16px;
	pointer-events: none;
`;

const Label = styled(motion.div)`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	margin-right: 32px;
	background: linear-gradient(
		90deg,
		hsla(0, 0%, ${props => props.$shineLightness}, 0.4) 0%,
		hsla(0, 0%, ${props => props.$shineLightness}, 0.4) 44%,
		hsla(0, 0%, ${props => props.$shineLightness}, 0.6) 50%,
		hsla(0, 0%, ${props => props.$shineLightness}, 0.4) 56%,
		hsla(0, 0%, ${props => props.$shineLightness}, 0.4) 100%
	);
	background-size: 300% 100%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: move 8s ease-in-out infinite;
	@keyframes move {
		0% {
			background-position: 150% 0%;
		}
		100% {
			background-position: -150% 0%;
		}
	}
`;

const transition = { ease: "easeOut", duration: 0.1 };

export const Placeholder = props => {
	const isEmpty = props.state === InputStates.EMPTY;

	let opacity = 0;
	if (props.state === InputStates.EMPTY) opacity = 1;
	const { showMenu, menuInfo } = React.useContext(TomeContext);
	const moreBtnId = "prompt_create_tome_more_button";
	return (
		<Wrap
			transition={transition}
			animate={{ opacity: opacity }}
			initial={false}
			style={{
				...props.style,
				color: props.theme.colors.t7,
			}}
		>
			<Label $shineLightness={props.theme.mode === "light" ? "0%" : "100%"}>{props.label}</Label>

			<IconButton
				icon="More"
				theme={props.theme}
				hoverBackgroundColor={props.theme.colors.t1}
				style={{
					pointerEvents: isEmpty ? "auto" : "none",
				}}
				id={moreBtnId}
				active={menuInfo.show && menuInfo.buttonId === moreBtnId}
				activeColor={props.theme.colors.controls.icon}
				activeBackgroundColor={props.theme.colors.t1}
				onTap={e => {
					showMenu({
						type: "prompt_create_tome",
						buttonId: moreBtnId,
						alignX: "trailing",
						alignY: "leading",
					});
				}}
			/>
		</Wrap>
	);
};
