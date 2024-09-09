import React from "react";
import styled from "styled-components";
import { motion, useDragControls } from "framer-motion";

const Wrap = styled(motion.div)`
	position: relative;
	height: 100%;
`;

const TextTileWrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	font-size: ${props => props.size}px;
`;

const TextTileBg = styled(TextTileWrap)`
	/* background-color: red; */
	background-color: #121212;
	opacity: 0;
`;

const TileH1 = styled(motion.div)`
	position: relative;
	font-weight: 700;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 1);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: 0 0;
`;

const TileP = styled(motion.div)`
	display:inline-block;
	position: relative;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: ${props => props.marginBottom}px;
	transform-origin: left center;
`;

const TileUL = styled(motion.div)`
	position: relative;
	transform-origin: left center;
	line-height: 1.4;
	font-size: ${props => props.size}px;
`;

const TileLI = styled(motion.div)`
	display:inline-block;
	font-size: ${props => props.size}px;
	line-height: 1.4;
	color: rgba(255, 255, 255, 0.5);
	list-style-type: disc;
	list-style-position: inside;
	position: relative;
	transform-origin: left center;
	padding-left: 1em;
	&:after {
		display: block;
		position: absolute;
		left: 0;
		top: calc(50% - ${props => (props.size*.333)/2}px);
		content: "";
		width: ${props => props.size*.333}px;
		height: ${props => props.size*.333}px;
		border-radius: ${props => props.size*.333}px;
		background-color: rgba(255, 255, 255, 0.5);
	}
