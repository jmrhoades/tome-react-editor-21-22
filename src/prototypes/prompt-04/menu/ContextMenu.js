import React, { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useSound from "use-sound";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { tileNames } from "../page/TileConstants";
import { colors } from "../ds/Colors";
//import { Icon } from "../../../ds/Icon";

//import open_menu_sound from "../../../sounds/pop_02.mp3";

import open_menu_sound from "../../../sounds/button_40.mp3";
import close_menu_sound from "../../../sounds/button_37.mp3";

import hover_sound_01 from "../../../sounds/button_38.mp3";

import delete_sound_01 from "../../../sounds/action_11.mp3";
//import cut_sound_01 from "../../../sounds/button_42.mp3";
//import copy_sound_01 from "../../../sounds/button_30.mp3";
//import paste_sound_01 from "../../../sounds/button_46.mp3";

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
	background-color: transparent;
	user-select: none;
`;

const Menu = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const MenuItem = styled(motion.div)`
	min-width: 168px;
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
	&.disabled:hover {
		background-color: rgba(237, 0, 235, 0);
		& :nth-child(2) {
			color: rgba(255, 255, 255, 0.4);
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
		//replaceWithClipboard,
		duplicateTile,
		//pasteClipboardAfterSelectedTile,
		//pasteClipboardAfterRow,
		//pasteClipboardAfterTile,
		//pasteClipboardToRow,
		//pasteClipboardToPage,
		//pasteClipboardToRowGapIndex,
		replaceTileWithClipboardTile,
		pasteFromClipboardToNearestPosition,
		getNewImageTile,
		updateImageTileWithImage,
		currentPage,
		createDynamicBackground,
	} = useContext(TomeContext);

	const { scrollTileIntoView, getRowAndSideForXY, metrics } = useContext(MetricsContext);

	const [canPaste, setCanPaste] = useState(false);
	const tileFromClipboard = useRef();
	const blobFromClipboard = useRef();

	const [playHoverSound01] = useSound(hover_sound_01);
	const [playOpenMenuSound] = useSound(open_menu_sound);
	const [playCloseMenuSound] = useSound(close_menu_sound);
	const [playTileDeleteSound] = useSound(delete_sound_01);
	//const [playTileCutSound] = useSound(cut_sound_01);
	//const [playTileCopySound] = useSound(copy_sound_01);
	//const [playTilePasteSound] = useSound(paste_sound_01);

	//const pasteLabel = selectedTile && canPaste ? "Paste to replace" : "Paste";

	/*
	useEffect(() => {
		if (showContextMenu) {
			const getClipboardContents = async () => {
				try {
					// TODO — I think this needs to be in an click-event handler for Safari
					// https://webkit.org/blog/10855/async-clipboard-api/
					const clipboardItems = await navigator.clipboard.read();
					for (const item of clipboardItems) {
						for (const type of item.types) {
							if (type === "text/plain") {
								const blob = await item.getType(type);
								const tileString = await blob.text();
								try {
									tileFromClipboard.current = JSON.parse(tileString);
									setCanPaste(true);
								} catch (err) {
									console.error(err.name, err.message); // bad json
									setCanPaste(false);
									tileFromClipboard.current = null;
								}
							}
							if (type === "image/png") {
								blobFromClipboard.current = await item.getType(type);
								setCanPaste(true);
							}
						}
					}
				} catch (err) {
					console.error(err.name, err.message);
				}
			};
			getClipboardContents();
			document.body.style.overflow = "hidden";
			playOpenMenuSound();
		} else {
			document.body.style.overflow = "auto";
			tileFromClipboard.current = null;
		}
	}, [showContextMenu, setCanPaste, playOpenMenuSound]);
	*/

	const hasCut = contextMenuInfo.items.indexOf("Cut") > -1;
	const hasCopy = contextMenuInfo.items.indexOf("Copy") > -1;
	const hasPaste = contextMenuInfo.items.indexOf("Paste") > -1;
	const hasDuplicate = contextMenuInfo.items.indexOf("Duplicate") > -1;
	const hasReplace = contextMenuInfo.items.indexOf("Replace") > -1;
	const hasDelete = contextMenuInfo.items.indexOf("Delete") > -1;
	const hasDynamicBackground = contextMenuInfo.items.indexOf("Dynamic Background") > -1;

	const hasDistributeWidths = contextMenuInfo.items.indexOf("DistributeW") > -1;

	const canEdit = selectedTile;

	let menuX = contextMenuInfo.x;
	if (menuX + 180 > metrics.viewportWidth) {
		menuX = metrics.viewportWidth - 180;
	}

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
					backgroundColor: currentPage.theme.colors.backgrounds.panel,
					boxShadow: currentPage.theme.shadows.panel,
					x: menuX,
					y: contextMenuInfo.y,
				}}
			>
				{hasDistributeWidths && (
					<MenuItem
						onTap={() => {
							contextMenuInfo.callback();
							setShowContextMenu(false);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Distribute widths</MenuItemLabel>
					</MenuItem>
				)}

				{hasCut && (
					<MenuItem
						className={canEdit ? "" : "disabled"}
						onTap={() => {
							if (canEdit) {
								cutTile(selectedTile);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Cut</MenuItemLabel>
						<MenuItemShortcut>⌘X</MenuItemShortcut>
					</MenuItem>
				)}

				{hasCopy && (
					<MenuItem
						className={canEdit ? "" : "disabled"}
						onTap={() => {
							if (canEdit) {
								copyTile(selectedTile);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Copy</MenuItemLabel>
						<MenuItemShortcut>⌘C</MenuItemShortcut>
					</MenuItem>
				)}

				{hasPaste && (
					<MenuItem
						className={canPaste ? "enabled" : "disabled"}
						style={{
							pointerEvents: canPaste ? "auto" : "none",
						}}
						onTap={() => {
							let newTile = false;

							if (blobFromClipboard.current) {
								const reader = new FileReader();
								// Is the selected tile null
								if (selectedTile && selectedTile.isNull && tileNames.IMAGE.name === selectedTile.type) {
									newTile = selectedTile;
								} else {
									const info = getRowAndSideForXY(contextMenuInfo.x, contextMenuInfo.y);
									const clipboardTile = getNewImageTile();
									newTile = pasteFromClipboardToNearestPosition(clipboardTile, info);
								}
								reader.onload = function (event) {
									const image = event.target.result;
									updateImageTileWithImage(newTile, image);
									if (showContextMenu) setShowContextMenu(false);
								};
								reader.readAsDataURL(blobFromClipboard.current);
								//URL.createObjectURL(blob)
							}

							if (tileFromClipboard.current) {
								// Is the selected tile null
								if (
									selectedTile &&
									selectedTile.isNull &&
									tileFromClipboard.current.type === selectedTile.type
								) {
									replaceTileWithClipboardTile(selectedTile, tileFromClipboard.current);
									return false;
								}
								const info = getRowAndSideForXY(contextMenuInfo.x, contextMenuInfo.y);
								newTile = pasteFromClipboardToNearestPosition(tileFromClipboard.current, info);
								if (newTile) scrollTileIntoView(newTile);
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

				{hasReplace && (
					<MenuItem
						className={canPaste ? "enabled" : "disabled"}
						style={{
							pointerEvents: canPaste ? "auto" : "none",
						}}
						onTap={() => {
							if (blobFromClipboard.current) {
								const reader = new FileReader();
								const clipboardTile = getNewImageTile();
								replaceTileWithClipboardTile(selectedTile, clipboardTile);
								reader.onload = function (event) {
									const image = event.target.result;
									updateImageTileWithImage(clipboardTile, image);
									if (showContextMenu) setShowContextMenu(false);
								};
								reader.readAsDataURL(blobFromClipboard.current);
								//URL.createObjectURL(blob)
							}

							if (tileFromClipboard.current) {
								replaceTileWithClipboardTile(selectedTile, tileFromClipboard.current);
								if (showContextMenu) setShowContextMenu(false);
							}
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={playHoverSound01}
					>
						<MenuItemLabel>Replace</MenuItemLabel>
						<MenuItemShortcut>⌥ ⌘ V</MenuItemShortcut>
					</MenuItem>
				)}

				{hasDuplicate && (
					<MenuItem
						className={canEdit ? "enabled" : "disabled"}
						style={{
							pointerEvents: canEdit ? "auto" : "none",
						}}
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
						onHoverStart={playHoverSound01}
					>
						<MenuItemLabel>Duplicate</MenuItemLabel>
						<MenuItemShortcut>⌘ D</MenuItemShortcut>
					</MenuItem>
				)}

				{hasDelete && (
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

				{hasDelete && hasDynamicBackground && (
					<MenuItemDivider>
						<MenuItemDividerLine />
					</MenuItemDivider>
				)}

				{hasDynamicBackground && (
					<MenuItem
						onTap={() => {
							createDynamicBackground();
							setShowContextMenu(false);
						}}
						onContextMenu={e => {
							setShowContextMenu(false);
							e.preventDefault();
						}}
						onHoverStart={canEdit ? playHoverSound01 : null}
					>
						<MenuItemLabel>Add Background</MenuItemLabel>
						<MenuItemShortcut>⌘B</MenuItemShortcut>
					</MenuItem>
				)}
			</Menu>
		</Wrap>
	);
};
