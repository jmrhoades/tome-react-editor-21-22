import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { TomeContext } from "./TomeContext";
import { transitions } from "../../ds/Transitions";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0;
	width: 375px;
	height: 70px;
	pointer-events: none;
`;

const CloseButton = styled(motion.div)`
	width: 70px;
	height: 70px;
	background-image: url(/images/ios-expand-close.png);
	background-size: 70px 70px;
	background-repeat: no-repeat;
	pointer-events: auto;
`;

export const ExpandModeToolbar = props => {
	const { expandedTileID, hideChrome } = useContext(TomeContext);
	const expandTileAnimation = useAnimation();

	useEffect(() => {
		expandedTileID.onChange(latest => {
			if (latest !== "") {
				expandTileAnimation.start({
					opacity: 1,
				});
			} else {
				expandTileAnimation.start({
					opacity: 0,
				});
			}
		});

		hideChrome.onChange(latest => {
			if (hideChrome.get() === 1) {
				expandTileAnimation.start({
					opacity: 0,
				});
			} else {
				expandTileAnimation.start({
					opacity: 1,
				});
			}
		});
// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Wrap transition={transitions.layoutTransition} animate={expandTileAnimation} initial={{ opacity: 0 }}>
			<CloseButton
				onTap={event => {
					// activeAnnotationID.set("");
					if(hideChrome.get() === 1) return;
					expandedTileID.set("");
					hideChrome.set(0);
				}}
			/>
		</Wrap>
	);
};
