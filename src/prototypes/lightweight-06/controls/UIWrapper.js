import React, { useContext } from "react";
import { TomeContext, transitions, editorStates } from "../tome/TomeContext";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const uiVariants = {
	show: {
		opacity: 1,
	},
	hide: {
		opacity: 0,
	},
};

export const UIWrapper = props => {
	const { showUI, editorState } = useContext(TomeContext);
	return (
		<Wrap
			animate={showUI && editorState === editorStates.EDITING ? "show" : "hide"}
			variants={uiVariants}
			transition={transitions.defaultTransition}
		>
			{props.children}
		</Wrap>
	);
};
