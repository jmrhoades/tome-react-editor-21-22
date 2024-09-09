import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Button } from "../../../ds/Button";
import { TomeContext, transitions } from "../tome/TomeContext";

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

const Right = styled(motion.div)`
	position: absolute;
	right: 8px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	& > * {
		margin-left: 8px;
	}
`;

const topbarVariants = {
	show: {
		opacity: 1,
	},
	hide: {
		opacity: 0,
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
	const { documentStatus, setDocumentStatus, showUI } = useContext(TomeContext);

	return (
		<Wrap animate={showUI ? "show" : "hide"} variants={topbarVariants} transition={transitions.defaultTransition}>
			<Left variants={editorModeVariants} transition={transitions.defaultTransition}>
				<Button kind="icon" icon="ChevronLeft" to="/" />
				{/* <TomeTitle>{props.title}</TomeTitle> */}
			</Left>

			<Right variants={editorModeVariants} transition={transitions.defaultTransition}>
				{documentStatus === "editing" && (
					<Button kind="link" type="default" size="lg" label="Share" onTap={() => setDocumentStatus("posted")} />
				)}
				{documentStatus === "posted" && (
					<>
						<Button
							kind="link"
							type="default"
							size="lg"
							label="Edit"
							onTap={() => setDocumentStatus("editing")}
						/>
						<Button kind="link" type="default" size="lg" label="Copy Link" />
						<Button kind="icon" icon="More" height={32} />
					</>
				)}
			</Right>
		</Wrap>
	);
};
