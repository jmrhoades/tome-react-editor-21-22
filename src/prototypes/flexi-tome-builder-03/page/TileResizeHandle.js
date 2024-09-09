import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../../../ds/Transitions";

const ResizeHandle = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	top: 0%;
	bottom: 0%;
	left: 50%;
	transform: translateX(-50%);
	width: 3px;
	border-radius: 0px;
`;

const handleWidth = 44;

export const TileResizeHandle2Up = props => {
	const { pageWidth, pageLeft, pageTop, minPageHeight, columnGrid, columnGridUnit, columnGridMinWidth } =
		useContext(MetricsContext).metrics;
	const { pages, setPages, currentPage, setTileResizing, setSelectedTile, selectedTile } = useContext(TomeContext);

	const [handle1Left, setHandle1Left] = useState(0);
	const [handle1Hovered, setHandle1Hovered] = useState(false);
	const [handle1Panning, setHandle1Panning] = useState(false);

	const offset = pageLeft - handleWidth / 2;
	useEffect(() => {
        const rightTile = currentPage.tiles[0].left < currentPage.tiles[1].left ? currentPage.tiles[1] : currentPage.tiles[0];
		setHandle1Left(rightTile.left * columnGridUnit + offset);
	}, [currentPage, columnGridUnit, pageLeft, pages, offset]);

	return (
		<ResizeHandle
			onHoverStart={(event, info) => {
				document.body.style.cursor = "ew-resize";
				setHandle1Hovered(true);
			}}
			onHoverEnd={(event, info) => {
				if (!handle1Panning) document.body.style.cursor = "auto";
				setHandle1Hovered(false);
			}}
			onPanStart={(event, info) => {
				// sort tiles array by tile left position
				currentPage.tiles.sort((a, b) => a.left - b.left);

				setHandle1Panning(true);
				setTileResizing(true);
				if (selectedTile) setSelectedTile(null);
			}}
			onPanEnd={(event, info) => {
				document.body.style.cursor = "auto";
				setHandle1Panning(false);
				setTileResizing(false);
				setHandle1Hovered(false);
			}}
			onPan={(event, info) => {
				// console.log(info.point.x)
				const x = info.point.x;
				if (x >= pageLeft && x <= pageLeft + pageWidth) {
					// what 12-col grid point is the pointer closest to?
					let gridPoint = Math.round((x - pageLeft) / columnGridUnit);
					if (gridPoint < columnGridMinWidth) gridPoint = columnGridMinWidth;

					if (gridPoint > 10) gridPoint = 10;

					let newHandleX = pageLeft + gridPoint * columnGridUnit - handleWidth / 2;
					if (handle1Left !== newHandleX) {
						setHandle1Left(newHandleX);
                        // find left & right tiles
                        
                        const rightTile = currentPage.tiles[1];
                        const leftTile = currentPage.tiles[0];
						// update 1st tile width
						leftTile.width = gridPoint;
						// update 2nd tile width & position
						
                        rightTile.left = gridPoint;
                        rightTile.width = columnGrid - gridPoint;
						
						setPages([currentPage]);
						// console.log(gridPoint, newHandleX);
					}
				}
			}}
			
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: handle1Hovered || handle1Panning ? 0 : 0,
				left: handle1Left,
			}}
			transition={{
				opacity: {
					delay: handle1Hovered ? 0.3 : 0,
					duration: 0.2,
					type: "tween",
				},
				default: transitions.layoutTransition,
			}}
			style={{
				top: pageTop,
				height: minPageHeight,
				width: handleWidth,
			}}
            className={"handle"}
		>
			<ResizeHandleMaterial
				animate={{
					backgroundColor: colors.accent,
				}}
			/>
		</ResizeHandle>
	);
};

export const TileResizeHandle3Up = props => {
	const { pageWidth, pageLeft, pageTop, minPageHeight, columnGrid, columnGridUnit, columnGridMinWidth } =
		useContext(MetricsContext).metrics;
	const { pages, setPages, currentPage, setTileResizing } = useContext(TomeContext);

	const [handle1Left, setHandle1Left] = useState(0);
	const [handle1Hovered, setHandle1Hovered] = useState(false);
	const [handle1Panning, setHandle1Panning] = useState(false);

	const [handle2Left, setHandle2Left] = useState(0);
	const [handle2Hovered, setHandle2Hovered] = useState(false);
	const [handle2Panning, setHandle2Panning] = useState(false);

	const offset = pageLeft - handleWidth / 2;
	useEffect(() => {
		currentPage.tiles.sort((a, b) => a.left - b.left);
		setHandle1Left(currentPage.tiles[1].left * columnGridUnit + offset);
		setHandle2Left(currentPage.tiles[2].left * columnGridUnit + offset);
	}, [currentPage, columnGridUnit, pageLeft, pages, offset]);

	return (
		<>
			<ResizeHandle
				onHoverStart={(event, info) => {
                    if(handle2Panning) return;
					document.body.style.cursor = "ew-resize";
					setHandle1Hovered(true);
				}}
				onHoverEnd={(event, info) => {
                    if(handle2Panning) return;
					if (!handle1Panning) document.body.style.cursor = "auto";
					setHandle1Hovered(false);
				}}
				onPanStart={(event, info) => {
					// Sort tiles by left position
					currentPage.tiles.sort((a, b) => a.left - b.left);
                    if(handle2Panning) return;
					setHandle1Panning(true);
					setTileResizing(true);
					//if (selectedTile) setSelectedTile(null);
				}}
				onPanEnd={(event, info) => {
                    if(handle2Panning) return;
					document.body.style.cursor = "auto";
					setHandle1Panning(false);
					setTileResizing(false);
					setHandle1Hovered(false);
				}}
				onPan={(event, info) => {
                    if(handle2Panning) return;
					// console.log(info.point.x)
					const x = info.point.x;
					if (x >= pageLeft && x <= pageLeft + pageWidth) {
						// what 12-col grid point is the pointer closest to?
						let gridPoint = Math.round((x - pageLeft) / columnGridUnit);
						if (gridPoint < columnGridMinWidth) gridPoint = columnGridMinWidth;
						let maxGridPoint = currentPage.tiles[2].left - columnGridMinWidth;
						if (gridPoint > maxGridPoint) gridPoint = maxGridPoint;
						let newHandleX = pageLeft + gridPoint * columnGridUnit - handleWidth / 2;
						if (handle1Left !== newHandleX) {
							setHandle1Left(newHandleX);
							// update 1st tile width
							currentPage.tiles[0].width = gridPoint;
							// update 2nd tile width & position
							if (currentPage.tiles[1]) {
								currentPage.tiles[1].left = gridPoint;
								currentPage.tiles[1].width = currentPage.tiles[2].left - gridPoint;
							}
							// console.log(gridPoint, currentPage.tiles[2].left);
							
							setPages([currentPage]);
						}
					}
				}}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: handle1Hovered || handle1Panning ? 0 : 0,
					left: handle1Left,
				}}
				transition={{
					opacity: {
						delay: handle1Hovered ? 0.3 : 0,
						duration: 0.2,
						type: "tween",
					},
					default: transitions.layoutTransition,
				}}
				style={{
					top: pageTop,
					height: minPageHeight,
					width: handleWidth,
				}}
			>
				<ResizeHandleMaterial
					animate={{
						backgroundColor: colors.accent,
					}}
				/>
			</ResizeHandle>

			<ResizeHandle
				onHoverStart={(event, info) => {
                    if(handle1Panning) return;
					document.body.style.cursor = "ew-resize";
					setHandle2Hovered(true);
				}}
				onHoverEnd={(event, info) => {
                    if(handle1Panning) return;
					if (!handle2Panning) document.body.style.cursor = "auto";
					setHandle2Hovered(false);
				}}
				onPanStart={(event, info) => {
					// Sort tiles by left position
                    if(handle1Panning) return;
					setHandle2Panning(true);
					setTileResizing(true);
					
					//if (selectedTile) setSelectedTile(null);
				}}
				onPanEnd={(event, info) => {
                    if(handle1Panning) return;
					document.body.style.cursor = "auto";
					setHandle2Panning(false);
					setHandle2Hovered(false);
					setTileResizing(false);
				}}
				onPan={(event, info) => {
                    if(handle1Panning) return;
					// console.log(info.point.x)
					const x = info.point.x;
					if (x >= pageLeft && x <= pageLeft + pageWidth) {
						// what 12-col grid point is the pointer closest to?
						let gridPoint = Math.round((x - pageLeft) / columnGridUnit);
						let minGridPointX = currentPage.tiles[1].left + columnGridMinWidth;
						let maxGridPoint = columnGrid - columnGridMinWidth;
						if (gridPoint < minGridPointX) gridPoint = minGridPointX;
						if (gridPoint > maxGridPoint) gridPoint = maxGridPoint;
						let newHandleX = pageLeft + gridPoint * columnGridUnit - handleWidth / 2;
						if (handle2Left !== newHandleX) {
							setHandle2Left(newHandleX);
							// update 2nd tile width
							currentPage.tiles[1].width = gridPoint - currentPage.tiles[1].left;
							// update 3rd tile width & position
							if (currentPage.tiles[2]) {
								currentPage.tiles[2].left = gridPoint;
								currentPage.tiles[2].width = columnGrid - gridPoint;
							}
							// console.log(gridPoint, currentPage.tiles[2].left);
							setPages([currentPage]);
						}
					}
				}}
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: handle2Hovered || handle2Panning ? 0 : 0,
					left: handle2Left,
				}}
				transition={{
					opacity: {
						delay: handle2Hovered ? 0.3 : 0,
						duration: 0.2,
						type: "tween",
					},
					default: transitions.layoutTransition,
				}}
				style={{
					top: pageTop,

					height: minPageHeight,
					width: handleWidth,
				}}
			>
				<ResizeHandleMaterial
					animate={{
						backgroundColor: colors.accent,
					}}
				/>
			</ResizeHandle>
		</>
	);
};
