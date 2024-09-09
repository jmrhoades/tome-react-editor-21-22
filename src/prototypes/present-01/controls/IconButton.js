import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "./IconButtonGlyphs";

const ButtonWrap = styled(motion.div)`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	position: relative;
`;

const Content = styled(motion.div)`
	width: 40px;
	height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(${props => props.x}px);
    & svg {
		position: absolute;
		top: 6px;
		left: 6px;
	}
`;

const ButtonBackground = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 40px;
	height: 40px;
	border-radius: 10px;
	background-color: rgba(28, 28, 28, 1.0);
	opacity: 0;
`;

const ActiveButtonBackground = styled(ButtonBackground)`
	background-color: ${props => props.color};
`;

const Outline = styled(ButtonBackground)`
	background-color:transparent;
	border: 2px solid rgba(255, 255, 255, 0.08);
	opacity: 1;
`;

const buttonVariants = {
	hover: {
		opacity: 1,
	},
	default: {
		opacity: 1,
	},
	active: {
		opacity: 1,
	},
};

const buttonBackgroundVariants = {
	hover: {
		opacity: 1,
		transition: { duration: 0.0 },
	},
	default: {
		opacity: 0,
		transition: { duration: 0.1 },
	},
	active: {
		opacity: 0,
		transition: { duration: 0.1 },
	},
};

const activeButtonBackgroundVariants = {
	hover: {
		opacity: 0,
		transition: { duration: 0.1 },
	},
	default: {
		opacity: 0,
		transition: { duration: 0.1 },
	},
	active: {
		opacity: 1,
		transition: { duration: 0.1 },
	},
};

export const IconButton = props => {
	const [buttonState, setButtonState] = useState("default");
	const ref = useRef();

	useEffect(() => {
		setButtonState(props.active ? "active" : "default");
	}, [props.active]);

	return (
		<ButtonWrap
			ref={ref}
            width={props.width ? props.width : 40}
            height={props.height ? props.height : 40}
			animate={buttonState}
			initial={buttonState}
			variants={buttonVariants}
			whileTap={{ scale: 0.95 }}
			onMouseEnter={e => {
				if (buttonState === "default") {
					setButtonState("hover");
				}
				if (props.tooltipLabel) {
					props.showTooltip({
						rect: ref.current.getBoundingClientRect(),
						label: props.tooltipLabel,
						shortcut: props.tooltipShortcut,
                        alignment: props.tooltipAlignment,
					});
				}
			}}
			onMouseLeave={() => {
				if (buttonState === "hover") {
					setButtonState("default");
				}
				if (props.hideTooltip) {
					props.hideTooltip();
				}
			}}
			onTap={props.onTap}
		>
			<Content
				x={props.center ? (props.width - 40) / 2: 0}
			>
                {props.type === "tile" && <Outline /> }
				<ButtonBackground variants={buttonBackgroundVariants} />
			    <ActiveButtonBackground variants={activeButtonBackgroundVariants} color={props.activeBackgroundColor ? props.activeBackgroundColor : "rgba(51, 20, 51, 1)"}/>
			    <Icon name={props.name} activeColor={props.activeColor} />
				
            </Content>
		</ButtonWrap>
	);
};
