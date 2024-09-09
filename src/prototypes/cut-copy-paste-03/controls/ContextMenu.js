import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";
//import { Icon } from "../../../ds/Icon";

//import open_menu_sound from "../../../sounds/pop_02.mp3";

import open_menu_sound from "../../../sounds/button_40.mp3";
import close_menu_sound from "../../../sounds/button_37.mp3";

import hover_sound_01 from "../../../sounds/button_38.mp3";

import delete_sound_01 from "../../../sounds/action_11.mp3";
import cut_sound_01 from "../../../sounds/button_42.mp3";
import copy_sound_01 from "../../../sounds/button_30.mp3";
import paste_sound_01 from "../../../sounds/button_46.mp3";

const Wrap = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const ClickCover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: transparent;
`;

const Menu = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25), 0px 8px 25px rgba(0, 0, 0, 0.2), 0px 12px 45px rgba(0, 0, 0, 0.2);
`;

const MenuItem = styled(motion.div)`
	min-width: 180px;
	padding: 6px 8px;
	display: flex;
	justify-content: space-between;
	border-radius: 6px;
	background-color: transparent;
	transition: background-color 0.1s ease-in-out;
	&:hover {
		background-color: rgba(237, 0, 235, 1);
		& :nth-child(2) {
			color: white;
		}
	}
	&.disabled {
		& :nth-child(1) {
			color: rgba(255, 255, 255, 0.25);
		}
		& :nth-child(2) {
			color: rgba(255, 255, 255, 0.25);
		}
	}
`;
const MenuItemDivider = styled(motion.div)`
	padding: 6px 8px;
`;
const MenuItemDestructive = styled(MenuItem)`
	&:hover {
		background-color: #ff443b;
		& :nth-child(1) {
			color: white;
		}
		& :nth-child(2) {
			color: white;
		}
	}
`;
// const MenuItemIcon = styled(motion.div)`
// 	display: grid;
// 	padding: 0 8px 0 0;
// 	> * {
// 		margin: auto;
// 	}
// `;

// const MenuItemLabelWrap = styled(motion.div)`
// 	display: flex;
// 	justify-content: flex-start;
// `;

const MenuItemLabel = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 16px;
	color: white;
	transition: color 0.1s ease-in-out;
	padding-right: 24px;
`;
const MenuItemLabelDestructive = styled(MenuItemLabel)`
	color: #ff443b;
`;
const MenuItemShortcut = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 500;
	font-size: 13px;
	line-height: 16px;
	color: rgba(255, 255, 255, 0.4);
	transition: color 0.1s ease-in-out;
`;
const MenuItemShortcutDestructive = styled(MenuItemShortcut)`
	color: #ff443b;
`;
const MenuItemDividerLine = styled(motion.div)`
	height: 1px;
	background-color: rgba(255, 255, 255, 0.08);
`;

