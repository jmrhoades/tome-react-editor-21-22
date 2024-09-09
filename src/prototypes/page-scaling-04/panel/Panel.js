import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { metrics, toolbarButtons, defaultLayoutTransition } from "../index";

const Wrap = styled(motion.div)`
	position: absolute;
	right: ${props => props.panelRight}px;
	width: 240px;
	top: 0;
`;

const ImagePanel = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 240px;
	height: ${props => props.h}px;
	background-image: url("${props => props.i}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;

const layoutSpring = { 
	type: "spring",
    stiffness: 550,
    damping: 30,
 };



export const Panel = props => {
	return (
		<Wrap
			panelRight={metrics.cPanelRight}
			initial={false}
			animate={{
				x: props.panelOpen ? 0 : 60,
				opacity: props.panelOpen ? 1 : 0,
			}}
			transition={defaultLayoutTransition}
		>
			{toolbarButtons.map(({ name, panelImage, panelHeight }, i) => (
				<ImagePanel
					i={panelImage}
					h={panelHeight}
					key={i}
					initial={false}
					animate={{
						scale: props.panelName === name ? 1 : 0.9,
						opacity: props.panelName === name ? 1 : 0,
					}}
					transition={{
						scale: layoutSpring,
						opacity: { type: "tween", duration: 0.1 },
					}}
					style={{
						y: (props.windowSize.height - panelHeight) / 2,
					}}
				/>
			))}
		</Wrap>
	);
};
