import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "./IconButtonGlyphs";

const buttonWidth = 84;
const buttonHeight = 40;
const buttonLabelWidth = 80;
const buttonIconWidth = 40;

const ButtonWrap = styled(motion.div)`
	position: relative;
	width: ${props => props.width}px;
`;

const Content = styled(motion.div)`
	position: relative;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	overflow: hidden;
`;

const Background = styled(motion.div)`
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.08);
	/* background-color: magenta; */
	position: absolute;
	top: 0px;
	left: 0px;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	/* opacity: 0; */
`;

const Label = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	line-height: ${props => props.height}px;
	width: ${props => props.width}px;
	text-align: center;
	color: rgba(255, 255, 255, 1);
`;

const IconWrap = styled(motion.div)`
	position: absolute;
	top: calc((40px - 28px) / 2);
	left: calc((80px - 28px) / 2);
	width: 28px;
	height: 28px;
	line-height: 1;
	&svg {
		display: block;
	}
`;

const buttonVariants = {
	defaultDefault: {
		opacity: 1,
	},
	defaultHover: {
		opacity: 1,
	},
	activeDefault: {
		opacity: 1,
	},
	activeHover: {
		opacity: 1,
	},
};

const buttonBackgroundVariants = {
	defaultDefault: {
		opacity: 0,
		x: 0,
		width: buttonLabelWidth,
	
	},
	defaultHover: {
		opacity: 1,
		x: 0,
		width: buttonLabelWidth,
	
	},
	activeDefault: {
		opacity: 0,
		x: (buttonLabelWidth - buttonIconWidth) / 2,
		width: buttonIconWidth,
	
	},
	activeHover: {
		opacity: 1,
		x: (buttonLabelWidth - buttonIconWidth) / 2,
		width: buttonIconWidth,
	},
};

const buttonLabelVariants = {
	defaultDefault: {
		opacity: 0.4,
		transition: { duration: 0.1 },
	},
	defaultHover: {
		opacity: 0.8,
		transition: { duration: 0.2 },
	},
	activeDefault: {
		opacity: 0,
		transition: { duration: 0.1 },
	},
	activeHover: {
		opacity: 0,
		transition: { duration: 0.1 },
	},
};

const buttonIconVariants = {
	defaultDefault: {
		opacity: 0,
		scale: 0,
		transition: { duration: 0.1 },
	},
	defaultHover: {
		opacity: 0,
		scale: 0,
		transition: { duration: 0.2 },
	},
	activeDefault: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.1 },
	},
	activeHover: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.1 },
	},
};

export const PresentToggle = props => {
	const [buttonState, setButtonState] = useState("default");
	const [isHovered, setIsHovered] = useState("Default");

	const s = buttonState + isHovered;

	return (
		<ButtonWrap
			width={buttonWidth}
			animate={s}
			initial={s}
			variants={buttonVariants}
			onMouseEnter={e => {
				setIsHovered("Hover");
				if (props.tooltipLabel) {
					props.showTooltip({
						rect: e.target.getBoundingClientRect(),
						label: props.tooltipLabel,
						shortcut: props.tooltipShortcut,
						alignment: props.tooltipAlignment,
					});
				}
			}}
			onMouseLeave={() => {
				setIsHovered("Default");
				if (props.hideTooltip) {
					props.hideTooltip();
				}
			}}
			onTap={() => {
				if (props.setEditorState && props.editorState) {
					if (props.editorState === "presenting") {
						props.setEditorState("editing");
						setButtonState("default");
					} else {
						props.setEditorState("presenting");
						setButtonState("active");
						if (props.onPanelClose) {
							props.onPanelClose();
						}
					}
				}

				if (props.onTap) {
					props.onTap();
				}
				if (props.hideTooltip) {
					props.hideTooltip();
				}
			}}
			whileTap={{ scale: 0.95 }}
		>
			<Content width={buttonLabelWidth} height={buttonHeight}>
				<Background width={buttonLabelWidth} height={buttonHeight} variants={buttonBackgroundVariants} />
				<Label height={buttonHeight} width={buttonLabelWidth} variants={buttonLabelVariants}>
					Present
				</Label>
				<IconWrap variants={buttonIconVariants}>
					<Icon name={"exit"} />
				</IconWrap>
			</Content>
		</ButtonWrap>
	);
};
