import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";
import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";

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
`;

const MenuItem = styled(motion.div)`
	min-width: 160px;
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
		duplicateTile,
		showContextMenu,
		setShowContextMenu,
		contextMenuInfo,
		selectedTile,
		pasteClipboard,
		copiedTile,
        replaceWithClipboard,
	} = useContext(TomeContext);

	const { scrollTileIntoView } = useContext(MetricsContext);
	const [canPaste, setCanPaste] = useState(false);

	useEffect(() => {
		if (showContextMenu) {
			document.body.style.overflow = "hidden";
			if (copiedTile.current) {
				setCanPaste(true);
			} else {
				setCanPaste(false);
			}
		} else {
			document.body.style.overflow = "auto";
		}
	}, [showContextMenu, setCanPaste, copiedTile]);

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
				<MenuItem
					onTap={() => {
						if (selectedTile) {
							cutTile(selectedTile);
							setShowContextMenu(false);
						}
					}}
					onContextMenu={e => {
						setShowContextMenu(false);
						e.preventDefault();
					}}
				>
					<MenuItemLabel>Cut</MenuItemLabel>
					<MenuItemShortcut>⌘ X</MenuItemShortcut>
				</MenuItem>
				<MenuItem
					onTap={() => {
						if (selectedTile) {
							copyTile(selectedTile);
							setShowContextMenu(false);
						}
					}}
					onContextMenu={e => {
						setShowContextMenu(false);
						e.preventDefault();
					}}
				>
					<MenuItemLabel>Copy</MenuItemLabel>
					<MenuItemShortcut>⌘ C</MenuItemShortcut>
				</MenuItem>
				<MenuItem
					className={canPaste ? "enabled" : "disabled"}
					style={{
						pointerEvents: canPaste ? "auto" : "none",
					}}
					onTap={() => {
						const t = pasteClipboard();
						if (t) scrollTileIntoView(t);
                        if (showContextMenu) setShowContextMenu(false);
					}}
					onContextMenu={e => {
						setShowContextMenu(false);
						e.preventDefault();
					}}
				>
					<MenuItemLabel>Paste</MenuItemLabel>
					<MenuItemShortcut>⌘ V</MenuItemShortcut>
				</MenuItem>
                <MenuItem
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
				</MenuItem>
				<MenuItem
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
				</MenuItem>
				<MenuItemDivider>
					<MenuItemDividerLine />
				</MenuItemDivider>
				<MenuItemDestructive
					onTap={() => {
						if (selectedTile) {
							deleteTile(selectedTile);
							setShowContextMenu(false);
						}
					}}
                    onContextMenu={e => {
                        setShowContextMenu(false);
                        e.preventDefault();
                    }}
				>
					<MenuItemLabelDestructive>Delete</MenuItemLabelDestructive>
					<MenuItemShortcutDestructive>⌫</MenuItemShortcutDestructive>
				</MenuItemDestructive>
			</Menu>
		</Wrap>
	);
};
