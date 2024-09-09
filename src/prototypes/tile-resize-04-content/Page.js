import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, transform } from "framer-motion";

import { subscribe, publish } from "../../utils/pubsub";

import { Tile } from "./Tile";
import { TileResizeHandle } from "./TileResizeHandle";

import { PAGE_MARGIN, PAGE_WIDTH, PAGE_HEIGHT, TILE_SIZE_FULL, TILE_SIZE_HALF, MAX_OFFSET } from "./index";

export const Page = props => {
	const [pageState, setPageState] = useState("2TILES");

	const tileMouseDownX = useMotionValue(0);

	const tile1Ref = useRef(null);
	const Tile1Z = useMotionValue(0);
	const Tile1Selected = useMotionValue(0);
	const [tile1Position, setTile1Position] = useState("left");
	const [tile1Size, setTile1Size] = useState("half");

	const tile2Ref = useRef(null);
	const Tile2Z = useMotionValue(0);
	const Tile2Selected = useMotionValue(0);
	const [tile2Position, setTile2Position] = useState("right");
	const [tile2Size, setTile2Size] = useState("half");

	const [tileMoving, setTileMoving] = useState(false);

	const onTilePositionUpdate = (tile, otherTilePosition) => {
		// console.log(tile, otherTilePosition);
		if (tile === "Tile1") {
			setTile2Position(otherTilePosition);
		}
		if (tile === "Tile2") {
			setTile1Position(otherTilePosition);
		}
	};

	const onTile1MouseDown = (event, info) => {
		tileMouseDownX.set(event.clientX);
		Tile1Z.set(1);
		Tile2Z.set(0);
	};

	const onTile1MouseUp = (event, info) => {
		if (tileMouseDownX.get() === event.clientX) {
			Tile1Selected.set(1);
			Tile2Selected.set(0);
		}
	};

	const onTile2MouseDown = (event, info) => {
		tileMouseDownX.set(event.clientX);
		Tile1Z.set(0);
		Tile2Z.set(1);
	};

	const onTile2MouseUp = (event, info) => {
		if (tileMouseDownX.get() === event.clientX) {
			Tile1Selected.set(0);
			Tile2Selected.set(1);
		}
	};

	// Tile Deselect
	const deselectTiles = () => {
		Tile1Selected.set(0);
		Tile2Selected.set(0);
	};

	React.useEffect(() => {
		document.documentElement.addEventListener("mousedown", e => {
			if (
				tile1Ref.current &&
				!tile1Ref.current.contains(e.target) &&
				tile2Ref.current &&
				!tile2Ref.current.contains(e.target)
			) {
				deselectTiles();
			}
		});

		subscribe("undo_delete_resize_tile", data => {
			setResizeHandleID("center");
			setTile1Size("half");
			setTile2Size("half");
			setPageState("2TILES");
		});
	});

	//
	//
	// Resize Handle
	//
	//

	const [isResizeHovering, setIsResizeHovering] = useState(false);
	const [isResizeDragging, setIsResizeDragging] = useState(false);
	const [resizeDragOffset, resizeDragOffsetSet] = useState(0);
	const [resizeHandleID, setResizeHandleID] = useState("center");

	const onHandleHoverStart = (event, info) => {
		document.body.style.cursor = "ew-resize";
		setIsResizeHovering(true);
	};

	const onHandleHoverEnd = (event, info) => {
		if (!isResizeDragging) {
			document.body.style.cursor = "default";
			setIsResizeHovering(false);
		}
	};

	const onResizeHandleDragStart = () => {
		setIsResizeDragging(true);
	};

	const onHandleDrag = (event, info) => {
		const offset = transform(info.offset.x, [-MAX_OFFSET, MAX_OFFSET], [-TILE_SIZE_HALF, TILE_SIZE_HALF]);
		resizeDragOffsetSet(offset);
	};

	const onHandleDragEnd = (event, info) => {
		setIsResizeDragging(false);
		document.body.style.cursor = "default";
		const offset = transform(info.offset.x, [-MAX_OFFSET, MAX_OFFSET], [-TILE_SIZE_HALF, TILE_SIZE_HALF]);
		// console.log("onHandleDragEnd", offset, velocity);
		const tileStateCHanged = Math.abs(offset) > MAX_OFFSET;

		if (tileStateCHanged) {
			setIsResizeHovering(false);
			switch (pageState) {
				case "2TILES":
					publish("tile_deleted_on_resize");
					if (offset < -MAX_OFFSET) {
						setResizeHandleID("left");
						switch (tile1Position) {
							case "left":
								setTile1Size("hidden");
								break;
							case "right":
								setTile1Size("full");
								break;
							default:
								break;
						}
						switch (tile2Position) {
							case "left":
								setTile2Size("hidden");
								break;
							case "right":
								setTile2Size("full");
								break;
							default:
								break;
						}
					} else if (offset > MAX_OFFSET) {
						setResizeHandleID("right");
						switch (tile1Position) {
							case "left":
								setTile1Size("full");
								break;
							case "right":
								setTile1Size("hidden");
								break;
							default:
								break;
						}
						switch (tile2Position) {
							case "left":
								setTile2Size("full");
								break;
							case "right":
								setTile2Size("hidden");
								break;
							default:
								break;
						}
					}
					setPageState("1TILE");
					break;
				case "1TILE":
					publish("undo_tile_deleted_on_resize");
					setResizeHandleID("center");
					setTile1Size("half");
					setTile2Size("half");
					setPageState("2TILES");
					break;
				default:
					break;
			}
		}
		// Animate to new state
		resizeDragOffsetSet(0);
	};

	return (
		<Container width={PAGE_WIDTH} height={PAGE_HEIGHT}>
			<Margin margin={PAGE_MARGIN}>
				<TileResizeHandle
					resizeOffset={resizeDragOffset}
					left={TILE_SIZE_HALF}
					resizeHandleID={resizeHandleID}
					isResizeHovering={isResizeHovering}
				/>

				<Tile
					ref={tile1Ref}
					key="Tile1"
					id="Tile1"
					z={Tile1Z}
					selected={Tile1Selected}
					pageState={pageState}
					position={tile1Position}
					setPosition={setTile1Position}
					size={tile1Size}
					setSize={setTile1Size}
					resizeHandleID={resizeHandleID}
					onTilePositionUpdate={onTilePositionUpdate}
					onMouseDown={onTile1MouseDown}
					onMouseUp={onTile1MouseUp}
					resizeOffset={resizeDragOffset}
					setResizeOffset={resizeDragOffsetSet}
					isResizeDragging={isResizeDragging}
					tileMoving={tileMoving}
					setTileMoving={setTileMoving}
					onResizeTileDragEnd={onHandleDragEnd}
					bg="#1ABCFE"
					tileType="text"
				></Tile>

				<Tile
					ref={tile2Ref}
					key="Tile2"
					id="Tile2"
					z={Tile2Z}
					selected={Tile2Selected}
					pageState={pageState}
					position={tile2Position}
					setPosition={setTile2Position}
					size={tile2Size}
					setSize={setTile2Size}
					resizeHandleID={resizeHandleID}
					onTilePositionUpdate={onTilePositionUpdate}
					onMouseDown={onTile2MouseDown}
					onMouseUp={onTile2MouseUp}
					resizeOffset={resizeDragOffset}
					setResizeOffset={resizeDragOffsetSet}
					isResizeDragging={isResizeDragging}
					tileMoving={tileMoving}
					setTileMoving={setTileMoving}
					bg="#0ACF83"
					tileType="image"
				></Tile>

				{pageState === "2TILES" && (
					<ResizeDragControl
						width={PAGE_MARGIN}
						left={TILE_SIZE_HALF}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0}
						dragMomentum={false}
						onMouseDown={() => setResizeHandleID("center")}
						onHoverStart={onHandleHoverStart}
						onHoverEnd={onHandleHoverEnd}
						onDragStart={onResizeHandleDragStart}
						onDrag={onHandleDrag}
						onDragEnd={onHandleDragEnd}
					>
						<HandleMaterial style={{ opacity: 0 }} />
					</ResizeDragControl>
				)}

				{pageState === "1TILE" && resizeHandleID === "left" && (
					<ResizeDragControl
						width={PAGE_MARGIN}
						left={-PAGE_MARGIN}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0}
						dragMomentum={false}
						onHoverStart={onHandleHoverStart}
						onHoverEnd={onHandleHoverEnd}
						onMouseDown={() => setResizeHandleID("left")}
						onDragStart={onResizeHandleDragStart}
						onDrag={onHandleDrag}
						onDragEnd={onHandleDragEnd}
					/>
				)}
				{pageState === "1TILE" && resizeHandleID === "right" && (
					<ResizeDragControl
						width={PAGE_MARGIN}
						left={TILE_SIZE_FULL}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0}
						dragMomentum={false}
						onHoverStart={onHandleHoverStart}
						onHoverEnd={onHandleHoverEnd}
						onMouseDown={() => setResizeHandleID("right")}
						onDragStart={onResizeHandleDragStart}
						onDrag={onHandleDrag}
						onDragEnd={onHandleDragEnd}
					/>
				)}
			</Margin>
		</Container>
	);
};

const Container = styled(motion.div)`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	border-radius: 28px;
	background-color: #141414;
	position: relative;
`;

const Margin = styled(motion.div)`
	position: absolute;
	top: ${props => props.margin}px;
	bottom: ${props => props.margin}px;
	left: ${props => props.margin}px;
	right: ${props => props.margin}px;
`;

const ResizeDragControl = styled(motion.div)`
	width: ${props => props.width}px;
	height: 100%;
	position: absolute;
	left: ${props => props.left}px;
	background-color: red;
	opacity: 0;
`;

const HandleMaterial = styled(motion.div)`
	position: absolute;
	width: 6px;
	left: calc(50% - 3px);
	top: calc(50% - 32px);
	opacity: 1;
	height: 64px;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
`;
