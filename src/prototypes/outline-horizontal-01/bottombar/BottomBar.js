import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Outline } from "../outline/Outline";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	pointer-events: auto;
`;

export const BottomBar = props => {
	return (
		<BottomBarWrap>
			<Outline />
		</BottomBarWrap>
	);
};
