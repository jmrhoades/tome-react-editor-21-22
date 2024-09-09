import React, {useContext} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: relative;
	height: ${props => props.height}px;
	width: 100%;
`;

const Image = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url("${props => props.i}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const PanelImage = props => {
	const tome = useContext(TomeContext);
	return (
		<Wrap
			height={320}
			initial={{ opacity: 0, scale: 0.9, x: 0 }}
			animate={{ opacity: 1, scale: 1.0, x: 0 }}
			exit={{ opacity: 0, scale: 0.9, x: 0 }}
			transition={tome.panelTransition}
		>
			<motion.div variants={editorModeVariants} animate={props.editorState}>
			<Image i="./images/page-resize-02-imagetile-240x320.png" />
			</motion.div>
		</Wrap>
	);
};
