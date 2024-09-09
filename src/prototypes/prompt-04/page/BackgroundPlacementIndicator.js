import React from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { Icon } from "../../../ds/Icon";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Cover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.08;
`;

const BorderTop = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 2px;
`;

const BorderBottom = styled(BorderTop)`
	top: unset;
	bottom: 0;
`;

const BorderLeft = styled(BorderTop)`
	width: 2px;
	height: 100%;
`;

const BorderRight = styled(BorderLeft)`
	left: unset;
	right: 0;
`;

export const BackgroundPlacementIndicator = props => {
	return (
		<Wrap
			style={{
				opacity: props.dropIndicatorInfo.backgroundDropOpacity,
				//opacity: 1,
				pointerEvents: "none",
				transition: "opacity 0.2s ease-out",
			}}
		>
			<Cover style={{ background: props.theme.colors.accent }} />
			<BorderTop style={{ background: props.theme.colors.accent }} />
			<BorderBottom style={{ background: props.theme.colors.accent }} />
			<BorderLeft style={{ background: props.theme.colors.accent }} />
			<BorderRight style={{ background: props.theme.colors.accent }} />
		</Wrap>
	);
};
