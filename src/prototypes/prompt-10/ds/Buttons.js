import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { Icon } from "../../../ds/Icon";
import { Spinner } from "./Spinner";
import { transitions } from "./Transitions";

export const fieldTypeStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "15px",
	lineHeight: "20px",
};

export const buttonLabelStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	lineHeight: "20px",
	overflow: "hidden",
	whiteSpace: "nowrap",
	textAlign: "center",
};

export const recordLabelStyles = {
	fontFamily: "Inter",
	fontStyle: "normal",
	fontWeight: 400,
	fontSize: "13px",
	lineHeight: 1,
};

const Button = styled(motion.div)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	gap: 6px;

`;

const ButtonContent = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;
`;

const Anchor = styled(motion.a)`
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const Label = styled(motion.div)`
	position: relative;
	overflow: visible;
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
const ActiveBackground = styled(Background)``;

export const IconButton = ({
	theme,
	width = 40,
	height = 40,
	borderRadius = 8,
	iconSize = 28,
	onTap = null,
	active = false,
	backgroundColor = "transparent",
	color = theme.colors.controls.icon,
	activeColor = theme.colors.accent,
	hoverBackgroundColor = theme.colors.t2,
	activeBackgroundColor = theme.colors.t2,
	hasActiveBackground = true,
	icon = "PlaybackPlay",
	hasHover = true,
	to = undefined,
	style = {},
	showBorder = false,
	id = undefined,
	disabled = undefined,
}) => {
	const El = to ? Anchor : Button;
	const href = to;

	const containerVariants = {
		default: {
			scale: 1,
		},
		active: {
			scale: 1,
		},
		pressing: {
			scale: 0.95,
		},
		hovering: {
			scale: 1,
		},
	};
	const hoverVariants = {
		default: {
			opacity: 0,
		},
		hovering: {
			opacity: 1,
		},
	};

	return (
		<El
			variants={containerVariants}
			initial={"default"}
			whileHover={"hovering"}
			whileTap={"pressing"}
			style={{
				width,
				height,
				borderRadius,
				//background: background,
				//backdropFilter: "blur(30px)",
				boxShadow: showBorder ? `0px 0px 0px 1px ${theme.colors.t4}` : "none",
				...style,
				pointerEvents: disabled ? "none" : "auto",
				opacity: disabled ? 0.5 : 1,
			}}
			onTap={onTap}
			href={href}
			id={id}
		>
			<Background
				style={{
					backgroundColor: backgroundColor,
				}}
			/>

			{active && hasActiveBackground && (
				<ActiveBackground
					initial={false}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					style={{ backgroundColor: activeBackgroundColor }}
				/>
			)}

			{!active && hasHover && (
				<HoverBackground
					variants={hoverVariants}
					transition={transitions.basic}
					style={{ backgroundColor: hoverBackgroundColor }}
				/>
			)}

			<Icon
				name={icon}
				size={iconSize}
				opacity={1}
				color={active ? activeColor : color}
				transition={{ duration: 0.2 }}
			/>
		</El>
	);
};

