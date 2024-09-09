import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";
import { transitions } from "../ds/Transitions";
import { LoadingIndicator } from "../ds/LoadingIndicator";
import { IconLabelButton } from "../ds/Buttons";

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

const AIButtonContainer = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: right;
	align-items: flex-end;
	gap: 8px;
	position: absolute;
	bottom: 8px;
	right: 11px;
`;

export const TileImage = props => {
	const { scale } = useContext(MetricsContext).metrics;
	const captionWidth = props.tileWidth ? props.tileWidth : 100;

	const onFileLoaded = () => {
		//console.log("image tile: file loaded")
		//calcRowHeights();
	};

	//if (props.tile) props.tile.onFileLoaded = onFileLoaded;
	const isLoading = props.tile && props.tile.params && props.tile.params.isLoading ? true : false;
	//console.log(props.tile.params.isLoading)

	let backgroundColor = "transparent";
	if (isLoading) backgroundColor = props.theme.colors.z1;
	backgroundColor = props.theme.colors.z1;
	if (props.backgroundColor) backgroundColor = props.backgroundColor;

	return (
		<ImageWrap
			style={{
				backgroundColor: backgroundColor,
			}}
		>
			{props.tile && props.tile.params.isLoading && !props.isPreview && <LoadingIndicator />}

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
					initial={false}
					animate={{
						opacity: isLoading ? 0 : 1,
					}}
					transition={{
						type: "tween",
						duration: 0.5,
					}}
					onLoad={e => {
						console.log("loaded");
						// Not to self: can't do this with a div you dummy
					}}
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
					<Device
						image={"/images/iphone-12-mini-black.png"}
						style={{ height: "100%", backgroundSize: "contain" }}
					/>
				</DeviceWrap>
			)}

			{/* 
			{!props.image && !props.deviceImage && !isLoading && (
				<NullMediaTile
					tileId={props.tileId}
					row={props.row}
					tile={props.tile}
					rowHeight={props.rowHeight}
					scale={scale}
					iconName={"Image"}
					buttonLabel={"Upload image"}
					labelLabel={"Or drop here"}
					theme={props.theme}
					tileWidth={props.tileUnitWidth}
				/>
			)} */}

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

			<AIButtonContainer>
				<IconLabelButton icon="Upload" label="Upload" theme={props.theme} />
				<IconLabelButton
					icon="DoubleSparkle"
					label="Regenerate"
					theme={props.theme}
					onTap={e => {
						console.log(props.image);

						if (props.image === "/d-bgs/image9.jpg") {
							props.tile.params.image = "/d-bgs/image10-2.jpg";
						}

						if (props.image === "/d-bgs/image10-2.jpg") {
							props.tile.params.image = "/d-bgs/image10-3.jpg";
						}

						if (props.image === "/d-bgs/image10-3.jpg") {
							props.tile.params.image = "/d-bgs/image10-4.jpg";
						}

						if (props.image === "/d-bgs/image10-4.jpg") {
							props.tile.params.image = "/d-bgs/image9.jpg";
						}

						props.setTomeData({...props.tomeData})
					}}
				/>
			</AIButtonContainer>
		</ImageWrap>
	);
};
