import React, {useContext} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../ds/Transitions";
import { MetricsContext } from "./MetricsContext";

const Wrap = styled(motion.div)`
	position: absolute;
    overflow: hidden;
`;

export const Tile = props => {
	const {
		tileHalfSize,
        tileTop,
        tileCornerRadius,
		tile1Left,
		tile2Left,
	} = useContext(MetricsContext).metrics;

	return (
		<Wrap
			id={props.id}
            layout
            transition={transitions.layoutTransition}
			style={{
				// backgroundColor: colors.z2,
				// backgroundColor: "cornflowerblue",
				width: tileHalfSize,
				height: tileHalfSize,
				borderRadius: tileCornerRadius,
				left: props.order === 1 ? tile1Left : tile2Left,
				top: tileTop,
			}}
		>
			{props.children}
		</Wrap>
	);
};
