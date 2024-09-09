import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { NullMediaTile } from "./NullTile";
import { transitions } from "../ds/Transitions";
import { Spinner } from "../ds/Spinner";
import { RegenButton } from "../ds/Buttons";
import { TomeContext } from "../tome/TomeContext";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
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
	top: 8px;
	left: 8px;
`;

const ImageLoader = styled(motion.img)`
	position: absolute;
	pointer-events: none;
	top: 0;
	left: 0;
	opacity: 0;
`;

export const TileImage = props => {
	const { isReviewing } = useContext(TomeContext);
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
			)}

			{props.tile && props.tile.params.isLoading && !props.isPreview && (
				<Spinner
					size={72 * scale}
					background={props.theme.colors.t2}
					foreground={props.theme.colors.t6}
					strokeWidth={3}
				/>
			)}

			{props.isPreview && (
				<ImageLoader
					src={props.image}
					onLoad={e => {
						props.tile.params.isLoading = false;
						props.saveState();
					}}
				/>
			)}

			{props.image && props.image.length > 1 && (
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

			{props.tile.params.canRegenerate &&
				props.image &&
				props.image.length > 1 &&
				props.prompt &&
				!props.isPreview &&
				isReviewing && (
					<RegenButton
						//disabled={isLoading}
						icon="DoubleSparkle"
						label="Regenerate"
						loadingLabel="Regenerating…"
						hasBackground={true}
						theme={props.theme}
						isLoading={isLoading}
						// style={{
						// 	pointerEvents: isLoading ? "none" : "auto",
						// }}
						onTap={
							isLoading
								? undefined
								: e => {
										//console.log(props.image);
										//props.tile.params.image = "";
										props.tile.params.isLoading = true;
										props.tile.params.needsGeneration = true;
										props.requestImageForTile(props.tile);
										props.saveState();
								  }
						}
					/>
				)}
		</ImageWrap>
	);
};
