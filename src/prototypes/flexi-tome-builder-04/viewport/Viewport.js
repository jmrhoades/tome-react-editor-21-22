import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";

const Wrap = styled(motion.div)`
	width: 100%;
	min-height: 100%;
	
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
