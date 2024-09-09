import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { defaultLayoutTransition } from "../index";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: relative;
	overflow: hidden;
	/* background-color: magenta; */
	/* opacity: 0.1; */
`;

export const Tile = ({ id, children }) => {
	const tome = useContext(TomeContext);
	const { tileWidth, tileHeight, tileCornerRadius, tilePadding } = tome.metrics;

	return (
		<Wrap
			style={{
				width: tileWidth,
				height: tileHeight,
				borderRadius: tileCornerRadius,
				padding: tilePadding,
			}}
			transition={defaultLayoutTransition}
		>
			{children}
		</Wrap>
	);
};
