import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { LabelButton } from "../ds/Buttons";
import { Setting } from "./Setting";
import { TomeContext } from "../tome/TomeContext";
import { artStyles, imageOptions, CREATE_TOME_IMAGE_OPTIONS, CREATE_TOME_LENGTH_OPTIONS } from "./PromptConstants";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;

	font-family: "Inter";
	font-size: 13px;
	line-height: 20px;
`;

export const ScopedControls = props => {
	const { showMenu, closeMenu, menuInfo } = React.useContext(TomeContext);
	const moreBtnId = "prompt_create_tome_more_button";

	const createTomeSettingsLengthBtnId = "create_tome_settings_length";
	const createTomeSettingsTypeBtnId = "create_tome_settings_type";
	const createTomeSettingsImageBtnId = "create_tome_settings_image";
	const createTomeSettingsThemeBtnId = "create_tome_settings_theme";

	const createImageSettingsBtnId = "create_image_settings";
	const web2tomeImageSettingsBtnId = "web2tome_image_settings_btn";
	const createTomeFormatBtnId = "create_tome_format_btn";

	// Images / Art Syle Label
	let imagesLabel = "Art style";
	let imagesTileLabel = "Art style";
	if (props.prompt.images.id === imageOptions[0].id) {
		if (props.prompt.artStyle.id === artStyles[0].id) {
			imagesLabel = "Art style";
			imagesTileLabel = "Art style";
		} else if (props.prompt.artStyle.id === artStyles[1].id) {
			imagesLabel = "Unstyled";
			imagesTileLabel = "Unstyled";
		} else {
			//imagesLabel = props.prompt.artStyle.name + " images";
			imagesLabel = props.prompt.artStyle.name;
			imagesTileLabel = props.prompt.artStyle.name;
		}
	}
	if (props.prompt.images.id === imageOptions[1].id) imagesLabel = imageOptions[1].name;
	if (props.prompt.images.id === imageOptions[2].id) imagesLabel = imageOptions[2].name;
	if (props.prompt.images.id === imageOptions[3].id) imagesLabel = imageOptions[3].name;

	// Web2Tome images label
	let web2TomeImageLabel = props.prompt.web2TomeImage.label;

	const createTomeImagesLabel = CREATE_TOME_IMAGE_OPTIONS.find(
		o => o.id === props.prompt.createTomeImages.id
	).selectedLabel;

	let lengthIndex = Math.round((CREATE_TOME_LENGTH_OPTIONS.length-1) * props.prompt.createTomePageLength);
	if (lengthIndex < 0) lengthIndex = 0;
	const createTomePageLengthLabel = CREATE_TOME_LENGTH_OPTIONS[lengthIndex].label;
	//console.log(lengthIndex)

	return (
		<Wrap style={{ originX: 1, originY: 0.5, pointerEvents: "auto", x: 5 }}>
			{/* Scoped Recents */}

			{/* Artifact Chooser 
			{props.scope && (props.scope.id === "command_create_tome" || props.scope.id === "command_create_tome") && (
				<Setting
					label={props.prompt.type.name}
					theme={props.theme}
					id={createTomeSettingsTypeBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsTypeBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_create_tome_types",
							buttonId: createTomeSettingsTypeBtnId,
							alignX: "leading",
							alignY: "leading",
						});
					}}
				/>
			)}
			*/}

			{/* Create Tome — Theme */}
			{props.scope && props.scope.id === "command_create_tome" && (
				<Setting
					//label={props.prompt.createTomeTheme.name} //"Theme"
					label={"Theme"}
					//iconName={"ColorPaletteFill"}
					theme={props.theme}
					previewTheme={props.prompt.createTomeTheme}
					id={createTomeSettingsThemeBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsThemeBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_create_tome_theme",
							buttonId: createTomeSettingsThemeBtnId,
							alignX: "leading",
							alignY: "leading",
						});
					}}
				/>
			)}

			{/* Create Tome — Format */}
			{props.scope && props.scope.id === "command_create_tome" && (
				<Setting
					label={props.prompt.createTomeFormat.label}
					iconName={props.prompt.createTomeFormat.icon} //"ListBullet"
					//label={"Format"}
					theme={props.theme}
					id={createTomeFormatBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeFormatBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_create_tome_format",
							buttonId: createTomeFormatBtnId,
							alignX: "leading",
							alignY: "leading",
						});
					}}
				/>
			)}

			{/* Create Tome — Images */}
			{props.scope && (props.scope.id === "command_create_tome" || props.scope.id === "command_create_page") && (
				<Setting
					label={createTomeImagesLabel}
					//label={"Images"}
					//iconName={"Photo"}
					iconName={props.prompt.createTomeImages.icon}
					theme={props.theme}
					id={createTomeSettingsImageBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsImageBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_create_tome_images",
							buttonId: createTomeSettingsImageBtnId,
							alignX: "leading",
							alignY: "leading",
						});
					}}
				/>
			)}

			{/* Create Tome — Page Length */}
			{props.scope && props.scope.id === "command_create_tome" && (
				<Setting
					//label={props.prompt.createTomePageLength}
					//label={"20+"}
					label={createTomePageLengthLabel}
					iconName={"SquareStack"} //ArrowLeftRightOut
					theme={props.theme}
					id={createTomeSettingsLengthBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsLengthBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_create_tome_length",
							buttonId: createTomeSettingsLengthBtnId,
							alignX: "middle",
							alignY: "leading",
						});
					}}
				/>
			)}

			{/* Create Image — Art Style Chooser */}
			{props.scope && props.scope.id === "command_create_image" && (
				<Setting
					label={imagesTileLabel}
					theme={props.theme}
					id={createImageSettingsBtnId}
					active={menuInfo.show && menuInfo.buttonId === createImageSettingsBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_create_images",
							buttonId: createImageSettingsBtnId,
							alignX: "leading",
							alignY: "leading",
						});
					}}
				/>
			)}

			{/* Web2Tome Image Options */}
			{props.scope && props.scope.id === "command_create_page_from_webpage" && (
				<Setting
					label={web2TomeImageLabel}
					theme={props.theme}
					id={web2tomeImageSettingsBtnId}
					active={menuInfo.show && menuInfo.buttonId === web2tomeImageSettingsBtnId}
					onTap={e => {
						showMenu({
							type: "prompt_web2tome_images",
							buttonId: web2tomeImageSettingsBtnId,
							alignX: "leading",
							alignY: "leading",
						});
					}}
				/>
			)}

			{props.scope && props.scope.recentsList && props.scope.recentsList.length > 0 && (
				<Setting
					iconName="Clock"
					//label={"Recents"}
					//active={props.filteredChildList.length > 0}
					theme={props.theme}
					onTap={props.toggleRecentsList}
				/>
			)}

			{/* Doc2Tome Submit Button */}
			{props.scope && props.scope.id === "command_doc_2_tome" && (
				<LabelButton
					label="Generate"
					disabled={props.value.length > 500 ? false : true}
					theme={props.theme}
					fontSize={13}
					height={26}
					paddingX={8}
					backgroundColor={props.theme.colors.accent}
					labelColor={"#fff"}
					labelHoverColor={"#fff"}
					borderRadius={6}
					onTap={props.submitPrompt}
				/>
			)}
		</Wrap>
	);
};