`;

const blockVariants = {
	default: {
		opacity: 1,
	},
	focussed: {
		opacity: 1,
		scale: 1.1,
	},
	blurred: {
		opacity: 0.25,
		filter: "blur(5px)",
	},
};

const blockTransition = {
	duration: 0.45,
	ease: [0.4, 0, 0.1, 1],
};

export const TextTile = props => {
	const h1Size = Math.round(props.scale * 21);
	const h1MarginBottom = Math.round(props.scale * 12);
	const pMarginBottom = Math.round(props.scale * 12);
	const pSize = Math.round(props.scale * 16);

	
	const eB = props.textTileBlockClickEmphasized;
	const dragControls = useDragControls()


	return (
		<Wrap
			transition={{
				duration: 0.25,
				ease: [0.4, 0, 0.1, 1],
			}}
			animate={{
				opacity: props.imageTileClickEmphasized ? 0.25 : 1,
			}}
			size={pSize}
			layout
		>
			<TextTileWrap
			layout
				style={{
					opacity: props.isPresentTransitionedFinished ? 0 : 1,
				}}
			>
				<TileH1 size={h1Size} marginBottom={h1MarginBottom} layout>
					{/* Window width is {props.windowWidth} */}
					This is a heading
				</TileH1>

				<TileP size={pSize} marginBottom={pMarginBottom} layout>
					{/* Page width is {props.pageWidth}
					<br />
					Page padding is {props.pagePadding}
					<br />
					Page corner radius is {props.pageRadius} */}
					This is a paragraph.
				</TileP>

				<TileP size={pSize} marginBottom={pMarginBottom} layout>
					{/* Tile size is {props.tileSize}x{props.tileSize}
					<br />
					Tile corner radius is {props.tileRadius}
					<br />
					Tile padding is {props.tilePadding} */}
					This is also a pragraph. But this paragraph is a little longer than the first.
				</TileP>

				<TileP size={pSize} marginBottom={pMarginBottom} layout>
					{/* Text tile heading size is {h1Size}
					<br />
					Text tile body size is {pSize} */}
					This is a list heading:
				</TileP>

				<TileUL layout>
					<TileLI size={pSize} layout>List Item A</TileLI><br />
					<TileLI size={pSize} layout>List Item B</TileLI><br />
					<TileLI size={pSize} layout>List Item C</TileLI><br />
					<TileLI size={pSize} layout>List Item D</TileLI>
				</TileUL>
			</TextTileWrap>

			<TextTileWrap
				drag
				dragControls={dragControls}
				dragElastic={0.2}
				dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
				onDragEnd={(event, info) => props.setTextTileClickEmphasized(false)}
				style={{
					opacity: props.isPresentTransitionedFinished ? 1 : 0,
					pointerEvents: props.isPresentTransitionedFinished ? "auto" : "none",
				}}
			>
				<TextTileBg
					className="select"
					onPointerDown={e => {
						props.setTextTileClickEmphasized(true);
						props.setTextTileBlockClickEmphasized(false);
					}}
					onPointerUp={e => {
						props.setTextTileClickEmphasized(false);
					}}
				/>

				<TileH1
					className="select"
					id="h1"
					size={h1Size}
					marginBottom={h1MarginBottom}
					variants={blockVariants}
					onTap={() => {
						props.setTextTileBlockClickEmphasized(eB === "h1" ? false : "h1");
					}}
					animate={
						props.textTileBlockClickEmphasized === "h1"
							? "focussed"
							: props.textTileBlockClickEmphasized === false
							? "default"
							: "blurred"
					}
					transition={blockTransition}
				>
					{/* Window width is {props.windowWidth} */}
					This is a heading
				</TileH1>

				<TileP
					className="select"
					size={pSize}
					marginBottom={pMarginBottom}
					id="p1"
					variants={blockVariants}
					onTap={() => {
						props.setTextTileBlockClickEmphasized(eB === "p1" ? false : "p1");
					}}
					animate={
						props.textTileBlockClickEmphasized === "p1"
							? "focussed"
							: props.textTileBlockClickEmphasized === false
							? "default"
							: "blurred"
					}
					transition={blockTransition}
				>
					{/* Page width is {props.pageWidth}
					<br />
					Page padding is {props.pagePadding}
					<br />
					Page corner radius is {props.pageRadius} */}
					This is a paragraph.
				</TileP>

				<TileP
					className="select"
					size={pSize}
					marginBottom={pMarginBottom}
					id="p2"
					variants={blockVariants}
					onTap={() => {
						props.setTextTileBlockClickEmphasized(eB === "p2" ? false : "p2");
					}}
					animate={
						props.textTileBlockClickEmphasized === "p2"
							? "focussed"
							: props.textTileBlockClickEmphasized === false
							? "default"
							: "blurred"
					}
					transition={blockTransition}
				>
					{/* Tile size is {props.tileSize}x{props.tileSize}
					<br />
					Tile corner radius is {props.tileRadius}
					<br />
					Tile padding is {props.tilePadding} */}
					This is also a pragraph. But this paragraph is a little longer than the first.
				</TileP>

				<TileP
					size={pSize}
					marginBottom={pMarginBottom}
					className="select"
					id="p3"
					variants={blockVariants}
					onTap={() => {
						props.setTextTileBlockClickEmphasized(eB === "p3" ? false : "p3");
					}}
					animate={
						props.textTileBlockClickEmphasized === "p3"
							? "focussed"
							: props.textTileBlockClickEmphasized === false
							? "default"
							: "blurred"
					}
					transition={blockTransition}
				>
					{/* Text tile heading size is {h1Size}
					<br />
					Text tile body size is {pSize} */}
					This is a list heading:
				</TileP>

				<TileUL>
					<TileLI
						size={pSize}
						className="select"
						id="li1"
						variants={blockVariants}
						onTap={() => {
							props.setTextTileBlockClickEmphasized(eB === "li1" ? false : "li1");
						}}
						animate={
							props.textTileBlockClickEmphasized === "li1"
								? "focussed"
								: props.textTileBlockClickEmphasized === false
								? "default"
								: "blurred"
						}
						transition={blockTransition}
					>
						List Item A
					</TileLI><br />
					<TileLI
						size={pSize}
						className="select"
						id="li2"
						variants={blockVariants}
						onTap={() => {
							props.setTextTileBlockClickEmphasized(eB === "li2" ? false : "li2");
						}}
						animate={
							props.textTileBlockClickEmphasized === "li2"
								? "focussed"
								: props.textTileBlockClickEmphasized === false
								? "default"
								: "blurred"
						}
						transition={blockTransition}
					>
						List Item B
					</TileLI><br />
					<TileLI
						size={pSize}
						className="select"
						id="li3"
						variants={blockVariants}
						onTap={() => {
							props.setTextTileBlockClickEmphasized(eB === "li3" ? false : "li3");
						}}
						animate={
							props.textTileBlockClickEmphasized === "li3"
								? "focussed"
								: props.textTileBlockClickEmphasized === false
								? "default"
								: "blurred"
						}
						transition={blockTransition}
					>
						List Item C
					</TileLI><br />
					<TileLI
						size={pSize}
						className="select"
						id="li4"
						variants={blockVariants}
						onTap={() => {
							props.setTextTileBlockClickEmphasized(eB === "li4" ? false : "li4");
						}}
						animate={
							props.textTileBlockClickEmphasized === "li4"
								? "focussed"
								: props.textTileBlockClickEmphasized === false
								? "default"
								: "blurred"
						}
						transition={blockTransition}
					>
						List Item D
					</TileLI>
				</TileUL>
			</TextTileWrap>
		</Wrap>
	);
};
