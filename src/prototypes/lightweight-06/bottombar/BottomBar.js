import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext, themes } from "../tome/TomeContext";
import { Button } from "../../../ds/Button";
import { Outline } from "../outline/Outline";

const BottomBarWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	pointer-events: auto;
`;

const Left = styled.div`
	position: absolute;
	left: 12px;
	bottom: 0;
	height: 60px;
	display: flex;
	align-items: center;
	justify-items: center;
`;

const Right = styled.div`
	position: absolute;
	right: 12px;
	bottom: 0;
	height: 60px;
	display: flex;
	align-items: center;
	justify-items: center;
`;



export const BottomBar = props => {
	const {showComments, theme, setTheme} = useContext(TomeContext);
	return (
		<BottomBarWrap>

				<Left>
					<Button kind="icon" icon="MoreCircleOutline" />
				</Left>

				<Right
					style={{
						opacity: showComments ? 0 : 1,
					}}
				>
					<Button
						kind="icon"
						icon={theme === themes.DARK ? "LightMode" : "DarkMode"}
						onTap={() => setTheme(theme === themes.DARK ? themes.LIGHT : themes.DARK)}
					/>
				</Right>
			<Outline />
		</BottomBarWrap>
	);
};
