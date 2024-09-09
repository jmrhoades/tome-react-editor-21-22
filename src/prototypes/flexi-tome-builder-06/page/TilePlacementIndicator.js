import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
// import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

const PlacementIndicator = styled(motion.div)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	/* z-index: 2; */
`;

// const Material = styled(motion.div)`
// 	position: absolute;
// 	left: 50%;
// 	top: 50%;
// `;

export const TilePlacementIndicator = props => {
	// const { dropIndicatorSize, pageMargin } = useContext(MetricsContext).metrics;
	const { tileDropInfo } = useContext(TomeContext);
	
	const isTall = tileDropInfo.height > tileDropInfo.width;
	const borderRadius = isTall ? tileDropInfo.width/2 : tileDropInfo.height/2;
	// // const length = `calc(100% + ${pageMargin * 2}px)`;
	// const length = `100%`;

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
				backgroundColor: colors.accent,
				borderRadius: borderRadius,
			}}
		>
		</PlacementIndicator>
	);
};
