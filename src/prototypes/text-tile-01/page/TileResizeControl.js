import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import useSound from "use-sound";
import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { transitions } from "../ds/Transitions";

import tile_resize_sound from "../../../sounds/click_01.mp3";
import tile_resize_start_sound from "../../../sounds/action_01.mp3";

import { Icon } from "../../../ds/Icon";

const ResizeHandle = styled(motion.div)`
	pointer-events: auto;
	position: absolute;
	z-index: 9999;
`;

const ResizeHandleMaterial = styled(motion.div)`
	position: absolute;
	left: 50%;
	top: 0;
`;

const Indicator = styled(motion.div)`
	position: absolute;
	left: 50%;
	/* top: 50%; */
	/* transform: translate(-50%, -50%); */
	transform: translateX(-50%);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	gap: 6px;
	border-radius: 8px;

	font-family: "Inter";
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	line-height: 20px;
	/* identical to box height, or 133% */

	/* Text & Icons/White */
`;
const Separator = styled(motion.div)`
	width: 1px;
	height: 16px;
	border-radius: 2px;
`;

const IconLabelGroup = styled(motion.div)`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0px 4px;
	gap: 4px;
	&.left {
		padding-left: 8px;
	}
	&.right {
		padding-right: 8px;
	}
`;

const IndicatorSmall = styled(Indicator)`
	/* padding: 4px 8px; */
	/* gap: 4px; */
	/* border-radius: 16px; */
	padding: 0;
	gap: 6px;
`;

const IconGroup = styled(IconLabelGroup)`
	padding: 6px 8px;
	&.left {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		padding-right: 2px;
	}
	&.right {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		padding-left: 2px;
	}
`;

