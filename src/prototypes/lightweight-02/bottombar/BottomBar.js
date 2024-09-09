import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext, transitions, themes } from "../tome/TomeContext";
import { Button } from "../../../ds/Button";
import { Progress } from "./Progress";
import { Outline } from "../outline/Outline";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 56px;
`;

const HideWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	bottom: 0;
	left: 0;
`;

const Left = styled.div`
	position: absolute;
	left: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
`;

const Center = styled.div`
	position: absolute;
	left: 88px;
	right: 88px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Right = styled.div`
	position: absolute;
	right: 12px;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
`;

const bottomBarVariants = {
	show: {
		opacity: 1,
	},
	hide: {
		opacity: 0,
	},
};

const outlineVariants = {
	show: {
		opacity: 1,
		y: 0,
	},
	hide: {
		opacity: 0,
		y: 10,
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
			<HideWrap
				animate={tome.showOutline ? "hide" : "show"}
				variants={outlineVariants}
				transition={transitions.layoutTransition}
			>
				<Left>
					<Button kind="icon" icon="MoreCircleOutline" />
				</Left>
				<Center>
					<Progress />
				</Center>
				<Right>
					<Button
						kind="icon"
						icon={tome.theme === themes.DARK ? "LightMode" : "DarkMode"}
						onTap={() => tome.setTheme(tome.theme === themes.DARK ? themes.LIGHT : themes.DARK)}
					/>
				</Right>
			</HideWrap>
			<Outline />
		</BottomBarWrap>
	);
};
