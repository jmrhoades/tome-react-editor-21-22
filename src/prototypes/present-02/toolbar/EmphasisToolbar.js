import React from "react";
import styled from "styled-components";

import { Button } from "../../../ds/Button";
import { defaultLayoutTransition } from "../index";

import { motion } from "framer-motion";

const ToolBarWrap = styled(motion.div)`
	position: absolute;
	top: 0;

	padding: 10px 12px;
	border-radius: 10px;
	/* background-color: #121212; */
`;

const ButtonWrap = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(4, auto);
	column-gap: 16px;
`;

const toolbarButtons = [
	{
		icon: "ArrowCursor",
		toolTip: "Click Focus",
		shortcut: "1",
		activeColor: "rgba(255, 255, 255, 1)",
	},
	{
		icon: "RectSelect",
		toolTip: "Draw Focus",
		shortcut: "2",
		activeColor: "rgba(255, 255, 255, 1)",
	},
	{
		icon: "Scribble",
		toolTip: "Scribble",
		shortcut: "3",
		activeColor: "rgba(255, 229, 0, 1)",
		activeBackgroundColor: "rgba(255, 229, 0, 0.1)",
	},
	{
		icon: "Flashlight",
		toolTip: "Shine",
		shortcut: "4",
		activeColor: "rgba(255, 255, 255, 1)",
	},
];

export const EmphasisToolbar = props => {
	const gapY = (props.windowSize.height - props.pageHeight.get()) / 2;

	const startY = props.windowSize.height - gapY + (gapY - 60) / 2;

	const editorModeVariants = {
		editing: {
			opacity: 0,
			y: startY,
			scale: 0.95,
		},
		presenting: {
			opacity: 1,
			y: startY,
			scale: 1.0,
		},
	};

	return (
		<ToolBarWrap
			animate={props.editorState}
			variants={editorModeVariants}
			transition={defaultLayoutTransition}
			initial={false}
		>
			<ButtonWrap
				animate={{
					opacity: (props.imageTileClickEmphasized || props.textTileClickEmphasized || props.textTileBlockClickEmphasized) ? 0 : 1,
				}}
				transition={{
					duration: 0.25,
					ease: [0.4, 0, 0.1, 1],
				}}
			>
				{toolbarButtons.map(({ icon, activeColor, activeBackgroundColor }, i) => (
					<Button
						key={icon}
						kind="icon"
						icon={icon}
						selected={props.activeEmphasisTool === icon}
						selectedColor={activeColor}
						activeBackgroundColor={activeBackgroundColor}
						onTap={() => {
							props.setActiveEmphasisTool(icon);
						}}
					/>
				))}
			</ButtonWrap>
		</ToolBarWrap>
	);
};
