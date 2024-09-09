import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Annotation } from "../annotation/Annotation";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	/* background-color: #ffe500; */
`;

export const ImageTile = props => {
	return (
		<ImageWrap>
			<Image
				image={props.image}
				style={{
					borderRadius: props.borderRadius,
				}}
			/>
			<Annotation
				id="a3"
				scale={props.scale}
				selectedAnotation={props.selectedAnotation}
				setSelectedAnnotation={props.setSelectedAnnotation}
				
			/>
			<Annotation
				id="a4"
				scale={props.scale}
				selectedAnotation={props.selectedAnotation}
				setSelectedAnnotation={props.setSelectedAnnotation}
				width={140}
				
			/>
		</ImageWrap>
	);
};
