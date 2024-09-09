/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrap = styled(motion.div)`
	
	
	
`;

const Title = styled(motion.div)`
	font-weight: 700;
	font-size: 14px;
	line-height: 48px;
	letter-spacing: -0.01em;
	color: #ffffff;
`;

const CloseButton = styled(motion.div)`
	width: 24px;
	height: 24px;
	position: relative;
`;

const CloseIcon = styled(motion.svg)`
	position: absolute;
	top: 0;
	left: 0;
	width: 24px;
	height: 24px;
	fill: rgba(255, 255, 255, 0.4);
`;

export const PanelTitleBar = props => {
	return (
		<Wrap>
			<Title>{props.title}</Title>
			
		</Wrap>
	);
};
