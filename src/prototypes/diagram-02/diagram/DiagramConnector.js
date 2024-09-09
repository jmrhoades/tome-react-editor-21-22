import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { DiagramContext } from "./DiagramContext";


const Wrap = styled(motion.div)`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Geometry = styled(motion.svg)`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
`;

const Label = styled(motion.div)`
	position: relative;
	font-weight: 500;
	font-size: 15px;
	line-height: 16px;
`;

const Input = styled(motion.div)``;

export const DiagramConnector = ({ tileSelected = false, shapeData }) => {
	const {
		id,
		label,
		labelVisible,
		color,
		x,
		y,
		width,
		height,
	} = shapeData;
	
    const {isDragSelecting } = useContext(DiagramContext);
	const shapeRef = useRef(null);

	let svgWidth = width;
	let svgHeight = height;

	return (
		<Wrap
            key={id}
			ref={shapeRef}
			style={{
				width: width,
				height: height,
				x: x,
				y: y,
				pointerEvents: isDragSelecting ? "none" : "auto",
			}}
			onTap={
				tileSelected
					? () => {
                        console.log("connector tapped")
					  }
					: null
			}
		>
			<Geometry
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				fill={color.value}
				width={width}
				height={height}
				preserveAspectRatio="none"
			>
		
		
			</Geometry>

		

			{labelVisible && (
				<Label
					style={{
						color: color.label,
					}}
				>
					<Input>{label}</Input>
				</Label>
			)}

		</Wrap>
	);
};
