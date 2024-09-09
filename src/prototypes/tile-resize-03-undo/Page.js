import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue, transform } from "framer-motion";

import { subscribe, publish } from "../../utils/pubsub";

import { Tile } from "./Tile";
import { TileResizeHandle } from "./TileResizeHandle";

import { PAGE_MARGIN, PAGE_WIDTH, PAGE_HEIGHT, TILE_SIZE_HALF } from "./index";

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
	const deselectTiles = e => {
		if (
			tile1Ref.current &&
			!tile1Ref.current.contains(e.target) &&
			tile2Ref.current &&
			!tile2Ref.current.contains(e.target)
		) {
			Tile1Selected.set(0);
			Tile2Selected.set(0);
		}
	};

	React.useEffect(() => {
		document.documentElement.addEventListener("mousedown", deselectTiles);

		subscribe("undo_delete_resize_tile", data => {
			resizeDragOffset.set(0);
			setTile1Size("");
			setTile2Size("");
			setTile1Size("half");
			setTile2Size("half");
		});

		return () => {
			document.documentElement.removeEventListener("mousedown", deselectTiles);
		};
	});

	//
	//
	// Resize Handle
	//
	//

	const [isResizeDragging, setIsResizeDragging] = useState(false);
	const resizeDragOffset = useMotionValue(0);
	const [resizeHandleID, setResizeHandleID] = useState("center");
	const resizeHandleMaterialOpacity = useMotionValue(0);

	const onHandleHoverStart = (event, info) => {
		document.body.style.cursor = "ew-resize";
		resizeHandleMaterialOpacity.set(1);
	};

	const onHandleHoverEnd = (event, info) => {
		if (!isResizeDragging) {
			document.body.style.cursor = "default";
			resizeHandleMaterialOpacity.set(0);
		}
	};

	const onResizeHandleDragStart = handleID => {
		resizeDragOffset.set(0);
		setIsResizeDragging(true);
	};

	const onHandleDrag = (event, info) => {
		const offset = transform(info.offset.x, [-150, 150], [-TILE_SIZE_HALF, TILE_SIZE_HALF]);
		resizeDragOffset.set(offset);
		console.log(offset);
	};

	const onHandleDragEnd = (event, info) => {
		setIsResizeDragging(false);

		const offset = transform(info.offset.x, [-150, 150], [-TILE_SIZE_HALF, TILE_SIZE_HALF]);
		const velocity = info.velocity.x;

		console.log("onHandleDragEnd", offset, velocity);

		document.body.style.cursor = "default";

		const MAX_OFFSET = 150;
		const tileStateCHanged = Math.abs(offset) > MAX_OFFSET;
		resizeDragOffset.set(0);

		switch (pageState) {
			case "2TILES":
				if (tileStateCHanged) {
					//setPageState("1TILE");
					if (offset < -MAX_OFFSET) {
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
					publish("tile_deleted_on_resize");
				} else {
					setTile1Size("");
					setTile2Size("");
					setTile1Size("half");
					setTile2Size("half");
				}
				break;
			case "1TILE":
				if (tileStateCHanged) {
					if (offset < -MAX_OFFSET) {
						//setTile1Size("half");
						setTile2Size("half");
						setTile2Position("left");
					}
					setPageState("2TILES");
				} else {
					const s1 = tile1Size;
					const s2 = tile2Size;
					setTile1Size("");
					setTile2Size("");
					setTile1Size(s1);
					setTile2Size(s2);
				}
				break;
			default:
				break;
		}
		resizeHandleMaterialOpacity.set(0);
	};

	return (
		<Container width={PAGE_WIDTH} height={PAGE_HEIGHT}>
			<Margin margin={PAGE_MARGIN}>
				<TileResizeHandle
					resizeDragOffset={resizeDragOffset}
					opacity={resizeHandleMaterialOpacity}
					left={TILE_SIZE_HALF}
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
					resizeHandleID={resizeHandleID}
					onTilePositionUpdate={onTilePositionUpdate}
					onMouseDown={onTile1MouseDown}
					onMouseUp={onTile1MouseUp}
					resizeDragOffset={resizeDragOffset}
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
					resizeHandleID={resizeHandleID}
					onTilePositionUpdate={onTilePositionUpdate}
					onMouseDown={onTile2MouseDown}
					onMouseUp={onTile2MouseUp}
					resizeDragOffset={resizeDragOffset}
					isResizeDragging={isResizeDragging}
					tileMoving={tileMoving}
					setTileMoving={setTileMoving}
					bg="#0ACF83"
					tileType="image"
				></Tile>

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
	/* background-color: red; */
	/* opacity: 0; */
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
