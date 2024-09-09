import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext, transitions, themes } from "../tome/TomeContext";
import { Button } from "../../../ds/Button";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 56px;
`;

const Center = styled.div`
	position: absolute;
	left: 100px;
	right: 100px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CurrentPage = styled.div`
	text-align: center;
	line-height: 1px;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
`;

const Right = styled.div`
	position: absolute;
	right: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

export const BottomBar = props => {

	const tome = useContext(TomeContext);

	return (
		<BottomBarWrap animate={tome.editorState} variants={editorModeVariants} transition={transitions.defaultTransition}>
			<Center>
				<CurrentPage>1 of 3</CurrentPage>
			</Center>
			<Right>
				<Button 
					kind="icon" 
					icon={tome.theme === themes.DARK ? "LightMode" : "DarkMode"}  
					onTap={()=> tome.setTheme(tome.theme === themes.DARK ? themes.LIGHT : themes.DARK)}
				/>
			</Right>
		</BottomBarWrap>
	);
};
