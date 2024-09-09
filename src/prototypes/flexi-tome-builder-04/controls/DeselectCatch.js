import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

export const DeselectCatch = props => {
	const { selectedTile, setSelectedTile, setSidePanelOpen, setSelectedOutlinePage } = useContext(TomeContext);

	return (
		<Wrap
			onMouseEnter={() => {
				// setPointerOverInteractiveSurface(false);
			}}
			onMouseLeave={() => {
				// setPointerOverInteractiveSurface(true);
			}}
			onTap={() => {
				if (selectedTile) {
					setSelectedTile(null);
					return;
				}

				setSidePanelOpen(false);
				setSelectedOutlinePage(false);
			}}
		></Wrap>
	);
};
