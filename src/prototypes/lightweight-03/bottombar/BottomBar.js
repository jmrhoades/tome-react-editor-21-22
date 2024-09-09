import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext, transitions, themes } from "../tome/TomeContext";
import { Button } from "../../../ds/Button";
import { Outline } from "../outline/Outline";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 80px;
	display: grid;
	grid-template-columns: 80px 1fr 80px;
`;


const Left = styled.div`
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	padding-left: 12px;
	padding-bottom: 12px;
`;

const Center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Right = styled.div`
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	padding-right: 12px;
	padding-bottom: 12px;
`;

const bottomBarVariants = {
	show: {
		opacity: 1,
	},
	hide: {
		opacity: 0,
	},
};


export const BottomBar = props => {
	const tome = useContext(TomeContext);
	return (
		<BottomBarWrap
			animate={tome.showUI ? "show" : "hide"}
			variants={bottomBarVariants}
			transition={transitions.defaultTransition}
		>
			<Left>
				<Button kind="icon" icon="MoreCircleOutline" />
			</Left>
			<Center>
				{/* <Progress /> */}
				<Outline />
			</Center>
			<Right>
				<Button
					kind="icon"
					icon={tome.theme === themes.DARK ? "LightMode" : "DarkMode"}
					onTap={() => tome.setTheme(tome.theme === themes.DARK ? themes.LIGHT : themes.DARK)}
				/>
			</Right>
		</BottomBarWrap>
	);
};
