import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";
import { NullMediaTile } from "./NullTile";
import { transitions } from "../ds/Transitions";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	//overflow: hidden;
`;

const Image = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
`;
const DeviceWrap = styled(ImageWrap)``;
const Device = styled(Image)``;

export const CaptionContainer = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	pointer-events: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
`;

export const Caption = styled(motion.div)`
	backdrop-filter: blur(50px);
	word-wrap: break-word;
	word-break: all;
	overflow-wrap: break-word;
`;

export const TileImage = props => {
	const { scale } = useContext(MetricsContext).metrics;
	const captionWidth = props.tileWidth ? props.tileWidth : 100;

	return (
		<ImageWrap
			style={{
				backgroundColor: props.backgroundColor ? props.backgroundColor : props.image ? "transparent" : colors.z2,
			}}
		>
			{props.image && (
				<Image
					style={{
						backgroundSize: props.imageSize ? props.imageSize : "cover",
						backgroundPosition: props.imagePosition ? props.imagePosition : "center",
						top: props.paddingY ? props.paddingY * scale : undefined,
						bottom: props.paddingY ? props.paddingY * scale : undefined,
						height: props.paddingY ? "unset" : "100%",
					}}
					image={props.image}
				/>
			)}

			{props.deviceImage && (
				<DeviceWrap>
					<Image
						style={{
							backgroundSize: "contain",
							backgroundPosition: props.imagePosition ? props.imagePosition : "center",
							top: props.paddingY ? props.paddingY * scale : undefined,
							bottom: props.paddingY ? props.paddingY * scale : undefined,
							height: props.paddingY ? "unset" : "100%",
						}}
						image={props.deviceImage}
					/>
					<Device image={"/images/iphone-12-mini-black.png"} style={{ height: "100%", backgroundSize: "contain" }} />
				</DeviceWrap>
			)}

			{!props.image &&
				!props.deviceImage && (
					<NullMediaTile
						rowHeight={props.rowHeight}
						scale={scale}
						iconName={"Image"}
						buttonLabel={"Upload image"}
						labelLabel={"Or drop here"}
						theme={props.theme}
						tileWidth={props.tileUnitWidth}
					/>
				)}

			{props.caption && (
				<CaptionContainer
					animate={{
						width: captionWidth,
						minWidth: captionWidth,
					}}
					transition={transitions.layoutTransition}
				>
					<Caption
						style={{
							width: captionWidth - 16 * scale * 2,
							minWidth: captionWidth - 16 * scale * 2,
							overflow: "hidden",
							margin: 16 * scale,
							backgroundColor: props.caption.background,
							color: props.caption.text,
							fontFamily: props.theme.typography.fontFamily,
							fontSize: props.theme.typography.fontSize.CAPTION * scale,
							padding: `${5 * scale}px ${8 * scale}px`,
							borderRadius: `${8 * scale}px`,
							fontWeight: props.theme.typography.fontWeight.CAPTION,
							lineHeight: props.theme.typography.lineHeight.CAPTION,
							textAlign: "center",
						}}
					>
						{props.caption.content}
					</Caption>
				</CaptionContainer>
			)}
		</ImageWrap>
	);
};
