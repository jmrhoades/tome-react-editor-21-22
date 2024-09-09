import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { transitions } from "../../../ds/Transitions";
import { TomeContext } from "../tome/TomeContext";
import { IconButton } from "../ds/Buttons";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	pointer-events: none;
	z-index: 10;
	height: 56px;
`;

const LeftGroup = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 10px;
	height: 100%;
	gap: 4px;
`;

const RightGroup = styled(motion.div)`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 16px;
	height: 100%;
	gap: 8px;
`;

export const Bottombar = props => {
	const { isPlayMode, currentPage } = useContext(TomeContext);

	const fade = transitions.playModeFade;

	return (
		<Wrap
			initial={false}
			transition={fade}
			animate={{
				opacity: isPlayMode ? 0 : 1,
			}}
			style={{
				pointerEvents: isPlayMode ? "none" : "auto",
			}}
		>
			<LeftGroup></LeftGroup>

			<RightGroup
				
			>
				<IconButton icon="Help" theme={currentPage.theme} height={40} hasHover={false} />
			</RightGroup>
		</Wrap>
	);
};
