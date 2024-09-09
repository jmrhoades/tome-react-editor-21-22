import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TomeContext } from "../tome/TomeContext";


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
	background-color: #ffe500;
`;

export const ImageTile = props => {
	
	
	return (
		<ImageWrap>
			<Image
				image={props.image}
			/>
		</ImageWrap>
	);
};
