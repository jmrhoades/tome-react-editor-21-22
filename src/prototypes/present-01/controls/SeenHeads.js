import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	padding: 5px 8px;
    position: relative;
`;

const Content = styled(motion.div)`
	background-image: url("./images/ui-seen-heads-152x22.png");
	background-size: 152px 22px;
	width: 152px;
	height: 22px;
`;

const Hover = styled(motion.span)`
	display: block;
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.08);
	border-radius: 4px;
	opacity: 1;
`;

const hoverVariants = {
	default: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	active: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0,
	},
};

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.975,
	},
	disabled: {
		opacity: 0.5,
	},
};

export const SeenHeads = props => {
	return (
		<Wrap
            whileTap="active"
            whileHover="hover"
            initial={"default"}
            variants={buttonVariants}
        >
			<Hover variants={hoverVariants} />
			<Content />
		</Wrap>
	);
};
