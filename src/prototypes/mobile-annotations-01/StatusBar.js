import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { TomeContext } from "./TomeContext";
import { transitions } from "../../ds/Transitions";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 375px;
	height: 44px;
	background-image: url(/images/status-bar-375-44.png);
	background-size: 375px 44px;
	background-repeat: no-repeat;
	pointer-events: none;
`;

export const StatusBar = props => {
	const { expandedTileID } = useContext(TomeContext);

	const expandTileAnimation = useAnimation();

	useEffect(
		() =>
			expandedTileID.onChange(latest => {
				if (latest !== "") {
					expandTileAnimation.start({
						opacity: 0,
					});
				} else {
					expandTileAnimation.start({
						opacity: 1,
					});
				}
			}),
			// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return <Wrap transition={transitions.layoutTransition} animate={expandTileAnimation} />;
};
