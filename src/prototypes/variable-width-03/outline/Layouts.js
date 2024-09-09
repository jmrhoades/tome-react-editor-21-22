import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { transitions } from "../ds/Transitions";
import { LayoutTemplate } from "./LayoutTemplates";

import useSound from "use-sound";

// button_45
// button_38
// click_01
// pop_08
import add_page_sound from "../../../sounds/button_38.mp3";

const Panel = styled(motion.div)`
	position: absolute;
	padding-left: 14px;
	padding-bottom: 14px;
`;

const Background = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const Title = styled(motion.div)`
	position: relative;
	font-family: "Inter";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	padding-top: 16px;
	padding-bottom: 17px;
`;

const LayoutOptions = styled(motion.div)`
	position: relative;
	display: flex;
	flex-flow: row wrap;
	gap: 16px;
`;

const Hover = styled(motion.div)`
	position: absolute;
`;

const Active = styled(motion.div)`
	position: absolute;
`;

const LayoutBorder = styled(motion.div)`
	position: absolute;
`;

const ContentWrap = styled(motion.div)`
	position: absolute;
	top: 2px;
	left: 2px;
	right: 2px;
	bottom: 2px;
`;
const Shadow = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Tooltip = styled(motion.div)`
	position: absolute;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 6px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;

	white-space: nowrap;

	/* T/9 (100W) */
	color: #ffffff;

	/* Z/4 (100W) */
	background: #333333;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	border-radius: 6px;
`;

const Layout = styled(motion.div)`
	h1 {
		font-weight: 800;
		font-size: 10px;
		line-height: 120%;
		width: 100%;
		padding-left: 6px;
		padding-top: 7px;
		text-align: left;
	}
	h2 {
	}
	p {
		font-weight: 400;
		font-size: 9px;
		line-height: 120%;
		margin-top: 0px;
		padding-left: 6px;
		padding-top: 3px;
		height: auto;
		text-align: left;
		margin-block: auto;
	}
`;

const panelHeight = 428;

const panelVariants = {
	visible: { x: 0, opacity: 1, scale: 1 },
	hidden: { opacity: 0, x: -64, scale: 0.75 },
};

const layoutVariants = {
	visible: { x: 0, opacity: 1, scale: 1 },
	hidden: { opacity: 0, x: -20, scale: 0.75 },
};

