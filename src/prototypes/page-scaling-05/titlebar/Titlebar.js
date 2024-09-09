import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { defaultLayoutTransition } from "../index";
import { Button } from "../../../ds/Button";
import { SeenHeads } from "./SeenHeads";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 56px;
`;

const Left = styled(motion.div)`
	position: absolute;
	left: 8px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
`;

const Center = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 0;
	height: 100%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
`;

const Right = styled(motion.div)`
	position: absolute;
	right: 64px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	& > * {
		margin-left: 8px;
	}
`;

const PresentModeToggle = styled(motion.div)`
	position: absolute;
	right: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
`;

const topbarVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 1,
	},
};

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const Titlebar = props => {
	const tome = useContext(TomeContext);

	return (
		<Wrap animate={tome.editorState} variants={topbarVariants}>
			<Left variants={editorModeVariants} transition={defaultLayoutTransition}>
				<Button kind="link" type="back" size="lg" label="Workspace" to="/" />
			</Left>

			<Center variants={editorModeVariants} transition={defaultLayoutTransition}>
				<Button kind="link" type="dropdown" size="lg" role="primary" label={props.title} />
			</Center>

			<Right variants={editorModeVariants} transition={defaultLayoutTransition}>
				<SeenHeads />

				<Button kind="link" type="default" size="lg" label="Share" />

				<Button kind="icon" icon="CommentFill" height={40} />
			</Right>

			<PresentModeToggle
				transition={{
					duration: 0.25,
					ease: [0.4, 0, 0.1, 1],
				}}
			>
				<Button
					kind="icon"
					icon={tome.editorState === "editing" ? "PlaybackPlay" : "Close"}
					onMouseUp={(e) => {tome.setEditorState(tome.editorState === "editing" ? "presenting" : "editing"); e.stopPropagation(); }}
				/>
			</PresentModeToggle>
		</Wrap>
	);
};
