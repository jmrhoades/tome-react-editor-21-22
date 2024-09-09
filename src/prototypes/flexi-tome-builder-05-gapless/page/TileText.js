import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//import { useObserver } from "../../../hooks/use-resize-observer";
import useResizeObserver from "use-resize-observer";

import { textBlockType } from "../page/TileConstants";
import { colors } from "../../../ds/Colors";

const Wrap = styled(motion.div)`
	position: relative;
`;

const H1 = styled(motion.h1)`
	position: relative;
	letter-spacing: -0.015em;
	/* -webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto; */
`;

const H2 = styled(motion.h2)`
	position: relative;
	letter-spacing: -0.015em;
	transform-origin: 0 0;
	+ h3 {
		margin-top: ${props => props.h3MarginTop}px;
	}
`;

const H3 = styled(motion.h3)`
	position: relative;
	letter-spacing: -0.015em;
	transform-origin: 0 0;
`;

const P = styled(motion.p)`
	position: relative;
	letter-spacing: -0.0109em;
	transform-origin: 0 0;
	+ h3 {
		margin-top: ${props => props.h3MarginTop}px;
	}
`;

const UL = styled(motion.ul)`
	position: relative;
	font-size: ${props => props.fontSize}px;
	line-height: 1.3;
	color: rgba(255, 255, 255, 0.65);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
	padding-inline-start: 16px;
	list-style-type: disc;

	& li {
		padding: 0.35em 0;
		&::marker {
			color: rgb(166, 166, 166);
		}
	}
`;

const Placeholder = styled(motion.div)``;

export const TileText = props => {
	const scale = props.scale;
	// const ref = useRef(null);

	let textTilePaddingY = 32 * scale;
	let textTilePaddingX = 40 * scale;

	const { ref } = useResizeObserver({
		onResize: ({ width, height }) => {
			props.onContentSizeChange(width, height + (textTilePaddingY*2));
		},
	});

	let size = props.tileSize > props.columnCount / 2 ? "regular" : "small";

	let h1Size = 64 * scale;
	let h1LineHeight = 64 * scale;
	let h1MarginBottom = 24 * scale;
	if (size === "small") {
		h1Size = 44 * scale;
		h1LineHeight = 48 * scale;
		h1MarginBottom = 24 * scale;
	}

	let h2Size = 32 * scale;
	let h2LineHeight = 40 * scale;
	let h2MarginBottom = 28 * scale;

	let h3Size = 22 * scale;
	let h3LineHeight = 28 * scale;
	let h3MarginBottom = 6 * scale;
	let h3MarginTop = 24 * scale;

	let pSize = 22 * scale;
	let pLineHeight = 30 * scale;
	let pMarginBottom = 12 * scale;
	// let pMarginTop = 12 * scale;

	return (
		<Wrap
			style={{
				paddingLeft: textTilePaddingX,
				paddingRight: textTilePaddingX,
				paddingTop: textTilePaddingY,
				paddingBottom: textTilePaddingY,
				display: props.centerVertical ? "flex" : "block",
				flexDirection: props.centerVertical ? "column" : "row",
				justifyContent: props.centerVertical ? "center" : "top",
			}}
			ref={ref}
		>
			{props.blocks &&
				props.blocks.map(block => (
					<>
						{block.type === textBlockType.H1 && (
							<H1
								key={"h1" + Math.random()}
								style={{
									fontSize: h1Size,
									lineHeight: h1LineHeight + "px",
									marginBottom: h1MarginBottom,
									fontWeight: 900,
									color: colors.white,
								}}
							>
								{block.content}
							</H1>
						)}

						{block.type === textBlockType.H2 && (
							<H2
								key={"h2" + Math.random()}
								h3MarginTop={h3MarginTop}
								style={{
									fontSize: h2Size,
									lineHeight: h2LineHeight + "px",
									marginBottom: h2MarginBottom,
									fontWeight: 800,
									color: colors.white,
								}}
							>
								{block.content}
							</H2>
						)}

						{block.type === textBlockType.H3 && (
							<H3
								key={"h3" + Math.random()}
								style={{
									fontSize: h3Size,
									lineHeight: h3LineHeight + "px",
									marginBottom: h3MarginBottom,
									fontWeight: 700,
									color: colors.white,
								}}
							>
								{block.content}
							</H3>
						)}

						{block.type === textBlockType.P && (
							<P
								key={"p" + Math.random()}
								h3MarginTop={h3MarginTop}
								style={{
									fontSize: pSize,
									lineHeight: pLineHeight + "px",
									marginBottom: pMarginBottom,
									fontWeight: 400,
									color: colors.text,
								}}
							>
								{block.content}
							</P>
						)}

						{block.type === textBlockType.LI && (
							<UL key={"ul" + Math.random()}>
								{block.content.map(li => (
									<li key={"li" + Math.random()}>{li}</li>
								))}
							</UL>
						)}
					</>
				))}
			{!props.blocks && !props.hideNull && (
				<Placeholder>
					<H1
						key={"h1" + Math.random()}
						style={{
							fontSize: h1Size,
							lineHeight: h1LineHeight + "px",
							marginBottom: h1MarginBottom,
							fontWeight: 900,
							color: colors.white25,
						}}
					>
						Title
					</H1>
				</Placeholder>
			)}
		</Wrap>
	);
};