export const LabelButton = ({
	theme,
	height = 32,
	width = "auto",
	paddingX = 8,
	borderRadius = 6,
	onTap = null,
	active = false,
	backgroundColor = "transparent",
	backgroundHoverColor = theme.colors.t2,
	backgroundDisabledColor = theme.colors.t1,
	label = "Label",
	fontSize = 15,
	fontWeight = 400,
	labelColor = theme.colors.controls.label,
	labelHoverColor = theme.colors.controls.labelHover,
	labelActiveColor = theme.colors.labelActive,
	labelDisabledColor = theme.colors.t4,
	style = {},
	icon = undefined,
	iconSize = 24,
	disabled = false,
	initial = undefined,
	animate = undefined,
}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	return (
		<Button
			style={{
				paddingLeft: paddingX,
				paddingRight: paddingX,
				height,
				width,
				borderRadius,
				...style,
			}}
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
			whileTap={{
				scale: 0.95,
			}}
			onTap={onTap}
			initial={initial}
			animate={animate}
		>
			<Background
				style={{
					backgroundColor: disabled ? backgroundDisabledColor : backgroundColor,
				}}
			/>
			<HoverBackground
				style={{
					backgroundColor: backgroundHoverColor,
				}}
				animate={{
					opacity: isHovering ? 1 : 0,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			/>

			{icon && (
				<div style={{ marginRight: 0 }}>
					<Icon
						name={icon}
						opacity={1}
						color={disabled ? labelDisabledColor : active ? labelActiveColor : isHovering ? labelHoverColor : labelColor}
						transition={{ duration: 0.2 }}
						size={iconSize}
					/>
				</div>
			)}
			<Label
				style={{
					...buttonLabelStyles,
					fontSize: fontSize,
					fontWeight: fontWeight,
				}}
				animate={{
					color: disabled ? labelDisabledColor : active ? labelActiveColor : isHovering ? labelHoverColor : labelColor,
				}}
				transition={{
					duration: 0.1,
				}}
				initial={false}
			>
				{label}
			</Label>
		</Button>
	);
};

export const RegenButton = ({
	theme,
	onTap = undefined,
	active = undefined,
	disabled = undefined,
	isLoading = false,

	hasBackground = true,
	backgroundColor = "hsla(0,0%,0%,0.40)",
	backgroundColorHover = theme.colors.t2,
	backgroundColorActive = theme.colors.t6,

	label = "Label",
	labelColor = theme.colors.t9,
	labelColorHover = theme.colors.t9,
	labelColorActive = theme.colors.t9,

	loadingLabel = "Rewriting…",

	icon = "DoubleSparkle",
	iconColor = theme.colors.t9,
	iconColorHover = theme.colors.t9,
	iconColorActive = theme.colors.t9,

	paddingLeft = 8,
	paddingRight = 10,
	borderRadius = 6,
	style = {},

}) => {
	const [isHovering, setIsHovering] = React.useState(false);

	React.useEffect(() => {
		if (isLoading) {
			setIsHovering(false);
		}
	}, [isLoading]);

	return (
		
			<Button
				//layout
				style={{
					paddingLeft: paddingLeft,
					paddingRight: paddingRight,
					height: 28,
					...style,
				}}
				onHoverStart={() => setIsHovering(true)}
				onHoverEnd={() => setIsHovering(false)}
				onMouseDown={e => {
					e.stopPropagation();
				}}
				onMouseUp={e => {
					e.stopPropagation();
				}}
				whileTap={{ scale: 0.975 }}
				onTap={onTap}
			>
				{hasBackground && (
					<Background
						style={{
							backgroundColor: backgroundColor,
							borderRadius: borderRadius,
							backdropFilter: "blur(100px)",
						}}
						animate={{
							opacity: !isLoading ? 1 : 0,
						}}
						transition={{
							duration: 0.2,
						}}
						initial={false}
					/>
				)}
				<HoverBackground
					style={{
						backgroundColor: backgroundColorHover,
						borderRadius: borderRadius,
					}}
					animate={{
						opacity: isHovering && !isLoading ? 1 : 0,
					}}
					transition={{
						duration: 0.2,
					}}
					initial={{
						opacity: 0,
					}}
				/>
					{isLoading && (
						<Spinner  size={18} background={theme.colors.t6} foreground={theme.colors.accent} strokeWidth={1.75} />
					)}
					{!isLoading && (
						<Icon
							name={icon}
							opacity={1}
							color={active ? iconColorActive : isHovering ? iconColorHover : iconColor}
							transition={{ duration: 0.2 }}
							size={16}
							
						/>
					)}

					{!isLoading && label.length > 0 && (
						<Label
							style={{
								...buttonLabelStyles,
								fontSize: 13,
								y: -0.5,
							}}
							animate={{
								color: active ? labelColorActive : isHovering ? labelColorHover : labelColor,
							}}
							transition={{
								duration: 0.2,
							}}
							initial={false}
							
						>
							{label}
						</Label>
					)}
				
				
				{/* {!isLoading && (
					<ButtonContent layout="position">
						<Icon
							name={icon}
							opacity={1}
							color={active ? iconColorActive : isHovering ? iconColorHover : iconColor}
							transition={{ duration: 0.2 }}
							size={16}
						/>
						<Label
							style={{
								...buttonLabelStyles,
								fontSize: 13,
								y: -0.5,
							}}
							animate={{
								color: active ? labelColorActive : isHovering ? labelColorHover : labelColor,
							}}
							transition={{
								duration: 0.2,
							}}
							initial={false}
						>
							{label}
						</Label>
					</ButtonContent>
				)} */}
			</Button>
		
	);
};
