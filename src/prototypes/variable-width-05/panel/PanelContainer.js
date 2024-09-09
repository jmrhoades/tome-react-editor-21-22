import React, { useLayoutEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { panelNames } from "../page/TileConstants";

const Container = styled(motion.div)`
	position: relative;
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 12px;
	pointer-events: auto;
`;

export const PanelBackground = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;


export const PanelWrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 12px;
	padding-top: 0;
`;


export const Section = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const SectionTitle = props => {
	return (
		<div
			style={{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 400,
				fontSize: "11px",
				lineHeight: "14px",
				color: props.theme.colors.t7,
				position: "relative",
				pointerEvents: "none",
			}}
		>
			{props.children}
		</div>
	);
};

export const ControlGroup = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const ColorRow = styled(motion.div)`
	display: flex;
	flex-direction: row;
	gap: 10px;
`;

export const ButtonStack = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 6px;
`;

export const ButtonPair = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 6px;
`;

export const PanelContainer = props => {
	const { currentPage, panelName, selectedTile } = React.useContext(TomeContext);

	const constraintsRef = React.useRef();

	React.useLayoutEffect(() => {
		const v = document.getElementById("panel_drag_constraints");
		constraintsRef.current = v;
	});

	const panelX = useMotionValue(0);
	const panelY = useMotionValue(0);

	React.useEffect(() => {
		panelX.set(0);
		panelY.set(0);
	}, [panelName, selectedTile]);

	return (
		<></>
	);
};
