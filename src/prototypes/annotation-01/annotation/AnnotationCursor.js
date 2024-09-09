import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { useMouseXMotionPosition, useMouseYMotionPosition } from "../../../utils/dimensions";
import { AnnotationContext, AnnotationColors } from "./AnnotationContext";

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

const Cursor = styled(motion.svg)`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 48px;
	height: 48px;

	box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
		0 22.3px 17.9px rgba(0, 0, 0, 0.072);
`;

export const AnnotationCursor = props => {
	const mouseX = useMouseXMotionPosition();
	const mouseY = useMouseYMotionPosition();
	const value = useContext(AnnotationContext);
	let data = null;
	let color = AnnotationColors[0].name;
	if (props.selectedAnotation) {
		if (props.selectedAnotation === 1) {
			data = value.a1State;
		}
		if (props.selectedAnotation === 2) {
			data = value.a2State;
		}
		if (props.selectedAnotation === 3) {
			data = value.a3State;
		}
		if (props.selectedAnotation === 4) {
			data = value.a4State;
		}
		color = data.color;
	}

	const c = AnnotationColors.find(o => o.name === color).background;

	document.body.style.cursor = "none";

	return (
		<Wrap
			style={{
				x: mouseX,
				y: mouseY,
			}}
		>
			<Content>
				
				
				<Cursor viewBox="0 0 48 48" fill="none">
					<circle cx="24" cy="24" r="8.5" stroke="black" opacity="0.01" />
					<circle cx="24" cy="24" r="5" stroke="black" opacity="0.01" /> 
					<circle cx="24" cy="24" r="6.5" stroke={c} strokeWidth="1.5" />
				</Cursor>


			</Content>
		</Wrap>
	);
};
