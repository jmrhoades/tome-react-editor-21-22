import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { TomeContext } from "../tome/TomeContext";

const PlacementIndicator = styled(motion.div)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
`;

const Material = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 2px;
`;

export const TilePlacementIndicator = props => {
	
	const { tileDropInfo } = useContext(TomeContext);

	return (
		<PlacementIndicator
			transition={{ duration: tileDropInfo.show ? 0.25 : 0 }}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: tileDropInfo.show ? [0, 1] : 0,
			}}
			style={{
				x: tileDropInfo.x,
				y: tileDropInfo.y,
				height: tileDropInfo.height,
				width: tileDropInfo.width,
			}}
		>
			<Material
				animate={{
					backgroundColor: colors.accent,
				}}
			/>
		</PlacementIndicator>
	);
};
