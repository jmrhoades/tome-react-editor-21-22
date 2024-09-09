import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { InputStates } from "./Prompt";
//import { IconButton } from "../ds/Buttons";
import { Icon } from "../../../ds/Icon";
import { transitions } from "../ds/Transitions";

const Wrap = styled(motion.div)`
	width: 40px;
	height: 32px;
	position: absolute;
	bottom: 16px;
	right: 16px;

	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Tooltip = styled(motion.div)`
	position: absolute;
	pointer-events: none;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	font-family: "Inter";
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;
	white-space: nowrap;
	padding: 6px;
	border-radius: 6px;
`;

const ButtonWrap = styled(motion.div)``;

const transition = { ease: "easeOut", duration: 0.1 };

export const SubmitButton = props => {
	const isEmpty = props.state === InputStates.EMPTY;
	const opacity = isEmpty ? 0 : 1;
	const [showTooltip, setShowTooltip] = React.useState(false);
	const [isHovering, setIsHovering] = React.useState(false);
	const tooltipTimer = React.useRef(null);
	const [isPressing, setIsPressing] = React.useState(false);

	const cancelTooltip = () => {
		if (tooltipTimer.current) {
			clearTimeout(tooltipTimer.current);
			tooltipTimer.current = null;
		}
		if (showTooltip) {
			setShowTooltip(false);
		}
	};

	return (
		<Wrap
			transition={transition}
			animate={{ opacity: opacity }}
			initial={false}
			style={{
				...props.style,
				pointerEvents: isEmpty ? "none" : "auto",
			}}
			onHoverStart={e => {
				setIsHovering(true);
				if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
				if (!isPressing) {
					tooltipTimer.current = setTimeout(() => {
						setShowTooltip(true);
					}, 200);
				}
			}}
			onHoverEnd={e => {
				setIsHovering(false);
				if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
				setShowTooltip(false);
			}}
			onTapStart={e => {
				cancelTooltip();
				setIsPressing(true);
			}}
			onTapCancel={e => {
				setIsPressing(false);
			}}
			onTap={e => {
				setIsPressing(false);
				props.submit("Enter");
			}}
		>
			<ButtonWrap
				animate={{
					opacity: isHovering ? 0.6 : 0.4,
					scale: isPressing ? 0.95 : 1,
				}}
				transition={{duration: 0.2}}
				initial={false}
			>
				<Icon name={"Return"} opacity={1} color={props.theme.colors.t9} />
			</ButtonWrap>
			<Tooltip
				style={{
					top: -8,
					left: "50%",
					x: "-50%",
					y: "-100%",
					background: props.theme.colors.tooltip.background,
					color: props.theme.colors.tooltip.label,
					boxShadow: props.theme.shadows.medium,
				}}
				animate={{ opacity: showTooltip ? 1 : 0 }}
				initial={{ opacity: 0 }}
				transition={showTooltip ? { duration: 0.2 } : { duration: 0.0 }}
			>
				Submit
			</Tooltip>
		</Wrap>
	);
};
