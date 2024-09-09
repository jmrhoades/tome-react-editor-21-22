import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { InputStates } from "./Prompt";
//import { Icon } from "../../../ds/Icon";
//import { Info } from "../menu/PromptCreateTomeInfo";

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
	/* margin-right: 32px; */

	background: linear-gradient(
		90deg,
		${props => props.$shineBase} 0%,
		${props => props.$shineBase} 45%,
		${props => props.$shineHighlight} 55%,
		${props => props.$shineBase} 65%,
		${props => props.$shineBase} 100%
	);

	background-size: 300% 100%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: move 6s linear infinite;
	animation-delay: 2s;
	@keyframes move {
		0% {
			background-position: 100% 0%;
		}
		33% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 0% 0%;
		}
	}
`;

const ArtifactSpan = styled(motion.span)``;

const transition = { ease: "easeOut", duration: 0.1 };

export const Placeholder = props => {
	let opacity = 0;
	if (props.state === InputStates.EMPTY) opacity = 1;

	return (
		<Wrap
			transition={transition}
			animate={{ opacity: opacity }}
			initial={false}
			style={{
				...props.style,
				color: props.theme.colors.t6,
			}}
		>
			<Label $shineBase={props.theme.colors.shine.base} $shineHighlight={props.theme.colors.shine.highlight}>
				{/* Create a <ArtifactSpan>{props.label}</ArtifactSpan> about… */}
				{props.placeholderText}
			</Label>
		</Wrap>
	);
};
