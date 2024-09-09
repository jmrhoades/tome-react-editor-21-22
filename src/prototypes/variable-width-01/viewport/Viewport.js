import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

const Wrap = styled(motion.div)`
	max-width: 100%;
	height: auto;
	overflow-x: hidden;
	overflow-y: hidden;
	user-select: none;
`;

const GlobalStyle = createGlobalStyle`
	html,body {
		height: auto;
		min-height: 100vh;
		background-color: ${props => props.bgcolor};
		user-select: none; 
	}
	#root {
		height: auto;
		min-height: 100vh;
		background-color: ${props => props.bgcolor};
		user-select: none; 
	}
`;

export const Viewport = props => {
	const { currentPage, tomeData, isPlayMode } = useContext(TomeContext);

	return (
		<Wrap
			id="viewport"
			animate={{
				backgroundColor: isPlayMode ? currentPage.theme.colors.backgrounds.page : currentPage.theme.colors.backgrounds.canvas,
			}}
			transition={transitions.basic}
			initial={false}
		>
			<Helmet>
				<title>{tomeData.title}</title>
			</Helmet>
			<GlobalStyle bgcolor={currentPage.theme.colors.backgrounds.canvas} />
			{props.children}
		</Wrap>
	);
};