export const ContextMenu = props => {
	const {
		deleteTile,
		cutTile,
		copyTile,
		showContextMenu,
		setShowContextMenu,
		contextMenuInfo,
		selectedTile,
		//pasteClipboard,
		copiedTile,
		//replaceWithClipboard,
		//duplicateTile,
		//pasteClipboardAfterSelectedTile,
		//pasteClipboardAfterRow,
		//pasteClipboardAfterTile,
		pasteClipboardToRow,
		pasteClipboardToPage,
		pasteClipboardToRowGapIndex,
	} = useContext(TomeContext);

	const { scrollTileIntoView, getRowAndSideForCurrentPointerPosition } = useContext(MetricsContext);
	const [canPaste, setCanPaste] = useState(false);

	//const pasteLabel = selectedTile && canPaste ? "Paste to replace" : "Paste";

	useEffect(() => {
		if (showContextMenu) {
			document.body.style.overflow = "hidden";
			playOpenMenuSound();
			if (copiedTile.current) {
				setCanPaste(true);
			} else {
				setCanPaste(false);
			}
		} else {
			document.body.style.overflow = "auto";
		}
	}, [showContextMenu, setCanPaste, copiedTile]);

	const [playHoverSound01] = useSound(hover_sound_01);

	const [playOpenMenuSound] = useSound(open_menu_sound);
	const [playCloseMenuSound] = useSound(close_menu_sound);

	const [playTileDeleteSound] = useSound(delete_sound_01);
	const [playTileCutSound] = useSound(cut_sound_01);
	const [playTileCopySound] = useSound(copy_sound_01);
	const [playTilePasteSound] = useSound(paste_sound_01);

	return (
		<Wrap
			style={{
				pointerEvents: showContextMenu ? "auto" : "none",
				zIndex: 1000,
				visibility: showContextMenu ? "visible" : "hidden",
			}}
		>
			<ClickCover
				onTap={e => {
					setShowContextMenu(false);
					playCloseMenuSound();
				}}
				onContextMenu={e => {
					setShowContextMenu(false);
					e.preventDefault();
				}}
			/>

			<Menu
				style={{
					borderRadius: 12,
					padding: 6,
					backgroundColor: colors.z2,
					x: contextMenuInfo.x,
					y: contextMenuInfo.y,
				}}
			>
				{selectedTile && (
					<MenuItem
						onTap={() => {
							if (selectedTile) {
								cutTile(selectedTile);
								setShowContextMenu(false);
								playTileCutSound();
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={playHoverSound01}
					>
						<MenuItemLabel>Cut</MenuItemLabel>
						<MenuItemShortcut>⌘X</MenuItemShortcut>
					</MenuItem>
				)}

				{selectedTile && (
					<MenuItem
						onTap={() => {
							if (selectedTile) {
								copyTile(selectedTile);
								setShowContextMenu(false);
								playTileCopySound();
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={playHoverSound01}
					>
						<MenuItemLabel>Copy</MenuItemLabel>
						<MenuItemShortcut>⌘C</MenuItemShortcut>
					</MenuItem>
				)}

				{canPaste && (
					<MenuItem
						className={canPaste ? "enabled" : "disabled"}
						style={{
							pointerEvents: canPaste ? "auto" : "none",
						}}
						onTap={() => {
							const info = getRowAndSideForCurrentPointerPosition();
							let t = false;
							if (info.row) {
								t = pasteClipboardToRow(info.row, info.direction);
							}
							else if (info.rowGapIndex !== 0) {
								t = pasteClipboardToRowGapIndex(info.rowGapIndex);
							} else {
								t = pasteClipboardToPage(info.direction);
							}
							if (t) {
								playTilePasteSound();
								scrollTileIntoView(t);
								if (showContextMenu) {
									setShowContextMenu(false);
								}
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={playHoverSound01}
					>
						<MenuItemLabel>Paste</MenuItemLabel>
						<MenuItemShortcut>⌘V</MenuItemShortcut>
					</MenuItem>
				)}

				{/* {canPaste && selectedTile && (
					<MenuItemDivider>
						<MenuItemDividerLine />
					</MenuItemDivider>
				)} */}

				{/* {canPaste && selectedTile && (
					<MenuItem
						onTap={() => {
							const t = pasteClipboardBeforeSelectedTile();
							if (t) scrollTileIntoView(t);
							if (showContextMenu) setShowContextMenu(false);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
					>
						<MenuItemLabelWrap>
							<MenuItemIcon>
								<Icon name={"ArrowLeft"} size={16} opacity={1} />
							</MenuItemIcon>
							<MenuItemLabel>Paste before</MenuItemLabel>
						</MenuItemLabelWrap>
						<MenuItemShortcut>⌃⌘V</MenuItemShortcut>
					</MenuItem>
				)} */}

				{/* 				
				{canPaste && selectedTile && (
					<MenuItem
						onTap={() => {
							//const t = pasteClipboard();
							const t = pasteClipboardAfterSelectedTile();
							if (t) scrollTileIntoView(t);
							if (showContextMenu) setShowContextMenu(false);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
					>
						<MenuItemLabelWrap>
							<MenuItemIcon>
								<Icon name={"ArrowRight"} size={16} opacity={1} />
							</MenuItemIcon>
							<MenuItemLabel>Paste after</MenuItemLabel>
						</MenuItemLabelWrap>

						<MenuItemShortcut>⌥⌘V</MenuItemShortcut>
					</MenuItem>
				)} */}

				{/* <MenuItem
					className={canPaste ? "enabled" : "disabled"}
					style={{
						pointerEvents: canPaste ? "auto" : "none",
					}}
					onTap={() => {
						replaceWithClipboard();
                        if (showContextMenu) setShowContextMenu(false);
					}}
					onContextMenu={e => {
						setShowContextMenu(false);
						e.preventDefault();
					}}
				>
					<MenuItemLabel>Replace</MenuItemLabel>
					<MenuItemShortcut>⌥ ⌘ V</MenuItemShortcut>
				</MenuItem> */}

				{/* <MenuItem
					onTap={() => {
						const t = duplicateTile(selectedTile);
						if (t) {
							scrollTileIntoView(t);
							if (showContextMenu) {
								setShowContextMenu(false);
							}
						}
					}}
					onContextMenu={e => {
						setShowContextMenu(false);
						e.preventDefault();
					}}
				>
					<MenuItemLabel>Duplicate</MenuItemLabel>
					<MenuItemShortcut>⌘ D</MenuItemShortcut>
				</MenuItem> */}

				{selectedTile && (
					<MenuItemDivider>
						<MenuItemDividerLine />
					</MenuItemDivider>
				)}

				{selectedTile && (
					<MenuItemDestructive
						onTap={() => {
							if (selectedTile) {
								deleteTile(selectedTile);
								setShowContextMenu(false);
								playTileDeleteSound();
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={playHoverSound01}
					>
						<MenuItemLabelDestructive>Delete</MenuItemLabelDestructive>
						<MenuItemShortcutDestructive>⌫</MenuItemShortcutDestructive>
					</MenuItemDestructive>
				)}
			</Menu>
		</Wrap>
	);
};