export const LayoutsPanel = props => {
	let top = props.panelY;

	if (top + panelHeight / 2 >= window.innerHeight - 32) {
		top = window.innerHeight - panelHeight / 2 - 32;
	}

	const [chosenId, setChosenId] = React.useState(false);
	const [hoveredId, setHoveredId] = React.useState(null);

	//console.log(top,  window.innerHeight)

	return (
		<Panel
			style={{
				width: 288,
				left: 128,
				top: top,
				y: "-50%",
				color: props.theme.colors.t9,

				//pointerEvents: props.showPanel ? "auto" : "none",
				pointerEvents: "auto",
				// overflow: "hidden",
			}}
			initial="hidden"
			//animate={props.showPanel ? "visible" : "hidden"}
			variants={panelVariants}
			transition={transitions.panelShow}
			exit={{
				x: -64,
				scale: 0.9,
				opacity: 0,
				transition: transitions.instant,
			}}
			animate={"visible"}
		>
			<Background
				style={{
					borderRadius: 16,
					background: props.theme.colors.backgrounds.panel,
					boxShadow: props.theme.shadows.panel,
					visibility: chosenId ? "hidden" : "visible",
				}}
			/>
			<Title
				style={{
					visibility: chosenId ? "hidden" : "visible",
				}}
				// variants={layoutVariants}
				// transition={transitions.basic}
			>
				Choose layout
			</Title>

			<LayoutOptions>
				<LayoutOption
					theme={props.theme}
					type={"Heading"}
					tooltip={"Text"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"Centered"}
					tooltip={"Centered text"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"Text&Media"}
					tooltip={"Text & Media"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"Text&Table"}
					tooltip={"Text & Table"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"Media"}
					tooltip={"Media"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"TwoMedia"}
					tooltip={"2 Media"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"Media&2Text"}
					tooltip={"Media & 2 Text"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
				<LayoutOption
					theme={props.theme}
					type={"ThreeText&Media"}
					tooltip={"3 Text & Media"}
					addPage={props.addPage}
					setChosenId={setChosenId}
					chosenId={chosenId}
					hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
				/>
			</LayoutOptions>
		</Panel>
	);
};

const LayoutOption = props => {
	let height = props.type === "Media&2Text" || props.type === "ThreeText&Media" ? 140 : 70;
	const borderRadius = 5;

	let content = LayoutTemplate({ type: props.type, theme: props.theme });

	//const [isHovering, setIsHovering] = React.useState(props.hoveredId === props.type ? true : false);
    const isHovering = props.hoveredId === props.type;
	
    const [isTooltip, setIsTooltip] = React.useState(false);
	const [isPressing, setIsPressing] = React.useState(false);
	const [isChosen, setIsChosen] = React.useState(false);

	const showTimer = React.useRef(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const toolTipY = useMotionValue(0);
	const toolTipX = useMotionValue(0);
	const zIndex = useMotionValue(0);

	const tooltipRef = React.useRef(null);
	const showTimerDuration = useMotionValue(500);
	const [playSound] = useSound(add_page_sound);

	const cancelTooltip = () => {
		if (showTimer.current) {
			clearTimeout(showTimer.current);
			showTimer.current = null;
		}
		if (isTooltip) {
			setIsTooltip(false);
		}
	};

	return (
		<Layout
			variants={layoutVariants}
			//transition={props.showPanel ? transitions.panelShow : transitions.panelHide}
			style={{
				width: 122,
				height: height,
				borderRadius: borderRadius,
				// pointerEvents: "auto",
				cursor: "pointer",
				color: props.theme.colors.t9,
				background: props.theme.colors.backgrounds.page,
				fontFamily: props.theme.typography.fontFamily,
				position: "relative",
				padding: 2,
				zIndex: zIndex,
				originX: 0.5,
				originY: 0.5,
				visibility: props.chosenId && props.chosenId !== props.type ? "hidden" : "visible",
			}}
			animate={{ scale: isChosen ? 1.2 : 1, opacity: isChosen ? 0 : 1 }}
			whileTap={{ scale: 0.975 }}
			//whileHover={{ scale: 1.025 }}
			transition={isChosen ? transitions.slow : transitions.basic}
			onHoverStart={(e, info) => {
				showTimerDuration.set(500);
				zIndex.set(10);
				
                props.setHoveredId(props.type);
                //setIsHovering(true);
			}}
			onHoverEnd={e => {
				
                props.setHoveredId(null);
                //setIsHovering(false);
				cancelTooltip();
				zIndex.set(1);
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
				setIsChosen(true);
				props.setChosenId(props.type);
				//playSound();
				props.addPage(props.type);
			}}
			onMouseMove={e => {
				if (isTooltip) {
					const slop = 10;
					if (
						e.clientX < mouseX.get() - slop ||
						e.clientX > mouseX.get() + slop ||
						e.clientY < mouseY.get() - slop ||
						e.clientY > mouseY.get() + slop
					) {
						if (showTimer.current) clearTimeout(showTimer.current);
						setIsTooltip(false);
					}
				} else {
					mouseX.set(e.clientX);
					mouseY.set(e.clientY);
				}

				if (showTimer.current) clearTimeout(showTimer.current);
				if (!isPressing) {
					showTimer.current = setTimeout(() => {
						const rect = e.target.getBoundingClientRect();
						let y = e.clientY - rect.top + 20;
						if (y > height + 12) y = height + 12;
						const x = e.clientX - rect.left;
						toolTipY.set(y);
						toolTipX.set(x - tooltipRef.current.getBoundingClientRect().width / 2);
						setIsTooltip(true);
						showTimerDuration.set(1500);
					}, showTimerDuration.get());
				}
			}}
		>
			<Shadow
				style={{
					borderRadius: borderRadius,
					// background: props.theme.colors.backgrounds.page,
					boxShadow: props.theme.shadows.layoutOutline,
				}}
				animate={{ opacity: isHovering && !isPressing ? 1 : 0 }}
				initial={{ opacity: 0, scale: 0.5 }}
				transition={transitions.slow}
			/>

			<ContentWrap
				//animate={{ background: isHovering ? props.theme.colors.t1 : props.theme.colors.t0 }}
				transition={transitions.basic}
				style={{
					background: props.theme.colors.backgrounds.page,
					borderRadius: borderRadius,
				}}
			>
				{content}
			</ContentWrap>

			<LayoutBorder
				style={{
					borderRadius: borderRadius,
					boxShadow: `0 0 0 1px ${props.theme.colors.layoutOutline}`,
					top: -1,
					left: -1,
					bottom: -1,
					right: -1,
				}}
			/>

			<Hover
				animate={{ opacity: isHovering ? 0.75 : 0 }}
				initial={{ opacity: 0 }}
				transition={transitions.basic}
				style={{
					borderRadius: borderRadius,
					boxShadow: `0 0 0 1px ${props.theme.colors.accent}`,
					top: -1,
					left: -1,
					bottom: -1,
					right: -1,
				}}
			/>

			<Active
				animate={{ opacity: isPressing || isChosen ? 1 : 0 }}
				initial={{ opacity: 0 }}
				transition={transitions.basic}
				style={{
					borderRadius: borderRadius,
					boxShadow: `0 0 0 1px ${props.theme.colors.accent}, 0 0 0 4px rgba(255,51,253, 0.04)`,
					top: -1,
					left: -1,
					bottom: -1,
					right: -1,
				}}
			/>

			<Tooltip
				ref={tooltipRef}
				style={{
					position: "absolute",
					// x: "-50%",
					// left: "50%",
					// bottom: 0,
					// y: "calc(100% + 8px)",
					top: 0,
					left: 0,
					y: toolTipY,
					x: toolTipX,
					background: props.theme.colors.backgrounds.tooltip,
					pointerEvents: "none",
				}}
				animate={{ opacity: isTooltip ? 1 : 0 }}
				initial={{ opacity: 0 }}
				transition={isTooltip ? transitions.basic : transitions.quick}
			>
				{props.tooltip}
			</Tooltip>
		</Layout>
	);
};
