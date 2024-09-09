import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TopLayer = styled.div`
	width: 390px;
	height: 844px;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const Layer = styled.div`
	width: 390px;
	height: 844px;
	position: absolute;
	top: 0;
	left: 0;
	background-size: 390px 844px;
`;

export const Chrome = props => {
	const theme = props.currentPage.theme;

	return (
		<TopLayer>
			<Layer
				style={{
					backgroundImage: `url("/images/narration-mobile-toplayer-01-dark.png")`,
                    opacity: theme.mode === "dark" ? 1 : 0,
				}}
			/>
			<Layer
				style={{
					backgroundImage: `url("/images/narration-mobile-toplayer-01-light.png")`,
                    opacity: theme.mode === "dark" ? 0 : 1,
				}}
			/>
		</TopLayer>
	);
};
