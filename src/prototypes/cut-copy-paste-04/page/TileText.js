import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

//import { useObserver } from "../../../hooks/use-resize-observer";
import useResizeObserver from "use-resize-observer";

import { textBlockType } from "../page/TileConstants";
import { colors } from "../ds/Colors";
import { transitions } from "../../../ds/Transitions";

const Wrap = styled(motion.div)`
	position: relative;
`;

const H1 = styled(motion.h1)`
	position: relative;
	;
	/* -webkit-hyphens: auto;
	-ms-hyphens: auto;
	hyphens: auto; */
`;

const H2 = styled(motion.h2)`
	position: relative;
	/* letter-spacing: -1%; */
	/* letter-spacing: -0.015em; */
	/* transform-origin: 0 0; */
`;

const H3 = styled(motion.h3)`
	position: relative;
	/* letter-spacing: -1%; */
	/* letter-spacing: -0.015em; */
	/* transform-origin: 0 0; */
`;

const H4 = styled(motion.h3)`
	position: relative;
	/* letter-spacing: -1%; */
	/* letter-spacing: -0.015em; */
	/* transform-origin: 0 0; */
`;

const P = styled(motion.p)`
	position: relative;

	/* letter-spacing: -0.0109em; */
	/* transform-origin: 0 0; */
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

	let textTilePaddingY = 11 * scale;
	let textTilePaddingX = 12 * scale;

	const { ref } = useResizeObserver({
		onResize: ({ width, height }) => {
			// props.onContentSizeChange(width, height + textTilePaddingY);
		},
	});

	let h1Size = 108 * scale;
	let h1LineHeight = h1Size * 1.05;
	let h1MarginBottom = 24 * scale;
	let h1MarginLeft = -6 * scale;
	let h1MarginTop = -8 * scale;

	/*
	let size = props.tileSize > props.columnCount / 2 ? "regular" : "small";
	if (size === "small") {
		h1Size = 68.19 * scale;
		h1LineHeight = h1Size * 1.05;
		h1MarginBottom = 24 * scale;
		h1MarginLeft = -4 * scale;
		h1MarginTop = -4 * scale;
	}
	*/

	let h2Size = 72 * scale;
	let h2LineHeight = h2Size * 1.1;
	let h2PaddingBottom = 12 * scale;
	let h2MarginLeft = -3 * scale;

	let h3Size = 32.08 * scale;
	let h3LineHeight = h3Size * 1.2;
	// let h3PaddingTop = 12 * scale;
	let h3PaddingBottom = 8 * scale;
	let h3MarginLeft = -2 * scale;
	let h3MarginTop = -4 * scale;

	let h4Size = 22 * scale;
	let h4LineHeight = h4Size * 1.2;
	let h4PaddingBottom = 8 * scale;

	let pSize = 22 * scale;
	let pLineHeight = pSize * 1.4;
	let pMarginBottom = 12 * scale;

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
						<div key={"block" + +i}>
							{block.type === textBlockType.H1 && (
								<H1
									key={"h1" + i}
									style={{
										fontFamily: fontFamily,
										fontWeight: 500,
										color: colors.white,
										letterSpacing: (h1Size * -0.02) + "px",
										textAlign: textAlign,
										marginLeft: h1MarginLeft,
										marginTop: h1MarginTop,
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
									key={"h2" + +i}
									style={{
										fontFamily: fontFamily,
										// fontSize: h2Size,
										// lineHeight: h2LineHeight + "px",
										// paddingBottom: h2PaddingBottom,
										fontWeight: 500,
										letterSpacing: (h2Size * -0.01) + "px",
										color: colors.white,
										textAlign: textAlign,
										marginLeft: h2MarginLeft,
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
									key={"h3" + +i}
									style={{
										fontFamily: fontFamily,
										fontWeight: 700,
										color: colors.white,
										textAlign: textAlign,
										marginLeft: h3MarginLeft,
										marginTop: h3MarginTop,
									}}
									animate={{
										fontSize: h3Size + "px",
										lineHeight: h3LineHeight + "px",
										paddingBottom: h3PaddingBottom + "px",
									}}
									initial={false}
								>
									{block.content}
								</H3>
							)}

							{block.type === textBlockType.H4 && (
								<H4
									key={"h4" + +i}
									style={{
										fontFamily: fontFamily,

										fontWeight: 700,
										color: colors.white,
										textAlign: textAlign,
									}}
									animate={{
										fontSize: h4Size + "px",
										lineHeight: h4LineHeight + "px",
										paddingBottom: h4PaddingBottom + "px",
									}}
									initial={false}
								>
									{block.content}
								</H4>
							)}

							{block.type === textBlockType.P && (
								<P
									key={"p" + +i}
									style={{
										fontFamily: fontFamily,
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
									key={"ul" + +i}
									style={{
										fontFamily: fontFamily,
										fontSize: pSize,
										lineHeight: pLineHeight + "px",
									}}
								>
									{block.content.map(li => (
										<li
											key={"li" + +i}
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
						<H3
							key={"h1"}
							style={{
								fontFamily: fontFamily,
								fontSize: h3Size,
								lineHeight: h3LineHeight + "px",
								fontWeight: 700,
								color: colors.white16,
							}}
						>
							Type something…
						</H3>
					</Placeholder>
				)}
			</Wrap>
		</motion.div>
	);
};
