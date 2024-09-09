import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const Content = styled(motion.div)`
	position: absolute;
	top: -24px;
	left: -24px;
	width: 48px;
	height: 48px;
`;

const Cursor = styled(motion.img)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 48px;
	height: 48px;
`;

export const EmphasisCursor = props => {
	if (props.pageIsHovered && props.editorState === "presenting") {
		document.body.style.cursor = "none";
	} else {
		document.body.style.cursor = "default";
	}
	return (
		<Wrap
			style={{
				x: props.mouseX,
				y: props.mouseY,
				display: (props.editorState === "presenting" && !props.imageTileClickEmphasized && !props.textTileClickEmphasized) ? "block" : "none",
			}}
		>
			<Content
            style={{
                opacity: props.pageIsHovered ? 1 : 0,
            }}
            >
				<Cursor
					src="/images/cursors/emphasisArrow.png"
					style={{ opacity: props.activeEmphasisTool === "ArrowCursor" ? 1 : 0 }}
				/>
				<Cursor
					src="/images/cursors/emphasisSelect.png"
					style={{ opacity: props.activeEmphasisTool === "RectSelect" ? 1 : 0 }}
				/>
				<Cursor
					src="/images/cursors/emphasisScribble.png"
					style={{ opacity: props.activeEmphasisTool === "Scribble" ? 1 : 0 }}
				/>
				<Cursor
					src="/images/cursors/emphasisShine.png"
					style={{ opacity: props.activeEmphasisTool === "Flashlight" ? 1 : 0 }}
				/>
			</Content>
		</Wrap>
	);
};
