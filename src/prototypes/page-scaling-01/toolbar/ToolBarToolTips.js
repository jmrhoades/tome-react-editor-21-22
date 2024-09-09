import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const ToolTipWrap = styled(motion.div)`
	position: absolute;
	top: 12px;
	right: 64px;
	background: #1f001f;
	/* background-color: rgba(237, 0, 235, 1); */
	box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	pointer-events: none;
	height: 26px;
	overflow: hidden;
`;

const ToolTips = styled(motion.div)`
position: absolute;
right: 0;
`;

const ToolTip = styled(motion.div)`
	color: rgba(237, 0, 235, 1);
	/* color: white; */
	line-height: 18px;
	font-size: 12px;
	padding: 4px 6px;
	white-space: nowrap;
	text-align: right;
`;

const Label = styled(motion.span)`
	
`;

const Shortcut = styled(motion.span)`
	display: inline-block;
	width: 16px;
	line-height: 16px;
	text-align: center;
	background: rgba(237, 0, 235, 0.12);
	border-radius: 2px;
	margin-left: 8px;
`;

const toolTipSpring = {
	type: "spring",
	stiffness: 500,
	damping: 40,
	mass: 1,
};

const toolTipTween = {
	type: "tween",
	duration: 0.2,
};

const labelWrapVariants = {
	showButton0: {
		y: [0, 0],
	},
	hideButton0: {
		y: 0,
	},
	moveToButton0: {
		y: 0,
	},
	showButton1: {
		y: [-26, -26],
	},
	hideButton1: {
		y: -26,
	},
	moveToButton1: {
		y: -26,
	},
	showButton2: {
		y: [-52, -52],
	},
	hideButton2: {
		y: -52,
	},
	moveToButton2: {
		y: -52,
	},
	showButton3: {
		y: [-78, -78],
	},
	hideButton3: {
		y: -78,
	},
	moveToButton3: {
		y: -78,
	},
	showButton4: {
		y: [-104, -104],
	},
	hideButton4: {
		y: -104,
	},
	moveToButton4: {
		y: -104,
	},
};

const widths = [83, 132, 97, 149, 122];

const toolTipWrapVariants = {
	hideButton0: {
		y: 0,
		width: widths[0],
		opacity: 0,
	},
	showButton0: {
		y: [0, 0],
		width: [widths[0], widths[0]],
		opacity: 1,
	},
	moveToButton0: {
		y: 0,
		width: widths[0],
		opacity: 1,
	},
	hideButton1: {
		y: 52,
		width: widths[1],
		opacity: 0,
	},
	showButton1: {
		y: [52, 52],
		width: [widths[1], widths[1]],
		opacity: 1,
	},
	moveToButton1: {
		y: 52,
		width: widths[1],
		opacity: 1,
	},
	hideButton2: {
		y: 104,
		width: widths[2],
		opacity: 0,
	},
	showButton2: {
		y: [104, 104],
		width: [widths[2], widths[2]],
		opacity: 1,
	},
	moveToButton2: {
		y: 104,
		width: widths[2],
		opacity: 1,
	},
	hideButton3: {
		y: 156,
		width: widths[3],
		opacity: 0,
	},
	showButton3: {
		y: [156, 156],
		width: [widths[3], widths[3]],
		opacity: 1,
	},
	moveToButton3: {
		y: 156,
		width: widths[3],
		opacity: 1,
	},
	hideButton4: {
		y: 208,
		width: widths[4],
		opacity: 0,
	},
	showButton4: {
		y: [208, 208],
		width: [widths[4], widths[4]],
		opacity: 1,
	},
	moveToButton4: {
		y: 208,
		width: widths[4],
		opacity: 1,
	},
};

export const ToolBarToolTips = props => {
	const state = props.toolTipState.state + "Button" + props.toolTipState.button;
	return (
		<ToolTipWrap animate={state} variants={toolTipWrapVariants} transition={toolTipTween} initial="hideButton0">
			<ToolTips variants={labelWrapVariants} transition={toolTipSpring}>
				{props.info.map(({ toolTip, shortcut }, i) => (
					<ToolTip
						key={i}
						animate={{ opacity: props.toolTipState.button === i ? 1 : 0 }}
						transition={{ duration: 0.2 }}
					>
						<Label>{toolTip}</Label>
						<Shortcut>{shortcut}</Shortcut>
					</ToolTip>
				))}
			</ToolTips>
		</ToolTipWrap>
	);
};
