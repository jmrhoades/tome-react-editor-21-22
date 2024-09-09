import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TomeContext } from "../tome/TomeContext";
import { makeTome } from "./PromptScript";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { SuccessIndicator } from "../ds/SuccessIndicator";
import { PromptPlaceholders } from "./PromptPlaceholders";
import { Suggestions } from "./Suggestions";
import { Icon } from "../../../ds/Icon";

const Bar = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px 24px;
	gap: 0px;
	width: 100%;
	position: relative;
`;

const Shortcut = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
`;

const ChipWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 4px 6px;
	border-radius: 6px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;

	cursor: pointer;
`;

const ChipMenuWrap = styled(motion.div)`
	position: absolute;
	bottom: -8px;
	left: 18px;
	padding: 6px;
`;

const Item = styled(motion.div)`
	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	border-radius: 6px;
	padding: 6px;
	cursor: pointer;
`;

const transition = {
	ease: "easeOut",
	duration: 0.2,
};

export const ChipBar = props => {
	
	return (
		<Bar style={{}}>
			<CurrentChip theme={props.theme} onTap={props.setShowChipMenu}>
				{props.chipText}
			</CurrentChip>
			<Shortcut
				style={{
					color: props.theme.colors.t4,
				}}
			>
				⌘K
			</Shortcut>
			{props.showChipMenu && (
				<ChipMenu
					theme={props.theme}
					setShowMenu={props.setShowChipMenu}
					setChipText={props.setChipText}
					fieldRef={props.fieldRef}
					prompts={props.prompts}
					chipText={props.chipText}
				/>
			)}
		</Bar>
	);
};

const CurrentChip = props => {
	const item = {
		default: { backgroundColor: props.theme.colors.t1, color: props.theme.colors.t7 },
		hover: { backgroundColor: props.theme.colors.t2, color: props.theme.colors.t9 },
	};

	return (
		<ChipWrap
			whileHover={"hover"}
			initial={"default"}
			transition={transition}
			variants={item}
			onTap={() => {
				props.onTap(true);
			}}
		>
			{props.children}
		</ChipWrap>
	);
};

const ChipMenu = props => {
	return (
		<ChipMenuWrap
			style={{
				color: props.theme.colors.t4,
				backgroundColor: props.theme.colors.z2,
				boxShadow: props.theme.shadows.small,
				borderRadius: 12,
				// width: 220,
			}}
		>
			{props.prompts.map(prompt => (
				<ChipMenuItem
					key={prompt.id}
					id={prompt.id}
					label={prompt.label}
					selected={props.chipText === prompt.label}
					theme={props.theme}
					setShowMenu={props.setShowMenu}
					setChipText={props.setChipText}
					fieldRef={props.fieldRef}
				/>
			))}
		</ChipMenuWrap>
	);
};

const ChipMenuItem = props => {
	const colors = props.theme.colors;
	const item = {
		default: { backgroundColor: colors.t0, color: colors.t7 },
		hover: { backgroundColor: colors.t2, color: colors.t9 },
		selected: { backgroundColor: colors.t0, color: colors.t5 },
	};

	return (
		<Item
			style={{
				color: props.theme.colors.t7,
				minWidth: 250,
                position: "relative",
			}}
			variants={item}
			whileHover={props.selected ? null : "hover"}
			initial={props.selected ? "selected" : "default"}
			transition={transition}
			onTap={() => {
				props.setShowMenu(false);
				props.setChipText(props.label);
				props.fieldRef.current.focus();
			}}
		>
			{props.label}
			{props.selected && (
				<div style={{ position: "absolute", right: 6, top: 8,  }}>
					<Icon name="Checkmark" opacity={1} size={16} color={colors.t5} />
				</div>
			)}
		</Item>
	);
};

