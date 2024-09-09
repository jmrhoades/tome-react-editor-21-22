import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";

const PlacementIndicator = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	z-index: 2;
`;

const Material = styled(motion.div)`
	position: absolute;
	top: 15%;
	bottom: 15%;
	left: 0%;
    width: 100%;
	transform: translateX(0%);
	/* border-radius: 2px; */
`;

const handleWidth = 6;

export const TilePlacementIndicator2Up = props => {
	const { pageLeft, pageTop, minPageHeight, columnGridUnit } = useContext(MetricsContext).metrics;
	const { tileDropPoint } = useContext(TomeContext);

	const [handle1Left, setHandle1Left] = useState(0);
	const [indicatorOpacity, setIndicatorOpacity] = useState(0);

	const offset = pageLeft - (handleWidth / 2);

	useEffect(() => {
		tileDropPoint.onChange(latest => {
			// console.log("tileDropPoint", latest);
			//menuX.set(810 + latest);
			if (latest !== -1) {
				setHandle1Left((latest * columnGridUnit) + offset);
			}

			setIndicatorOpacity(latest === -1 ? 0 : 1);
		});
	}, [indicatorOpacity, setIndicatorOpacity, columnGridUnit, offset, tileDropPoint]);

	return (
		<PlacementIndicator
			transition={{ duration: indicatorOpacity === 1 ? 0.25 : 0 }}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: indicatorOpacity,
			}}
			style={{
				top: pageTop,
				height: minPageHeight,
				width: handleWidth,
				left: handle1Left,
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
