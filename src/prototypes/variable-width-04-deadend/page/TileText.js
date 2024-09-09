import React, { useState, useLayoutEffect, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { MetricsContext, metricConstants } from "../tome/MetricsContext";

//import useResizeObserver from "use-resize-observer";
//import { useDebouncedResizeObserver } from "../../../hooks/use-debounced-resize-observer";

import { textBlockType, alignmentX } from "./TileConstants";

const TextTileContent = styled(motion.div)`
	position: relative;

	* ::selection {
		background: ${props => props.$selectioncolor};
	}

	* {
		/* word-break: break-all; */
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: all;
		overflow-wrap: break-word;
		-webkit-nbsp-mode: space;
		line-break: after-white-space;
		font-optical-sizing: auto;
		max-width: 100%;
		::selection {
			background: ${props => props.$selectioncolor};
		}
	}

	p + .H0,
	p + h1,
	p + h2 {
		margin-top: 0.4em;
	}

	p + h3,
	p + h4,
	ul + h3,
	ul + h4,
	ol + h3,
	ol + h4 {
		margin-top: 0.6em;
	}

	.CAPTION + h3 {
		margin-top: -0.2em;
	}

	code {
		letter-spacing: none;
	}
`;

const PlaceholderContainer = styled(motion.div)`
	user-select: none;
	pointer-events: none;
	position: absolute;
`;

const GhostText = styled.div`
	user-select: none;
	pointer-events: none;

	background-color: red;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0.0;
`;

const H0 = styled(motion.div)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
`;
const H1 = styled(motion.h1)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
`;
const H2 = styled(motion.h2)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
`;
const H3 = styled(motion.h3)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	overflow-wrap: break-word;
	user-select: ${props => (props.$selected ? "auto" : "none")};
`;
const H4 = styled(motion.h4)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	user-select: ${props => (props.$selected ? "auto" : "none")};
`;
const P = styled(motion.p)`
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	user-select: ${props => (props.$selected ? "auto" : "none")};
`;
const UL = styled(motion.ul)`
	width: 100%;
	/* display: inline-flex; */
	/* flex-direction: column; */
	list-style-position: outside;
	margin: 0;
	padding: 0;
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	color: ${props => props.$fontcolor};
	list-style: none;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	li {
		margin-bottom: ${props => props.$marginbottom};
		&::before {
			left: ${props => (props.$alignmentx === alignmentX.LEFT ? "-0.666em" : "unset")};
			text-align: center;
			content: "•";
		}
		> ul,
		> ol {
			margin-top: ${props => props.$marginbottom};
		}
	}
`;

/*
Look at using counter-set to get custom start numbers
https://css-tricks.com/almanac/properties/c/counter-set/
*/
const OL = styled(motion.ol)`
	width: 100%;
	list-style-position: outside;
	margin: 0;
	padding: 0;
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	color: ${props => props.$fontcolor};
	list-style: none;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	li {
		/* counter-set:  */
		counter-increment: number-counter-l1;
		margin-bottom: ${props => props.$marginbottom};

		&::before {
			content: counter(number-counter-l1, decimal) ".";
			font-variant-numeric: tabular-nums;
			text-align: ${props => (props.$alignmentx === alignmentX.LEFT ? "right" : "left")};
		}
		li {
			counter-increment: number-counter-l2;
			&::before {
				content: counter(number-counter-l2, lower-alpha) ".";
			}
			li {
				counter-increment: number-counter-l3;
				&::before {
					content: counter(number-counter-l3, lower-roman) ".";
				}
			}
		}
		> ul,
		> ol {
			margin-top: ${props => props.$marginbottom};
		}
	}
`;

const LI = styled(motion.li)`
	position: relative;
	font-weight: inherit;
	padding-left: ${props => (props.$alignmentx === alignmentX.LEFT ? 1.3 : 0)}em;
	li {
		padding-right: ${props => (props.$alignmentx === alignmentX.RIGHT ? 1.3 : 0)}em;
	}
	&::before {
		width: ${props => (props.$alignmentx === alignmentX.LEFT ? "2em" : "1.5em")};
		display: ${props => (props.$alignmentx === alignmentX.LEFT ? "block" : "inline-block")};
		position: ${props => (props.$alignmentx === alignmentX.LEFT ? "absolute" : "unset")};
		top: ${props => (props.$alignmentx === alignmentX.LEFT ? 0 : "unset")};
		left: ${props => (props.$alignmentx === alignmentX.LEFT ? "-0.8em" : "unset")};
	}
`;

const BLOCKQUOTE = styled(motion.blockquote)`
	width: auto;
	display: block;
	position: relative;
	user-select: ${props => (props.$selected ? "auto" : "none")};
	/* padding-left: ${props => (props.$alignmentx === alignmentX.RIGHT ? 0 : 0.666)}em;
	padding-right: ${props =>
		props.$alignmentx === alignmentX.CENTER || props.$alignmentx === alignmentX.RIGHT ? 0.666 : 0}em; */
	/* font-style: italic; */
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
	&::before {
		content: "“";
		position: ${props => (props.$alignmentx === alignmentX.LEFT ? "absolute" : "unset")};
		/* background: ${props => props.$theme.colors.text.blockquotebar}; */
		/* left: ${props => (props.$alignmentx !== alignmentX.RIGHT ? 0 : "unset")}; */
		/* right: ${props => (props.$alignmentx === alignmentX.RIGHT ? 0 : "unset")}; */
		top: 0;
		margin-left: ${props => (props.$alignmentx === alignmentX.LEFT ? "-0.7ch" : "unset")};
		//width: 0.05em;
		//min-width: 2px;
		/* width: 6px; */
		/* border-radius: 1px; */
		/* opacity: 0.4; */
	}
	&::after {
		content: "”";
		position: ${props => (props.$alignmentx === alignmentX.RIGHT ? "absolute" : "unset")};
		margin-left: 0.1ch;
		/* opacity: 0.4; */
	}
`;

const CAPTION = styled(motion.div)`
	user-select: ${props => (props.$selected ? "auto" : "none")};
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
`;

const SPAN = styled(motion.span)`
	color: ${props => props.$fontcolor};
`;
const LINEBREAK = styled(SPAN)`
	display: table;
`;
const ITALIC = styled(SPAN)`
	font-style: italic;
`;
const BOLD = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
`;
const BOLD_ITALIC = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
	font-style: italic;
`;
const UNDERLINED = styled(SPAN)`
	text-decoration: underline;
`;
const BOLD_ITALIC_UNDERLINED = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
	font-style: italic;
	text-decoration: underline;
`;
const STRIKETHROUGH = styled(SPAN)`
	text-decoration: line-through;
`;
const LINK = styled(motion.a)`
	color: ${props => props.$fontcolor};
	text-decoration: underline;
	&:visited {
		color: ${props => props.$fontcolor};
	}
`;
const CODE = styled(motion.code)`
	color: ${props => props.$fontcolor};
	font-family: ${props => props.$theme.typography.fontFamilyMono};
	/* line-height: 1; */
	/* font-size: 95%; */
	display: inline-block;
	font-weight: ${props => props.$fontweight};
	background: ${props => props.$theme.colors.text.codeBackground};
	border-radius: 0.18em;
	padding-left: 0.18em;
	padding-right: 0.18em;
	box-decoration-break: clone;
`;
const MENTION = styled(SPAN)`
	font-weight: ${props => props.$fontweight};
	border-radius: 0.18em;
	padding-left: 0.18em;
	padding-right: 0.18em;
	background: ${props => props.$theme.colors.text.mentionBackground};
	box-decoration-break: clone;
`;
const PRE = styled(motion.pre)`
	width: 100%;
	border-radius: 0.18em;
	padding: 0.75em;
	font-family: ${props => props.$theme.typography.fontFamilyMono};
	background: ${props => props.$theme.colors.text.codeBackground};
	font-size: ${props => props.$fontsize}px;
	font-weight: ${props => props.$fontweight};
	line-height: ${props => props.$lineheight};
	letter-spacing: ${props => props.$letterspacing};
	margin-bottom: ${props => props.$marginbottom};
	color: ${props => props.$fontcolor};
`;

const BlockMap = {
	H0: H0,
	H1: H1,
	H2: H2,
	H3: H3,
	H4: H4,
	P: P,
	CAPTION: CAPTION,
	OL: OL,
	UL: UL,
	LI: LI,
	SPAN: SPAN,
	LINEBREAK: LINEBREAK,
	MENTION: MENTION,
	ITALIC: ITALIC,
	BOLD: BOLD,
	BOLD_ITALIC: BOLD_ITALIC,
	UNDERLINED: UNDERLINED,
	BOLD_ITALIC_UNDERLINED: BOLD_ITALIC_UNDERLINED,
	STRIKETHROUGH: STRIKETHROUGH,
	LINK: LINK,
	CODE: CODE,
	BLOCKQUOTE: BLOCKQUOTE,
	PRE: PRE,
};

const PlaceholderMap = {
	H0: "Title",
	H1: "Title",
	H2: "Type something…",
	H3: "Type something…",
	H4: "Type something…",
	P: "Type something…",
	CAPTION: "Type something…",
	UL: "List something…",
	LI: "List something…",
};

const AlignXMap = {
	LEFT: "flex-start",
	CENTER: "center",
	RIGHT: "flex-end",
};

const AlignTextMap = {
	LEFT: "left",
	CENTER: "center",
	RIGHT: "right",
};

const AlignYMap = {
	TOP: "flex-start",
	MIDDLE: "center",
	BOTTOM: "flex-end",
	DISTRIBUTE: "space-between",
};

export const TileText = props => {
	const scale = props.scale;
	const { getTileWidthForUnit, metrics } = useContext(MetricsContext);
	const { rowHeight, rowMargin } = metrics;
	// const ref = useRef(null);

	let textTilePaddingY = 10 * scale;
	let textTilePaddingX = 17 * scale;

	const display = "flex"; //"block";
	const height = "100%"; //"auto";
	const flexDirection = "column";

	const textAlign = AlignTextMap[props.alignmentX];
	const alignItems = AlignXMap[props.alignmentX];
	const justifyContent = AlignYMap[props.alignmentY];

	/*
	const { ref } = useResizeObserver({
		onResize: ({ width, height }) => {
			//console.log("on-resize", height)
			props.onContentSizeChange(width, height + textTilePaddingY);
		},
	});
	*/

	const placeholderRef = useRef(null);
	const [placeholderWidth, setPlaceholderWidth] = useState("inherit");
	const [placeholderHeight, setPlaceholderHeight] = useState("inherit");
	const placeholderOpacity = useMotionValue(1);
	const [placeholderAlignment, setPlaceholderAlignment] = useState(
		props.alignmentX === alignmentX.CENTER ? "left" : "inherit"
	);
	const firstBlockRef = useRef(null);
	const isPlaceholder = props.blocks.length === 1 && props.blocks[0].content === "";

	useLayoutEffect(() => {
		if (placeholderRef.current) {
			const rect = placeholderRef.current.getBoundingClientRect();
			setPlaceholderWidth(rect.width);
			setPlaceholderHeight(rect.height);
		}
	});

	// Measure & cache ghost text height at all 12 width stops
	const ref = useRef(null);
	useEffect(() => {
		if (props.isPreview) return;
		calcRowHeights();
		//if (computedHeights.current.length !== 0) return
	});

	useEffect(() => {
		if (props.isPreview) return;
		calcRowHeights();
		//if (computedHeights.current.length !== 0) return
	}, [props.scale]);

	const calcRowHeights = () => {
		if (ref.current && props.tile && !props.tile.contentUnitHeights) {
			props.tile.contentUnitHeights = [];
			for (let i = metricConstants.cColumnMinWidth; i <= metricConstants.cColumnCount; i++) {
				ref.current.style.width = getTileWidthForUnit(i) + "px";
				const rect = ref.current.getBoundingClientRect();
				const newUnitHeight = Math.ceil(Math.ceil(rect.height) /  Math.floor((rowHeight + rowMargin)));
				props.tile.contentUnitHeights[i] = newUnitHeight;
				//console.log("text tile heights: ", props.tile.id, rect.height, rowHeight, rowMargin);
			}
		}
	};

	const onPlaceholderInput = e => {
		const t = e.target.innerText.trim();
		setPlaceholderAlignment("inherit");
		if (props.alignmentX === alignmentX.CENTER) {
			setPlaceholderAlignment(t.length === 0 ? "left" : "inherit");
		}
		// props.blocks[0].content = t;
		// console.log("input!", t.length, t);
		placeholderOpacity.set(t.length === 0 ? 1 : 0);
	};

	const addBlock = (block, i) => {
		const Block = BlockMap[block.type];
		const styles =
			block.type === textBlockType.OL ||
			block.type === textBlockType.UL ||
			block.type === textBlockType.PRE ||
			block.type === textBlockType.BLOCKQUOTE
				? block.blockStyle
				: block.type;
		const typography = props.theme.typography;
		const fontsize = typography.fontSize[styles] ? typography.fontSize[styles] * props.scale : undefined;
		const className = block.blockStyle ? block.type + " " + block.blockStyle : block.type;
		const fontcolor = block.color ? block.color : typography.fontColor[styles];
		const startNumber = block.type === textBlockType.OL && block.start ? block.start : undefined;
		return (
			<Block
				key={block.id}
				ref={i === 0 ? firstBlockRef : null}
				className={className}
				$theme={props.theme}
				$scale={scale}
				$alignmentx={props.alignmentX}
				$fontsize={fontsize}
				$fontweight={typography.fontWeight[styles]}
				$lineheight={typography.lineHeight[styles]}
				$letterspacing={typography.letterSpacing[styles]}
				$fontcolor={fontcolor}
				$selected={props.isSelected}
				$marginbottom={typography.marginBottom[styles]}
				href={block.href}
				start={startNumber}
				$selectioncolor={props.theme.colors.text.selection}
				contentEditable={props.isSelected}
				suppressContentEditableWarning={true}
				onInput={isPlaceholder ? onPlaceholderInput : null}
				style={
					isPlaceholder
						? {
								minWidth: placeholderWidth,
								minHeight: placeholderHeight,
								textAlign: placeholderAlignment,
						  }
						: undefined
				}
			>
				{block.content && block.content}
				{block.blocks && block.blocks.map(b => addBlock(b))}
			</Block>
		);
	};

	/*
	Visual-only
	*/
	const addPlaceholder = block => {
		const Block = BlockMap[block.type];
		const text = PlaceholderMap[block.type];
		const styles =
			block.type === textBlockType.OL || block.type === textBlockType.UL || block.type === textBlockType.BLOCKQUOTE
				? block.blockStyle
				: block.type;
		const typography = props.theme.typography;
		const fontsize = typography.fontSize[styles] ? typography.fontSize[styles] * props.scale : undefined;
		let className = block.blockStyle ? block.type + " " + block.blockStyle : block.type;
		className += " placeholder";
		return (
			<PlaceholderContainer
				style={{
					display,
					height,
					flexDirection,
					alignItems,
					justifyContent,
					textAlign,
					opacity: placeholderOpacity,
				}}
			>
				<Block
					ref={placeholderRef}
					key={block.id + "placeholder"}
					className={className}
					$theme={props.theme}
					$scale={scale}
					$alignmentx={props.alignmentX}
					$fontsize={fontsize}
					$fontweight={typography.fontWeight[styles]}
					$lineheight={typography.lineHeight[styles]}
					$letterspacing={typography.letterSpacing[styles]}
					$fontcolor={props.theme.typography.fontColor.PLACEHOLDER}
					$marginbottom={typography.marginBottom[styles]}
				>
					{text}
				</Block>
			</PlaceholderContainer>
		);
	};

	//console.log(props.tileWidth);

	return (
		<TextTileContent
			key={props.id + "_texttile_content"}
			style={{
				width: props.tileWidth,
				display,
				height,
				flexDirection,
				alignItems,
				justifyContent,
				textAlign,

				fontFamily: props.theme.typography.fontFamily,
				fontSize: props.theme.typography.fontSize.P * scale + "px",
				fontWeight: props.theme.typography.fontWeight.P,
				lineHeight: 1,
				color: props.theme.colors.text.body,
				paddingLeft: textTilePaddingX,
				paddingRight: textTilePaddingX,
				paddingTop: textTilePaddingY,
				caretColor: props.theme.colors.text.caret,

				backgroundColor: props.backgroundColor ? props.backgroundColor : "transparent",
				//backgroundColor: "rgba(0,0,255, 0.3)",
				userSelect: props.isSelected ? "text" : "none",
				cursor: props.isSelected ? "text" : "default",
			}}
			$selectioncolor={props.theme.colors.text.selection}
		>
			{isPlaceholder && addPlaceholder(props.blocks[0])}
			{props.blocks && props.blocks.map((b, i) => addBlock(b, i))}
			<GhostText
				style={{
					minWidth: 2000,
				}}
			>
				<div
					ref={ref}
					style={{
						//width: props.tileWidth,
						paddingLeft: textTilePaddingX,
						paddingRight: textTilePaddingX,
						paddingTop: textTilePaddingY,
						//paddingBottom: textTilePaddingY,
					}}
				>
					{props.blocks && props.blocks.map((b, i) => addBlock(b, i))}
				</div>
			</GhostText>
		</TextTileContent>
	);
};
