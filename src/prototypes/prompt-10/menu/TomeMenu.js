import React, { useContext, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";

import open_menu_sound from "../../../sounds/button_40.mp3";
import close_menu_sound from "../../../sounds/button_37.mp3";
import hover_sound_01 from "../../../sounds/button_38.mp3";
import delete_sound_01 from "../../../sounds/action_11.mp3";

import { MenuItem, MenuSeparator, MenuHeader } from "./MenuItem";
import { ContentFormatOptions } from "./ContentFormatOptions";
import { PromptCreateTomeInfo } from "./PromptCreateTomeInfo";
import { ThemeOptions } from "./ThemeOptions";
import { PageLengthOptions } from "./PageLengthOptions";

import {
	pageCountOptions,
	tomeTypes,
	artStyles,
	imageOptions,
	web2TomeImageOptions,
	CREATE_TOME_IMAGE_OPTIONS,
} from "../prompt/PromptConstants";

const Menu = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
`;

const MenuScroller = styled(Menu)`
	overflow-y: auto;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const ArtStylesScroller = styled(motion.div)`
	overflow-y: auto;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const TomeMenu = props => {
	const { menuInfo, closeMenu, currentPage, playSounds, setPlaySounds, tomeData, saveState } = useContext(TomeContext);

	//const [playHoverSound01] = useSound(hover_sound_01);
	//const [playOpenMenuSound] = useSound(open_menu_sound);
	//const [playCloseMenuSound] = useSound(close_menu_sound);
	//const [playTileDeleteSound] = useSound(delete_sound_01);

	const show = menuInfo.show;
	let menuX = menuInfo.x;
	let menuY = menuInfo.y;

	const menuContainerStyles = {
		borderRadius: 12,
		padding: 6,
		backgroundColor: currentPage.theme.colors.backgrounds.menu,
		boxShadow: currentPage.theme.shadows.menu,
		x: menuX,
		y: menuY,
		width: 220,
	};

	const menuExitSettings = { opacity: 0, scale: 1.0 };
	//const menuExitTransition = { type: "spring", bounce: 0.4, duration: 0.3, };
	const menuExitTransition = { type: "easeOut", duration: 0.1, };

	let originX = 0.5;
	let originY = 1;
	if (menuInfo.alignX === "leading") originX = 0; //0;
	if (menuInfo.alignX === "middle") originX = 0.5; //0;
	if (menuInfo.alignX === "trailing") originX = 1;
	if (menuInfo.alignY === "leading") originY = 1;
	if (menuInfo.alignY === "trailing") originY = 0;
	//	console.log(menuInfo.alignX, menuInfo.alignY, originX, originY)

	const pagelengthMotionValue = useMotionValue(tomeData.prompt.createTomePageLength);


	return (
		<AnimatePresence>
			{show && menuInfo.type === "tome_menu" && (
				<Menu
					style={{ ...menuContainerStyles, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"tome_menu"}
				>
					<MenuItem label={"Duplicate"} icon={"Copy"} theme={currentPage.theme} />
					<MenuItem label={"Rename"} icon={"Rename"} theme={currentPage.theme} />
					<MenuItem label={"Add logo"} icon={"PlusSquareOutline"} theme={currentPage.theme} />
					<MenuSeparator theme={currentPage.theme} />
					<MenuItem
						label={"UI sounds"}
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
					<MenuItem
						label={"Show prompt errors"}
						icon={"Report"}
						theme={currentPage.theme}
						hasCheckmark={tomeData.prompt.showError}
						//hasSwitch={true}
						//isOn={playSounds}
						onTap={() => {
							tomeData.prompt.showError = !tomeData.prompt.showError;
							saveState();
							closeMenu();
						}}
					/>
					<MenuItem
						label={"Slow animations"}
						icon={"SlowAnimation"}
						theme={currentPage.theme}
						hasCheckmark={tomeData.prompt.slowAnimation}
						//hasSwitch={true}
						//isOn={playSounds}
						onTap={() => {
							tomeData.prompt.slowAnimation = !tomeData.prompt.slowAnimation;
							saveState();
							closeMenu();
						}}
					/>
					<MenuSeparator theme={currentPage.theme} />

					<MenuItem label={"Delete"} icon={"Delete"} theme={currentPage.theme} />
				</Menu>
			)}

			{show && menuInfo.type === "prompt_create_tome_info" && (
				<Menu
					style={{ ...menuContainerStyles, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_info"}
				>
					<PromptCreateTomeInfo theme={currentPage.theme} transition={menuExitTransition} />
					<MenuSeparator theme={currentPage.theme} />
					<MenuItem
						label={"12 credits remaining"}
						icon={"DoubleSparkle"}
						theme={currentPage.theme}
						onTap={() => {
							//saveState();
							closeMenu();
						}}
					/>
					<MenuItem
						label={"Prompt writing tips"}
						icon={"Lightbulb"}
						theme={currentPage.theme}
						onTap={() => {
							//saveState();
							closeMenu();
						}}
					/>
					{/* <MenuItem label={"View history"} icon={"History"} theme={currentPage.theme} /> */}
				</Menu>
			)}

			{show && menuInfo.type === "prompt_create_tome_types" && (
				<Menu
					style={{ ...menuContainerStyles, width: 136, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_types"}
				>
					{tomeTypes.map(t => (
						<MenuItem
							key={"prompt_create_tome_pages" + t.id}
							label={t.name}
							theme={currentPage.theme}
							hasCheckmark={tomeData.prompt.type.id === t.id}
							onTap={() => {
								tomeData.prompt.type = t;
								saveState();
								closeMenu();
							}}
						/>
					))}
				</Menu>
			)}

			{show && menuInfo.type === "prompt_web2tome_images" && (
				<Menu
					style={{ ...menuContainerStyles, width: 160, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_web2tome_images"}
				>
					{web2TomeImageOptions.map(t => (
						<MenuItem
							key={"prompt_web2tome_images" + t.id}
							label={t.label}
							theme={currentPage.theme}
							hasCheckmark={tomeData.prompt.web2TomeImage.id === t.id}
							onTap={() => {
								tomeData.prompt.web2TomeImage = t;
								saveState();
								closeMenu();
							}}
						/>
					))}
				</Menu>
			)}

			{/* {show && menuInfo.type === "prompt_create_tome_images" && (
				<Menu
					style={{ ...menuContainerStyles, width: 160, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_images"}
				>
					<ArtStylesScroller style={{ maxHeight: 278, paddingBottom: 6 }}>
						<MenuHeader theme={currentPage.theme} label={"Art Style"} />
						{artStyles.map(t => (
							<MenuItem
								key={"prompt_create_tome_images_" + t.id}
								label={t.name}
								theme={currentPage.theme}
								hasCheckmark={
									tomeData.prompt.artStyle.id === t.id && tomeData.prompt.images.id === imageOptions[0].id
								}
								onTap={() => {
									tomeData.prompt.images = imageOptions[0];
									tomeData.prompt.artStyle = t;
									saveState();
									closeMenu();
								}}
							/>
						))}
					</ArtStylesScroller>
					<MenuSeparator theme={currentPage.theme} style={{ marginTop: -5 }} />
					<MenuItem
						key={"prompt_create_tome_images_" + imageOptions[1].id}
						label={imageOptions[1].name}
						theme={currentPage.theme}
						hasCheckmark={tomeData.prompt.images.id === imageOptions[1].id}
						onTap={() => {
							tomeData.prompt.images = imageOptions[1];
							saveState();
							closeMenu();
						}}
					/>
					<MenuItem
						key={"prompt_create_tome_images_" + imageOptions[2].id}
						label={imageOptions[2].name}
						theme={currentPage.theme}
						hasCheckmark={tomeData.prompt.images.id === imageOptions[2].id}
						onTap={() => {
							tomeData.prompt.images = imageOptions[2];
							saveState();
							closeMenu();
						}}
					/>
				</Menu>
			)} */}

			{show && menuInfo.type === "prompt_create_images" && (
				<Menu
					style={{ ...menuContainerStyles, width: 160, originY: originY, originX: originX, }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_images"}
				>
					<ArtStylesScroller style={{ maxHeight: 320, paddingBottom: 6 }}>
						<MenuHeader theme={currentPage.theme} label={"Art Style"} />
						{artStyles.map(t => (
							<MenuItem
								key={"prompt_create_images" + t.id}
								label={t.name}
								theme={currentPage.theme}
								hasCheckmark={
									tomeData.prompt.artStyle.id === t.id && tomeData.prompt.images.id === imageOptions[0].id
								}
								onTap={() => {
									tomeData.prompt.images = imageOptions[0];
									tomeData.prompt.artStyle = t;
									saveState();
									closeMenu();
								}}
							/>
						))}
					</ArtStylesScroller>
				</Menu>
			)}

			{show && menuInfo.type === "prompt_create_tome_theme" && (
				<MenuScroller
					style={{
						...menuContainerStyles,
						width: 288,
						height: 198,
						originY: originY,
						originX: originX,
						padding: 0,
					}}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_theme"}
				>
					<ThemeOptions
						theme={currentPage.theme}
						tomeData={tomeData}
						onChange={option => {
							tomeData.prompt.createTomeTheme = option;
							//currentPage.theme = option;
							saveState();
							closeMenu();
						}}
					/>
				</MenuScroller>
			)}

			{show && menuInfo.type === "prompt_create_tome_format" && (
				<Menu
					style={{
						...menuContainerStyles,
						width: 228,
						originY: originY,
						originX: originX,
						padding: 0,
					}}
					initial={{scale: 1, opacity: 1}}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_format"}
				>
					<ContentFormatOptions
						theme={currentPage.theme}
						tomeData={tomeData}
						onTap={option => {
							tomeData.prompt.createTomeFormat = option;
							saveState();
							closeMenu();
						}}
					/>
				</Menu>
			)}

			{show && menuInfo.type === "prompt_create_tome_images" && (
				<Menu
					style={{ ...menuContainerStyles, width: 150, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_images"}
				>
					{CREATE_TOME_IMAGE_OPTIONS.map(t => (
						<MenuItem
							key={"prompt_create_tome_images_" + t.id}
							label={t.label}
							theme={currentPage.theme}
							hasCheckmark={tomeData.prompt.createTomeImages.id === t.id}
							selected={tomeData.prompt.createTomeImages.id === t.id}
							onTap={() => {
								tomeData.prompt.createTomeImages = t;
								saveState();
								closeMenu();
							}}
						/>
					))}
				</Menu>
			)}

			{show && menuInfo.type === "prompt_create_tome_length" && (
				<Menu
					style={{
						...menuContainerStyles,
						width: 224,
						originY: originY,
						originX: originX,
						padding: 0,
					}}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_length"}
				>
					<PageLengthOptions
						theme={currentPage.theme}
						//value={tomeData.prompt.createTomePageLength}
						value={pagelengthMotionValue}
						range={[0, 1]}
						onMouseUp={(value) => {
							tomeData.prompt.createTomePageLength = pagelengthMotionValue.get();
							saveState();
							closeMenu();
						}}
					/>
				</Menu>
			)}

			{/* {show && menuInfo.type === "prompt_create_tome_pages" && (
				<Menu
					style={{ ...menuContainerStyles, width: 66, originY: originY, originX: originX }}
					initial={false}
					exit={menuExitSettings}
					transition={menuExitTransition}
					key={"prompt_create_tome_pages"}
				>
					{pageCountOptions.map(p => (
						<MenuItem
							key={"prompt_create_tome_pages" + p}
							label={p}
							theme={currentPage.theme}
							hasCheckmark={tomeData.prompt.pages === p}
							onTap={() => {
								tomeData.prompt.pages = p;
								saveState();
								closeMenu();
							}}
						/>
					))}
				</Menu>
			)} */}
		</AnimatePresence>
		// </Wrap>
	);
};
