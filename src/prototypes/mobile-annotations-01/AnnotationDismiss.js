import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "./TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const AnnotationDismiss = props => {
	
	const { activeAnnotationID } = useContext(TomeContext);

	return (
		<Wrap
			style={{
				//pointerEvents: activeAnnotationID ? "auto" : "none",
			}}
			onTap={() => {
				activeAnnotationID.set(null);
			}}
		></Wrap>
	);
};
