import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Icon } from "./ToolBarButtonIcon";

const ButtonWrap = styled(motion.div)`
	width: 64px;
	height: 52px;
	position: relative;
	& svg {
		position: absolute;
		top: 12px;
		left: 12px;
	}
`;

const ButtonBackground = styled(motion.div)`
	position: absolute;
	top: 6px;
	left: 6px;
	width: 40px;
	height: 40px;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.08);
	opacity: 0;
`;

const ActiveButtonBackground = styled(ButtonBackground)`
    background-color: rgba(51, 20, 51, 1);
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

export const ToolBarButton = props => {
	const [buttonState, setButtonState] = useState("default");

	useEffect(() => {
		setButtonState(props.active ? "active" : "default");
	}, [props.active]);

	return (
		<ButtonWrap
			animate={buttonState}
			initial={buttonState}
			variants={buttonVariants}
			onMouseEnter={() => {
				if (buttonState === "default") {
					setButtonState("hover");
				}
				props.onMouseEnter(props.id)
			}}
			onMouseLeave={() => {
				if (buttonState === "hover") {
					setButtonState("default");
				}
				props.onMouseLeave(props.id)
			}}
			onTap={props.onTap}
		>
            
			<ButtonBackground variants={buttonBackgroundVariants} />
            <ActiveButtonBackground variants={activeButtonBackgroundVariants} />
			<Icon name={props.name} />
		</ButtonWrap>
	);
};
