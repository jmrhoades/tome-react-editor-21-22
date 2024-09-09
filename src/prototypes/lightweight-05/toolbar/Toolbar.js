import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext, transitions } from "../tome/TomeContext";
import { panels } from "../panel/Panel";

const Wrap = styled(motion.div)`
	position: absolute;
	right: 12px;
	pointer-events: auto;
`;

const ButtonWrap = styled(motion.div)`
	position: relative;
	display: flex;
	flex-direction: column;
	& > button {
		margin: 4px 0;
	}
`;

/*
const Separator = styled(motion.div)`
	position: relative;
	height: 1px;
	background-color: rgba(255, 255, 255, 0.16);
	width: 24px;
	left: calc(50% - 12px);
	margin: 8px 0;
`;
*/

export const Toolbar = props => {
	const { panelName, setPanelName, setPanelOpen, setPanelPosition, clickCount, addPage, showComments } = useContext(TomeContext);

	const onToolbarButtonTap = (e, name) => {
		if (name === panelName) {
			setPanelOpen(false);
			setPanelName("");
		} else {
			setPanelOpen(true);
			setPanelName(name);
		}
		clickCount.set(Math.random());
		setPanelPosition("toolbar");
		e.stopPropagation();
	};

	return (
		<Wrap
			animate={{
				opacity: showComments ? 0 : 1,
			}}
			transition={transitions.layoutTransition}
		>
			<ButtonWrap>
				<Button
					kind="icon"
					icon="Grid"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.TILES);
					}}
					selected={panelName === panels.TILES}
				/>

				<Button
					kind="icon"
					icon="Record"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.OVERLAY);
					}}
					selected={panelName === panels.OVERLAY}
				/>
				<Button
					kind="icon"
					icon="Annotate"
					onMouseUp={e => {
						onToolbarButtonTap(e, panels.ANNOTATIONS);
					}}
					selected={panelName === panels.ANNOTATIONS}
				/>
				{/* <Separator /> */}
				<Button
					kind="icon"
					icon="Add"
					onMouseUp={e => {
						addPage();
						clickCount.set(Math.random());
						e.stopPropagation();
					}}
					selected={panelName === "AddPage"}
				/>
			</ButtonWrap>
		</Wrap>
	);
};
