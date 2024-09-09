import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { defaultLayoutTransition } from "../index";

const OutlineWrap = styled(motion.div)`
	position: absolute;
	left: 0;
	width: 168px;
	top: 80px;
	bottom: 80px;
	display: flex;
	align-items: center;
`;

const OutlineContent = styled(motion.div)`
	display: flex;
	align-items: center;
	position: relative;
`;

const OutlinePages = styled(motion.div)`
	width: 124px;
	height: 192px;
	background-image: url("./images/resize04/outline.png");
	background-size: 134px 192px;
`;

const OutlineToggleHandle = styled(motion.div)`
	position: relative;
	align-self: stretch;
	display: flex;
	align-items: center;
	padding-left: 10px;
`;

const OutlineToggleHandleGlyph = styled(motion.svg)`
	width: 28px;
	height: 28px;
	stroke: rgba(255, 255, 255, 0.4);
	stroke-width: 2.5px;
	stroke-linecap: round;
	stroke-linejoin: round;
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

const outlineOpenVariants = {
	open: {
		opacity: 1,
		x: 0,
	},
	closed: {
		opacity: 1,
		x: -116,
	},
};

const outlineOpenPageVariants = {
	open: {
		opacity: 1,
	},
	closed: {
		opacity: 0,
	},
};

const outlineOpenGlyphVariants = {
	open: {
		d: "M14 7L9.5 14L14 21",
	},
	closed: {
		d: "M14 7L18.5 14L14 21",
	},
};

export const Outline = props => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<OutlineWrap animate={props.editorState} variants={editorModeVariants} transition={defaultLayoutTransition}>
			<OutlineContent
				// drag={"x"}
				// dragConstraints={{ left: -50, right: 0 }}
				animate={props.outlineOpen ? "open" : "closed"}
				variants={outlineOpenVariants}
				transition={defaultLayoutTransition}
			>
				<OutlinePages variants={outlineOpenPageVariants} transition={defaultLayoutTransition} />
				<OutlineToggleHandle
					onTap={() => {
						props.setOutlineOpen(!props.outlineOpen);
						setIsHovered(false);
					}}
					animate={{
						opacity: props.outlineOpen && !isHovered ? 0 : 1,
					}}
					onMouseEnter={() => {
						setIsHovered(true);
					}}
					onMouseLeave={() => {
						setIsHovered(false);
					}}
					transition={defaultLayoutTransition}
					initial={false}
				>
					<OutlineToggleHandleGlyph viewBox="0 0 28 28">
						<motion.path
							d="M14 7L14 14L14 21"
							animate={props.outlineOpen ? "open" : "closed"}
							variants={outlineOpenGlyphVariants}
							transition={defaultLayoutTransition}
						/>
					</OutlineToggleHandleGlyph>
				</OutlineToggleHandle>
			</OutlineContent>
		</OutlineWrap>
	);
};
