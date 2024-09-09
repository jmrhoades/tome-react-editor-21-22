import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";
import { InputStates } from "./Prompt";
import { IconButton } from "../ds/Buttons";
import { TomeContext } from "../tome/TomeContext";
import { Setting } from "./Setting";
import { artStyles, imageOptions } from "./PromptConstants";

const Wrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding: 0px;
	gap: 16px;

	width: 100%;
`;

const SettingsWrap = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 20px;
`;

const Accessories = styled(motion.div)``;

export const Settings = props => {
	const colors = props.theme.colors;

	const { showMenu, closeMenu, menuInfo } = React.useContext(TomeContext);
	const moreBtnId = "prompt_create_tome_more_button";
	const createTomeSettingsPagesBtnId = "create_tome_settings_pages";
	const createTomeSettingsTypeBtnId = "create_tome_settings_type";
	const createTomeSettingsImageBtnId = "create_tome_settings_image";

	let imagesLabel = "";
	if (props.prompt.images.id === imageOptions[0].id) {
		if (props.prompt.artStyle.id === artStyles[0].id) {
			imagesLabel = "Images";
		} else if (props.prompt.artStyle.id === artStyles[1].id) {
			imagesLabel = "Unstyled";
		} else {
			//imagesLabel = props.prompt.artStyle.name + " images";
			imagesLabel = props.prompt.artStyle.name;
		}
	}
	if (props.prompt.images.id === imageOptions[1].id) imagesLabel = "Placeholders";
	if (props.prompt.images.id === imageOptions[2].id) imagesLabel = "No images";
	return (
		<Wrap
			style={{
				marginTop: 16,
			}}
		>
			<SettingsWrap
				style={{
					x: -4,
				}}
			>
				{/* <Setting
					label={props.prompt.pages + " PAGE"}
					theme={props.theme}
					id={createTomeSettingsPagesBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsPagesBtnId}
					onTap={e => {
						if (menuInfo.show && menuInfo.buttonId === createTomeSettingsPagesBtnId) {
							closeMenu();
						} else {
							showMenu({
								type: "prompt_create_tome_pages",
								buttonId: createTomeSettingsPagesBtnId,
								alignX: "leading",
								alignY: "leading",
							});
						}
					}}
				/> */}
				<Setting
					label={props.prompt.type.name}
					theme={props.theme}
					id={createTomeSettingsTypeBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsTypeBtnId}
					onTap={e => {
						if (menuInfo.show && menuInfo.buttonId === createTomeSettingsTypeBtnId) {
							closeMenu();
						} else {
							showMenu({
								type: "prompt_create_tome_types",
								buttonId: createTomeSettingsTypeBtnId,
								alignX: "leading",
								alignY: "leading",
							});
						}
					}}
				/>
				<Setting
					label={imagesLabel}
					theme={props.theme}
					id={createTomeSettingsImageBtnId}
					active={menuInfo.show && menuInfo.buttonId === createTomeSettingsImageBtnId}
					onTap={e => {
						if (menuInfo.show && menuInfo.buttonId === createTomeSettingsImageBtnId) {
							closeMenu();
						} else {
							showMenu({
								type: "prompt_create_tome_images",
								buttonId: createTomeSettingsImageBtnId,
								alignX: "leading",
								alignY: "leading",
							});
						}
					}}
				/>
			</SettingsWrap>

			<Accessories
				style={{
					x: 12,
				}}
			>
				<Setting
					iconName="Info"
					theme={props.theme}
					id={moreBtnId}
					active={menuInfo.show && menuInfo.buttonId === moreBtnId}
					onTap={e => {
						if (menuInfo.show && menuInfo.buttonId === moreBtnId) {
							closeMenu();
						} else {
							showMenu({
								type: "prompt_create_tome_info",
								buttonId: moreBtnId,
								alignX: "middle",
								alignY: "leading",
							});
						}
					}}
				/>
			</Accessories>
		</Wrap>
	);
};
