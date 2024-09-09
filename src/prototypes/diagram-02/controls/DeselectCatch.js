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
	const {
		setSelectedTile,
		setPanelOpen,
		setPanelName,
		setShowComments,
		pointerOverInteractiveSurface,
		setSelectedThumbnail,
	} = useContext(TomeContext);

	return (
		<Wrap
			onMouseEnter={() => {
				pointerOverInteractiveSurface.set(0);
			}}
			onMouseLeave={() => {
				pointerOverInteractiveSurface.set(1);
			}}
			onTap={() => {
				setSelectedTile(null);
				setPanelOpen(false);
				setPanelName("");
				setShowComments(false);
				setSelectedThumbnail(null);
			}}
		></Wrap>
	);
};
