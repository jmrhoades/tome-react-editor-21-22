import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { useMouseXMotionPosition, useMouseYMotionPosition } from "../../../utils/dimensions";
import { CursorContext } from "./CursorContext";

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

const SVGCursor = styled(motion.svg)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 48px;
	height: 48px;
	box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
		0 22.3px 17.9px rgba(0, 0, 0, 0.072);
`;

const AnnotationCursor = styled(SVGCursor)``;

export const Cursor = props => {
	const value = useContext(CursorContext);
	const name = value.cursorName;
	let showCustomCursor = false;

    // console.log("name")

	const mouseX = useMouseXMotionPosition();
	const mouseY = useMouseYMotionPosition();

	const c = "white";

	switch (name) {
		case "default":
			document.body.style.cursor = "default";
			break;
		case "pointer":
			document.body.style.cursor = "pointer";
			break;
		case "grab":
			document.body.style.cursor = "grab";
			break;
		case "grabbing":
			document.body.style.cursor = "grabbing";
			break;
		default:
			showCustomCursor = true;
			document.body.style.cursor = "none";
	}

	return (
		<Wrap
			style={{
				x: mouseX,
				y: mouseY,
				display: showCustomCursor ? "block" : "none",
			}}
		>
			<Content>
				{name === "annotation" && (
					<AnnotationCursor viewBox="0 0 48 48" fill="none">
						<circle cx="24" cy="24" r="8.5" stroke="black" opacity="0.01" />
						<circle cx="24" cy="24" r="5" stroke="black" opacity="0.01" />
						<circle cx="24" cy="24" r="6.5" stroke={c} strokeWidth="1.5" />
					</AnnotationCursor>
				)}
			</Content>
		</Wrap>
	);
};
