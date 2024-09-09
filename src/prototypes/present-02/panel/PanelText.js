import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { defaultLayoutSpring } from "../index";

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

export const PanelText = props => {
	return (
		<Wrap
			height={228}
			initial={{ opacity: 0, scale: 0.9, x: 0 }}
			animate={{ opacity: 1, scale: 1.0, x: 0 }}
			exit={{ opacity: 0, scale: 0.9, x: 0 }}
			transition={{
                scale: defaultLayoutSpring,
                opacity: { type: "tween", duration: 0.1 },
            }}
		>
			<motion.div variants={editorModeVariants} animate={props.editorState}>
			<Image i="./images/page-resize-02-texttile-240x228.png" />
			</motion.div>
		</Wrap>
	);
};
