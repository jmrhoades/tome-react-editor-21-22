import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "./TomeContext";
import { colors } from "../../ds/Colors";

const Wrap = styled(motion.div)`
	position: relative;
	overflow: hidden;
	cursor: url(/images/framer-touch-cursor.png) 32 32, auto !important;
	& * :active {
		cursor: url(/images/framer-touch-cursor-active.png) 32 32, auto !important;
	}
`;

export const Viewport = props => {
	const { viewportWidth, viewportHeight } = useContext(TomeContext);
	return (
		<Wrap
			id="viewport"
			style={{
				backgroundColor: colors.z0,
				width: viewportWidth,
				height: viewportHeight,
			}}
		>
        {props.children}
        </Wrap>
	);
};
