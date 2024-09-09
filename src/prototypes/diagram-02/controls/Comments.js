import React, { useContext } from "react";
import { TomeContext, transitions, editorStates } from "../tome/TomeContext";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 368px;
	height: calc(100% - 56px);
	right: -16px;
	top: 56px;
	z-index: 100;
	border-radius: 15px;
	pointer-events: none;
	overflow: hidden;
`;

const Scroller = styled(motion.div)`
	pointer-events: auto;
	& img {
		display: block;
	}
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
`;

const uiVariants = {
	show: {
		opacity: 1,
		x: 0,
	},
	hide: {
		opacity: 0,
		x: 368,
	},
};

export const Comments = props => {
	const { showComments, editorState } = useContext(TomeContext);
	return (
		<Wrap
			animate={showComments ? "show" : "hide"}
			variants={uiVariants}
			transition={transitions.layoutTransition}
			initial={"hide"}
			style={{
				display: editorState !== editorStates.FULLSCREEN ? "block" : "none",
			}}
		>
			<Scroller>
				<motion.img
					style={{
						position: "sticky",
						top: "0px",
						filter: "drop-shadow(0px 2px 16px rgba(0,0,0,0.75))",
					}}
					src="./images/comments-new-comment-01-b.png"
					width="368"
				/>
				<motion.img
					style={{
						marginTop: -8,
					}}
					src="./images/comments-list-01-b.png"
					width="368"
				/>
			</Scroller>
		</Wrap>
	);
};
