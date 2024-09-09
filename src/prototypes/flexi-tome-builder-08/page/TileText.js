import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//import { useObserver } from "../../../hooks/use-resize-observer";
import useResizeObserver from "use-resize-observer";

import { textBlockType } from "../page/TileConstants";
import { colors } from "../ds/Colors";
import { transitions } from "../../../ds/Transitions"

const Wrap = styled(motion.div)`
	position: relative;
`;

const H1 = styled(motion.h1)`
	position: relative;
	/* letter-spacing: -0.015em; */
	/* -webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto; */
`;

const H2 = styled(motion.h2)`
	position: relative;
	/* letter-spacing: -0.015em; */
	transform-origin: 0 0;
`;

const H3 = styled(motion.h3)`
	position: relative;
	/* letter-spacing: -0.015em; */
	transform-origin: 0 0;
`;

const P = styled(motion.p)`
	position: relative;
	/* letter-spacing: -0.0109em; */
	transform-origin: 0 0;
`;

const UL = styled(motion.ul)`
	position: relative;
	color: rgba(255, 255, 255, 0.65);
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

	let textTilePaddingY = 24 * scale;
	let textTilePaddingX = 24 * scale;

	const { ref } = useResizeObserver({
		onResize: ({ width, height }) => {
			// props.onContentSizeChange(width, height + textTilePaddingY);
		},
	});

	let h1Size = 75 * scale;
	let h1LineHeight = 75 * scale;
	let h1MarginBottom = 24 * scale;

	/*
	let size = props.tileSize > props.columnCount / 2 ? "regular" : "small";
	if (size === "small") {
		h1Size = 44 * scale;
		h1LineHeight = 48 * scale;
		h1MarginBottom = 24 * scale;
	}
	*/
	
	let h2Size = 33 * scale;
	let h2LineHeight = 38 * scale;
	let h2PaddingBottom = 12 * scale;

	let h3Size = 24 * scale;
	let h3LineHeight = 28 * scale;
	let h3PaddingTop = 12 * scale;
	let h3PaddingBottom = 8 * scale;

	let pSize = 23 * scale;
	let pLineHeight = 30 * scale;
	let pMarginBottom = 12 * scale;
	// let pMarginTop = 12 * scale;

	let textAlign = props.textAlign ? props.textAlign : "left";

	const fontFamily = "ABCDiatype";

	return (
		<motion.div
			style={{
				fontFamily: fontFamily,
				display: props.centerVertical ? "flex" : "block",
				flexDirection: props.centerVertical ? "column" : "row",
				justifyContent: props.centerVertical ? "center" : "top",
				height: props.centerVertical ? "100%" : "auto",
			}}
		>
			<Wrap
				style={{
					paddingLeft: textTilePaddingX,
					paddingRight: textTilePaddingX,
					paddingTop: textTilePaddingY,
					paddingBottom: textTilePaddingY,
				}}
				ref={ref}
				// dangerouslySetInnerHTML={{__html: props.htmlBlob }}
			>

				{props.blocks &&
					props.blocks.map((block, i) => (
						<div key={"block" + + i}>
							{block.type === textBlockType.H1 && (
								<H1
									key={"h1" + i}
									style={{
										fontFamily: fontFamily,
										//fontSize: h1Size,
										//lineHeight: h1LineHeight + "px",
										// marginBottom: h1MarginBottom,
										fontWeight: 700,
										color: colors.white,
										textAlign: textAlign,
									}}
									animate={{
										fontSize: h1Size + "px",
										lineHeight: h1LineHeight + "px",
										marginBottom: h1MarginBottom + "px",
									}}
									initial={false}
									transition={transitions.layoutTransition}
								>
									{block.content}
								</H1>
							)}

							{block.type === textBlockType.H2 && (
								<H2
									key={"h2" + + i}
									style={{
										fontFamily: fontFamily,
										// fontSize: h2Size,
										// lineHeight: h2LineHeight + "px",
										// paddingBottom: h2PaddingBottom,
										fontWeight: 700,
										color: colors.white,
										textAlign: textAlign,
									}}
									animate={{
										fontSize: h2Size + "px",
										lineHeight: h2LineHeight + "px",
										paddingBottom: h2PaddingBottom + "px",
									}}
									initial={false}
								>
									{block.content}
								</H2>
							)}

							{block.type === textBlockType.H3 && (
								<H3
									key={"h3" + + i}
									style={{
										fontFamily: fontFamily,
										//fontSize: h3Size,
										//lineHeight: h3LineHeight + "px",
										//paddingTop: h3PaddingTop,
										//paddingBottom: h3PaddingBottom,
										fontWeight: 700,
										color: colors.white,
										textAlign: textAlign,
									}}
									animate={{
										fontSize: h3Size + "px",
										lineHeight: h3LineHeight + "px",
										paddingTop: h3PaddingTop + "px",
										paddingBottom: h3PaddingBottom + "px",
									}}
									initial={false}
								>
									{block.content}
								</H3>
							)}

							{block.type === textBlockType.P && (
								<P
									key={"p" + + i}
									style={{
										fontFamily: fontFamily,
										//fontSize: pSize,
										//lineHeight: pLineHeight + "px",
										//marginBottom: pMarginBottom,
										fontWeight: 300,
										color: colors.text,
										textAlign: textAlign,
									}}
									animate={{
										fontSize: pSize + "px",
										lineHeight: pLineHeight + "px",
										marginBottom: pMarginBottom + "px",
									}}
									initial={false}
								>
									{block.content}
								</P>
							)}

							{block.type === textBlockType.LI && (
								<UL
									key={"ul" + + i}
									style={{
										fontFamily: fontFamily,
										fontSize: pSize,
										lineHeight: pLineHeight + "px",
									}}
								>
									{block.content.map(li => (
										<li
											key={"li" + + i}
											style={{
												fontFamily: fontFamily,
												fontSize: pSize,
												lineHeight: pLineHeight + "px",
											}}
										>
											{li}
										</li>
									))}
								</UL>
							)}
						</div>
					))}
				{!props.blocks && !props.hideNull && (
					<Placeholder>
						<H1
							key={"h1"}
							style={{
								fontFamily: fontFamily,
								fontSize: h1Size,
								lineHeight: h1LineHeight + "px",
								marginBottom: h1MarginBottom,
								fontWeight: 700,
								color: colors.white25,
							}}
						>
							Title
						</H1>
					</Placeholder>
				)}
			</Wrap>
		</motion.div>
	);
};
