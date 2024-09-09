import React from "react";
import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { Icon } from "../../../ds/Icon";

const SettingWrap = styled(motion.button)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	position: relative;
`;

const Label = styled(motion.div)`
	font-family: "Inter";
	font-size: 13px;
	line-height: 20px;
	font-weight: 400;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: visible;
	position: relative;
	/* text-transform: uppercase; */
	/* letter-spacing: 0.24px; */

	-moz-font-feature-settings: "ss02";
	-webkit-font-feature-settings: "ss02";
	font-feature-settings: "ss02";
`;

const Background = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	pointer-events: none;
`;

const HoverBackground = styled(Background)``;

const ThemePreview = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const ThemePreviewPage = styled(ThemePreview)``;
const ThemePreviewContent = styled(motion.div)``;

export const Setting = props => {
	const colors = props.theme.colors.promptbar;
	const assetSize = 20;
	const [isHovering, setIsHovering] = React.useState(false);

	//const padding = props.iconName ? "3px" : "6px 6px 6px 8px";
	//const padding = props.iconName ? "3px" : "6px 8px";

	let padding = "3px 8px 3px 5px";
	if (!props.label) padding = "3px";

	let bgColor = colors.buttonBackground;
	let boxShadow = "transparent";

	let buttonLabelActive = colors.buttonLabelActive;
	let buttonLabelHover = colors.buttonLabelHover;
	let buttonLabel = colors.buttonLabel;

	let buttonIcon = colors.buttonIcon;
	let buttonIconHover = colors.buttonIconHover;
	let buttonIconActive = colors.buttonIconActive;

	/*
	if (props.previewTheme) {
		bgColor = props.previewTheme.colors.backgrounds.page;

		buttonLabel = props.previewTheme.colors.text.body;
		buttonLabelHover = buttonLabel;
		buttonLabelActive = props.previewTheme.colors.text.body; //heading
		
		buttonIcon = props.previewTheme.colors.text.body;
		buttonIconHover = buttonIcon;
		buttonIconActive = props.previewTheme.colors.text.body; //heading

		if (props.theme.mode === "dark") {
			if (props.previewTheme.previewOutlineDark) {
				boxShadow = `0px 0px 0px 1px ${props.previewTheme.previewOutlineDark} `;
			}
		}
	}
	*/

	return (
		<SettingWrap
			id={props.id}
			style={{
				cursor: "pointer",
				padding: padding,
			}}
			onMouseMove={() => {
				if (!isHovering) {
					setIsHovering(true);
				}
			}}
			onHoverEnd={() => {
				setIsHovering(false);
			}}
			onMouseDown={e => {
				e.stopPropagation();
				e.preventDefault();
				props.onTap();
			}}
		>
			<Background
				style={{
					backgroundColor: bgColor,
					borderRadius: 6,
					boxShadow: boxShadow,
					opacity: 1,
				}}
			/>
			<HoverBackground
				style={{
					backgroundColor: colors.buttonBackgroundHover,
					borderRadius: 6,
				}}
				animate={{
					opacity: isHovering && !props.active ? 1 : 0,
				}}
				transition={{ duration: 0.15, ease: "easeOut" }}
				initial={false}
			/>

			{props.iconName && (
				<Icon
					name={props.iconName}
					size={assetSize}
					opacity={1}
					color={
						props.active
							? props.iconActiveColor
								? props.iconActiveColor
								: buttonIconActive
							: isHovering
							? buttonIconHover
							: buttonIcon
					}
					transition={{ duration: isHovering ? 0.15 : 0, ease: "easeOut" }}
				/>
			)}

			{props.previewTheme && (
				<ThemePreview
					style={{
						width: assetSize,
						height: assetSize,
					}}
				>
					<ThemePreviewPage
						style={{
							width: 16,
							height: 16,
							backgroundColor: props.previewTheme.colors.backgrounds.page,
							borderRadius: 2,
							boxShadow: props.theme.mode === "dark" ? "0 0 0 1px hsla(0, 0%, 100%, 0.16) inset" : "transparent",
						}}
					>
						<ThemePreviewContent
							style={{
								color: props.previewTheme.colors.text.heading,
								fontSize: 9.5,
								fontWeight: 600,
								fontStyle: "italic",
								lineHeight: "18px",
								y: -0.5,
								x: 0.5,
							}}
						>
							A
						</ThemePreviewContent>
					</ThemePreviewPage>
				</ThemePreview>
			)}

			{props.label && (
				<Label
					transition={{ duration: isHovering ? 0.15 : 0, ease: "easeOut" }}
					initial={false}
					animate={{
						color: props.active ? buttonLabelActive : isHovering ? buttonLabelHover : buttonLabel,
					}}
					style={{
						//minWidth: 15,
						textAlign: "left",
					}}
				>
					{props.label}
				</Label>
			)}
			{/* {props.iconName && (
			<Icon
				name={props.iconName ? props.iconName : "Dropdown"}
				size={props.iconName ? 20 : 10}
				opacity={1}
				color={
					props.active
						? props.iconActiveColor
							? props.iconActiveColor
							: colors.buttonIconActive
						: isHovering
						? colors.buttonIconHover
						: colors.buttonIcon
				}
				transition={{ duration: isHovering ? 0.15 : 0, ease: "easeOut" }}
			/> */}
		</SettingWrap>
	);
};
