import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

const Wrap = styled(motion.div)`
	/* position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0; */
	/* width: 100%; */
	/* height: 100%; */
	overflow-x: hidden;
	overflow-y: hidden;
	// user-select: none; coming from global styles
`;

const GlobalStyle = createGlobalStyle`
	html,body {
		height: auto;
		min-height: 100vh;
		background-color: ${props => props.bgcolor};
		
	}
	#root {
		height: auto;
		min-height: 100vh;
		background-color: ${props => props.bgcolor};
		
	}
	.noscroll {
		/* position: fixed; */
		overflow: hidden !important;
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
