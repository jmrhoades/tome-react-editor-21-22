import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../tome/MetricsContext";
import { colors } from "../ds/Colors";
import { NullMediaTile } from "./NullTile";

const ImageWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
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
	overflow: hidden;
	pointer-events: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	padding: 22px;
`;

export const Caption = styled(motion.div)`
	backdrop-filter: blur(50px);
`;

export const TileImage = props => {
	const { scale } = useContext(MetricsContext).metrics;

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
			{!props.image && (
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
				<CaptionContainer>
					<Caption
						style={{
							backgroundColor: props.caption.background,
							color: props.caption.color,
							fontFamily: props.theme.typography.fontFamily,
							fontSize: props.theme.typography.fontSize.CAPTION * scale,
							padding: `${5*scale}px ${8*scale}px`,
							borderRadius: `${8*scale}px`,
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