export const TileResizeControl = props => {
	const {
		pageWidth,
		pageLeft,
		pageMargin,
		minPageHeight,
		columnCount,
		columnWidth,
		columnGutter,
		rowHeight,
		rowMargin,
		scale,
		columnMinWidth,
		columnMaxWidth,
		tileCornerRadius,
	} = useContext(MetricsContext).metrics;
	const { tomeData, setTomeData, setRowResizing, rowResizing, setSelectedTile, selectedTile, isPlayMode } =
		useContext(TomeContext);

	const [handleDown, setHandleDown] = useState(false);
	const [handleHovered, setHandleHovered] = useState(false);
	const [handlePanning, setHandlePanning] = useState(false);

	const [playSound] = useSound(tile_resize_sound);
	const [playStartSound] = useSound(tile_resize_start_sound);

	const handleWidth = pageMargin + 20;
	const handleOffset = -10;

	

	//const offset = pageLeft - handleWidth / 2;
	// console.log(props.tiles[0].order, props.tiles[1].order)

	const firstTile = props.tiles[0];
	let handleLeft = pageMargin + columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
	if (props.order === 2) {
		const secondTile = props.tiles[1];
		handleLeft += columnGutter + columnWidth * secondTile.width + columnGutter * (secondTile.width - 1);
	}

	let handleTop = pageMargin + props.pageTop;
	if (props.row.order !== 1) {
		props.rows.forEach(r => {
			// Find all the rows with orders less than this row
			// add up their heights
			if (r.order < props.row.order) {
				handleTop +=
					r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
				handleTop += rowMargin;
			}
		});
	}

	/*
	tileHeight
	*/
	let handleHeight = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	const handleSize = metricConstants.cTileResizeHandleSize * scale;
	const rHeight = rowHeight * props.row.height + rowMargin * (props.row.height - 1);
	const handleRef = useRef(null);
	const leftTile = props.tiles[0];
	const rightTile = props.tiles[1];

	const indicatorY = useMotionValue(0);
	const indicatorAnimations = useAnimation();

	useEffect(() => {

		if (handleDown) {
			
		}

		// if (handleRef.current) {
		// 	const rect = handleRef.current.getBoundingClientRect();
		// 	let newY = e.clientY - rect.y - 16;
		// 	if (newY > rHeight - tileCornerRadius * 2) {
		// 		newY = rHeight - tileCornerRadius * 2;
		// 	}

		if (indicatorY.get() > rHeight) {
			indicatorY.set(rHeight - (tileCornerRadius * 2) - 16);
		}

		// }
	}, [tomeData, handleDown]);

	return (
		<ResizeHandle
			onMouseDown={e => {
				//console.log("onMouseDown");
				//onMouseMove(e);
				setHandleDown(true);
				if (isPlayMode) return false;
				props.row.isResizingWidth = true;
				setRowResizing(props.row);
				document.body.classList.add("nocursor");

				const rect = handleRef.current.getBoundingClientRect();
				let newY = e.clientY - rect.y - 16;
				indicatorY.set(newY);

				playStartSound();
				//console.log(e, rect.y, e.clientY, newY);
			}}
			onMouseUp={e => {
				//console.log("onMouseUp");
				props.row.isResizingWidth = undefined;
				setHandleDown(false);
				setRowResizing(null);
				document.body.classList.remove("nocursor");
			}}
			onHoverStart={(event, info) => {
				if (rowResizing === null && isPlayMode === false) {
					document.body.style.cursor = "ew-resize";
					setHandleHovered(true);
					//if (!handlePanning) setRowResizing(props.row);
				}
			}}
			onHoverEnd={(event, info) => {
				if (!handlePanning) document.body.style.cursor = "auto";
				setHandleHovered(false);
				//if (!handlePanning) setRowResizing(null);
			}}
			// onPointerDown={(event, info) => {
			// 	//if (isPlayMode) return false;
			// 	//setRowResizing(props.row);
			// 	//if (selectedTile) setSelectedTile(null);
			// }}
			// onPointerUp={(event, info) => {
			// 	//setRowResizing(null);
			// }}
			onPanStart={(event, info) => {
				// sort tiles array by tile left position
				// currentPage.tiles.sort((a, b) => a.left - b.left);
				setHandlePanning(true);
			}}
			onPanEnd={(event, info) => {
				setHandlePanning(false);
				setRowResizing(null);
				setHandleDown(false);
				document.body.classList.remove("nocursor");
				props.row.isResizingWidth = undefined;
			}}
			onPan={(event, info) => {
				// console.log(info.point.x)
				const x = info.point.x;
				if (x >= pageLeft && x <= pageLeft + pageWidth) {
					let shouldUpdateWidths = false;

					// what 12-col grid point is the pointer closest to?
					let gridPoint = Math.round((x - pageLeft - pageMargin) / (columnWidth + columnGutter));

					if (props.tiles.length === 2) {
						if (gridPoint < columnMinWidth) gridPoint = columnMinWidth;
						if (gridPoint > columnMaxWidth) gridPoint = columnMaxWidth;

						//console.log("gridPoint", gridPoint, leftTile.width, rightTile.width)

						// update 1st tile width
						if (leftTile.width !== gridPoint) {
							leftTile.width = gridPoint;
							shouldUpdateWidths = true;
						}
						// update 2nd tile width
						if (rightTile.width !== columnCount - gridPoint) {
							rightTile.width = columnCount - gridPoint;
							shouldUpdateWidths = true;
						}

					}

					if (shouldUpdateWidths) {
						playSound();
						setTomeData({ ...tomeData });
						//console.log("SET DATA", gridPoint);
					}
				}
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: handleHovered || handlePanning ? 1 : 0,
				x: handleLeft + handleOffset,
				top: handleTop,
			}}
			transition={transitions.layoutTransition}
			style={{
				height: handleHeight,
				width: handleWidth,
			}}
		>
			<ResizeHandleMaterial
				ref={handleRef}
				animate={{
					// opacity: handleDown ? 0 : 1,
					backgroundColor: rowResizing
						? props.page.theme.colors.controls.resize.handleActive
						: props.page.theme.colors.controls.resize.handle,
	
					//height: rHeight - tileCornerRadius * 2,
					//y: tileCornerRadius,

					height: rHeight,
					y: 0,
					
				}}
				transition={handleDown ? transitions.layoutTransition : transitions.instant}
				style={{
					width: handleSize,
					borderRadius: handleSize / 2,
					x: "-50%",
					//marginTop: tileCornerRadius,
					//marginBottom: tileCornerRadius,
				}}
			/>
			{props.page.theme.colors.controls.resize.indicatorLarge &&
				props.page.theme.colors.controls.resize.indicatorShow && (
					<Indicator
						initial={false}
						animate={{
							opacity: handleDown ? 1 : 0,
							scale: handleDown ? 1 : 0,
						}}
						// animate={indicatorAnimations}
						transition={handleDown ? transitions.basic : transitions.instant}
						style={{
							background: props.page.theme.colors.controls.resize.indicatorBackground,
							color: props.page.theme.colors.controls.resize.indicatorForeground,
							boxShadow: props.page.theme.shadows.small,
							backdropFilter: "blur(50px)",
							x: "-50%",
							//y: "8px",
							y: indicatorY,
							paddingLeft: 4,
							paddingRight: 4,
						}}
					>
						<IconLabelGroup
							className="left"
							style={{ opacity: leftTile.width > columnMinWidth && leftTile.width <= columnMaxWidth ? 1 : 0.4 }}
						>
							{/* <Icon
							name="ArrowLeft"
							color={props.page.theme.colors.controls.resize.indicatorForeground}
							opacity={1}
							size={16}
						/> */}
							{leftTile.width}
						</IconLabelGroup>
						<Separator
							style={{
								backgroundColor: props.page.theme.colors.t2,
							}}
						/>
						<IconLabelGroup
							className="right"
							style={{
								opacity: rightTile.width <= columnMaxWidth && rightTile.width > columnMinWidth ? 1 : 0.4,
							}}
						>
							{rightTile.width}
							{/* <Icon
							name="ArrowRight"
							color={props.page.theme.colors.controls.resize.indicatorForeground}
							opacity={1}
							size={16}
						/> */}
						</IconLabelGroup>
					</Indicator>
				)}

			{!props.page.theme.colors.controls.resize.indicatorLarge && (
				<IndicatorSmall
					initial={false}
					animate={{
						opacity: handleDown ? 1 : 0,
						scale: handleDown ? 1 : 0,
						y: (rHeight - (rHeight - 120)) / 2 + (rHeight - 120) / 2 - 32 / 2,
					}}
					transition={handleDown ? transitions.basic : transitions.instant}
					style={{
						// boxShadow: props.page.theme.shadows.small,
						// backdropFilter: "blur(50px)",
						background: "transparent",
						x: "-50%",
						//y: "8px",
						y: indicatorY,
					}}
				>
					<IconGroup
						className="left"
						style={{
							opacity: leftTile.width > columnMinWidth && leftTile.width <= columnMaxWidth ? 1 : 0,
							background: props.page.theme.colors.controls.resize.indicatorBackground,
						}}
					>
						<Icon
							name="ArrowLeft"
							color={props.page.theme.colors.controls.resize.indicatorForeground}
							opacity={1}
							size={20}
						/>
					</IconGroup>
					<IconGroup
						className="right"
						style={{
							opacity: rightTile.width <= columnMaxWidth && rightTile.width > columnMinWidth ? 1 : 0,
							background: props.page.theme.colors.controls.resize.indicatorBackground,
						}}
					>
						<Icon
							name="ArrowRight"
							color={props.page.theme.colors.controls.resize.indicatorForeground}
							opacity={1}
							size={20}
						/>
					</IconGroup>
				</IndicatorSmall>
			)}
		</ResizeHandle>
	);
};
