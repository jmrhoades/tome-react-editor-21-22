import React from "react";
import styled from "styled-components";

import { Button } from "../../../ds/Button";
import { defaultLayoutTransition } from "../index";

import { motion } from "framer-motion";

const ToolBarWrap = styled(motion.div)`
	position: absolute;
	right: 12px;
	display: flex;
	flex-direction: column;
	& > button {
		margin: 4px 0;
	}
`;

// const Separator = styled(motion.div)`
// 	position: relative;
// 	height: 1px;
// 	background-color: rgba(255, 255, 255, 0.16);
// 	width: 24px;
// 	left: calc(50% - 12px);
// 	margin: 8px 0;
// `;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const Toolbar = props => {
	const onButtonTap = name => {
		if (name === props.panelName) {
			props.setPanelState(false);
			props.setActivePanelName("");
		} else {
			props.setPanelState(true);
			props.setActivePanelName(name);
		}
	};

	return (
		<ToolBarWrap animate={props.editorState} variants={editorModeVariants} transition={defaultLayoutTransition}>
			
			<Button
				kind="icon"
				icon="Text"
				onMouseUp={e => {
					onButtonTap("Text");
					e.stopPropagation();
				}}
				selected={props.panelName === "Text"}
			/>
			<Button
				kind="icon"
				icon="Photo"
				onMouseUp={(e) => {
					onButtonTap("Photo");
					e.stopPropagation();
				}}
				selected={props.panelName === "Photo"}
			/>
			{/* <Separator /> */}
			<Button
				kind="icon"
				icon="Add"
				onMouseUp={(e) => {
					onButtonTap("Add");
					e.stopPropagation();
				}}
				selected={props.panelName === "Add"}
			/>
			<Button
				kind="icon"
				icon="Record"
				onMouseUp={(e) => {
					onButtonTap("Record");
					e.stopPropagation();
				}}
				selected={props.panelName === "Record"}
			/>
			<Button
				kind="icon"
				icon="Annotate"
				onMouseUp={(e) => {
					onButtonTap("Annotate");
					e.stopPropagation();
				}}
				selected={props.panelName === "Annotate"}
			/>
			<Button
				kind="icon"
				icon="Help"
				onMouseUp={(e) => {
					onButtonTap("Help");
					e.stopPropagation();
				}}
				selected={props.panelName === "Help"}
			/>
			{/* <Button kind="icon" icon="Help" />  */}
		</ToolBarWrap>
	);
};
