import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "./TomeContext";
import { transitions } from "../../ds/Transitions";

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	border-radius: 10px;
	pointer-events: auto;
`;

export const TileImage = props => {
	const { expandedTileID, hideChrome } = useContext(TomeContext);

	return (
		<Image
			transition={transitions.layoutTransition}
			onTap={e => {
				// activeAnnotationID.set("");
				if (expandedTileID.get() !== props.tileID) {
					expandedTileID.set(props.tileID);
				} else {
					if (hideChrome.get() === 0) {
						hideChrome.set(1);
					} else {
						hideChrome.set(0);
					}
				}
			}}
			image={props.image}
		/>
	);
};
