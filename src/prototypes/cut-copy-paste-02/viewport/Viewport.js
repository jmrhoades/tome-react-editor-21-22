import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../ds/Colors";

const Wrap = styled(motion.div)`
	max-width: 100%;
	height: auto;
	overflow-x: hidden;
	overflow-y: hidden;

`;

export const Viewport = props => {
	return (
		<Wrap
			id="viewport"
			style={{
				backgroundColor: colors.z0,
			}}
		>
			{props.children}
		</Wrap>
	);
};
