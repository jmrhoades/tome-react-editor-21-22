import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";

import open_menu_sound from "../../../sounds/button_40.mp3";
import close_menu_sound from "../../../sounds/button_37.mp3";
import hover_sound_01 from "../../../sounds/button_38.mp3";
import delete_sound_01 from "../../../sounds/action_11.mp3";
import { MenuItem, MenuSeparator } from "./MenuItem";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
`;

const ClickCover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	user-select: none;
`;

const Menu = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

export const TomeMenu = props => {
	const { menuInfo, setMenuInfo, currentPage, playSounds, setPlaySounds } = useContext(TomeContext);

	const [playHoverSound01] = useSound(hover_sound_01);
	const [playOpenMenuSound] = useSound(open_menu_sound);
	const [playCloseMenuSound] = useSound(close_menu_sound);
	const [playTileDeleteSound] = useSound(delete_sound_01);

	const show = menuInfo.show;
	let menuX = menuInfo.x;
	let menuY = menuInfo.y;

	const closeMenu = () => {
		menuInfo.show = false;
		setMenuInfo({ ...menuInfo });
		playCloseMenuSound();
	};

	return (
		<Wrap
			style={{
				pointerEvents: show ? "auto" : "none",
				zIndex: 1000,
				visibility: show ? "visible" : "hidden",
			}}
		>
			<ClickCover
				onTap={e => {
					closeMenu();
				}}
				onContextMenu={e => {
					closeMenu();
					e.preventDefault();
				}}
			/>

			<Menu
				style={{
					borderRadius: 12,
					padding: 6,
					backgroundColor: currentPage.theme.colors.backgrounds.panel,
					boxShadow: currentPage.theme.shadows.panel,
					x: menuX,
					y: menuY,
					width: 220,
				}}
			>
				<MenuItem label={"Duplicate"} icon={"Copy"} theme={currentPage.theme} />
				<MenuItem label={"Rename"} icon={"Rename"} theme={currentPage.theme} />
				<MenuItem label={"Add Logo"} icon={"PlusSquareOutline"} theme={currentPage.theme} />

				<MenuSeparator theme={currentPage.theme} />
				<MenuItem
					label={"UI Sounds"}
					icon={"Waveform"}
					theme={currentPage.theme}
					hasCheckmark={playSounds}
					//hasSwitch={true}
					//isOn={playSounds}
					onTap={() => {
						setPlaySounds(!playSounds);
						closeMenu();
					}}
				/>

				<MenuSeparator theme={currentPage.theme} />
				<MenuItem label={"Delete"} icon={"Delete"} theme={currentPage.theme} />
			</Menu>
		</Wrap>
	);
};
