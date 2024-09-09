import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const Content = styled(motion.div)`
	background: #1f001f;
	box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	color: rgba(237, 0, 235, 1);
	line-height: 18px;
	font-size: 12px;
	padding: 4px 6px;
	white-space: nowrap;
`;

const Label = styled(motion.span)`
	padding-right: 8px;
`;

const Shortcut = styled(motion.span)`
	display: inline-block;
	width: 16px;
	line-height: 16px;
	text-align: center;
	background: rgba(237, 0, 235, 0.12);
	border-radius: 2px;
`;

export const Tooltip = props => {
	const tooltipHeight = 26;
	let left = 0;
	let top = 0;
	let tX = "0%";

	switch (props.state.alignment) {
		case "BottomRight":
			left = props.state.rect.x + props.state.rect.width;
			top = props.state.rect.y + props.state.rect.height;
			tX = "-100%";
			break;
		case "MiddleLeft":
			left = props.state.rect.x;
			top = props.state.rect.y + props.state.rect.height / 2 - tooltipHeight / 2;
			tX = "-100%";
			break;
		case "MiddleRight":
			left = props.state.rect.x + props.state.rect.width;
			top = props.state.rect.y + props.state.rect.height / 2 - tooltipHeight / 2;
			tX = "0%";
			break;
		case "TopMiddle":
			left = props.state.rect.x + props.state.rect.width / 2;
			top = props.state.rect.y - tooltipHeight;
			tX = "-50%";
			break;
		default:
			break;
	}

	return (
		<Wrap
			animate={{
				opacity: props.state.state !== "hide" ? 1 : 0,
				x: left,
				y: top,
			}}
			transition={{
				opacity: { duration: props.state.state === "hide" ? 0 : 0.2, ease: [0.4, 0, 0.1, 1] },
				x: { duration: props.state.state === "moveTo" ? 0.2 : 0, ease: [0.4, 0, 0.1, 1] },
				y: { duration: props.state.state === "moveTo" ? 0.2 : 0, ease: [0.4, 0, 0.1, 1] },
			}}
		>
			<Content
				style={{
					x: tX,
				}}
			>
				<Label>{props.state.label}</Label>
				<Shortcut>{props.state.shortcut}</Shortcut>
			</Content>
		</Wrap>
	);
};
