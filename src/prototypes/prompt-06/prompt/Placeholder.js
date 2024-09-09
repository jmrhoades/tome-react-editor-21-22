import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { InputStates } from "./Prompt";
import { Icon } from "../../../ds/Icon";
import { Info } from "./Info";

const Wrap = styled(motion.div)`
	width: 100%;
	position: absolute;

	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;
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

const InfoHover = styled(motion.div)`
	cursor: pointer;
	position: relative;
`;

const transition = { ease: "easeOut", duration: 0.1 };

export const Placeholder = props => {
	let opacity = 0;
	if (props.state === InputStates.EMPTY) opacity = 1;
	const infoOpacity = useMotionValue(0);
	const [isHovering, setIsHovering] = useState(false);
	return (
		<Wrap
			transition={transition}
			animate={{ opacity: opacity }}
			initial={false}
			style={{
				...props.style,
				color: props.theme.colors.t7,
				top: 20,
			}}
		>
			<Label $shineLightness={props.theme.mode === "light" ? "0%" : "100%"}>{props.label}</Label>

			<InfoHover
				onHoverStart={e => {
					// console.log("show");
					infoOpacity.set(1);
					setIsHovering(true);
				}}
				onHoverEnd={e => {
					// console.log("hide");
					infoOpacity.set(0);
					setIsHovering(false);
				}}
				style={{
					pointerEvents: "auto",
				}}
			>
				<Icon
					name="Info"
					size={28}
					opacity={1}
					color={isHovering ? props.theme.colors.t8 : props.theme.colors.t7}
				/>
				<Info theme={props.theme} show={true} infoOpacity={infoOpacity} />
			</InfoHover>
		</Wrap>
	);
};
