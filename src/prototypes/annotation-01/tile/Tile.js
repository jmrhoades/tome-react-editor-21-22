import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { defaultLayoutTransition } from "../index";
import { CursorContext } from "../cursor/CursorContext";

const Wrap = styled(motion.div)`
	position: relative;
`;

const Background = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Shadow = styled(Background)`
	background-color: transparent;
	box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
	opacity: 0;
`;

const HoverRing = styled(motion.div)`
	position: absolute;
	top: -2px;
	right: -2px;
	bottom: -2px;
	left: -2px;
	border-style: solid;
	border-color: #292929;
	border-radius: 13px;
	border-width: 3px;
	pointer-events: none;
`;

const SelectRing = styled(HoverRing)`
	border-color: #ed00eb;
	opacity: 0;
	
`;

export const Tile = props => {

	const value = useContext(CursorContext);

	const { id, width, height, borderRadius, padding, selected, setSelected, editorState } = props;

	const hoverVariants = {
		default: {
			opacity: 0,
		},
		hover: {
			opacity: selected === id ? 0 : 1,
			transition: { duration: 0.08 },
		},
		active: {
			opacity: 1,
			transition: { duration: 0.08 },
		},
		disabled: {
			opacity: 0,
		},
	};

	const onClickTile = e => {
		if (editorState === "editing") {
			setSelected(id);
			e.stopPropagation();
		}
		if (editorState === "presenting") {

		}
	};

	const showSelectRing = selected === id && editorState === "editing";
	return (
		<Wrap
			style={{
				width: width,
				height: height,
				borderRadius: borderRadius,
				padding: padding,
			}}
			
			transition={defaultLayoutTransition}
			onMouseUp={e => onClickTile(e)}
			onMouseEnter={() => value.setCursorName("annotation")}
			onMouseLeave={() => value.setCursorName("default")}
		>
			<Shadow />
			
			
			{props.children}


			<HoverRing initial={"default"} variants={hoverVariants} />
			<SelectRing animate={{ opacity: showSelectRing ? 1 : 0 }} transition={{duration: showSelectRing ? 0.08 : .15}}/>
		</Wrap>
	);
};
