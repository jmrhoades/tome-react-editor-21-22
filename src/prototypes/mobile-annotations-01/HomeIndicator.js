import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	position: absolute;
	bottom: 4px;
	left: 0;
	width: 375px;
	height: 82px;
	background-image: url(/images/home-indicator.png);
	background-size: 375px 82px;
	background-repeat: no-repeat;
	pointer-events: none;
`;

export const HomeIndicator = props => {
	return <Wrap />;
};
