import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Outline } from "../outline/Outline";
import { DiagramContext } from "../diagram/DiagramContext";
import { transitions } from "../tome/TomeContext";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	pointer-events: none;
	/* display: grid; */
`;

const barVariants = {
	editing: {
		opacity: 1,
		y: 0,
	},
	diagramExpanded: {
		opacity: 0,
		y: 50,
	},
};

export const BottomBar = props => {
	const { diagramExpanded } = useContext(DiagramContext);
	return (
		<BottomBarWrap
			variants={barVariants}
			animate={diagramExpanded ? "diagramExpanded" : "editing"}
			transition={transitions.layoutTransition}
		>
			<Outline />
		</BottomBarWrap>
	);
};
