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


export const PanelTitleBar = props => {
	return (
		<Wrap>
			<Title>{props.title}</Title>
			
		</Wrap>
	);
};
