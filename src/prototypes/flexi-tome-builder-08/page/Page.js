/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

import { colors } from "../ds/Colors";
import { transitions } from "../../../ds/Transitions";

import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";
import { TileResizeControl } from "./TileResizeControl";
import { RowResizeHandle } from "./RowResizeControl";
import { TilePlacementIndicator } from "./TilePlacementIndicator";
import { Overlay } from "../overlay/Overlay";

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
	height: auto;
	min-height: 100vh;
	//overflow-x: hidden;
	//overflow-y: hidden;
	// overflow-x: hidden;
	// overflow-y: auto;
`;

const PagePlayModeBg = styled(motion.div)`
	position: absolute;
	pointer-events: none;
	top: 0;
	left : 0;
	width: 100%;
	height: 100%;
`;

const PageContent = styled(motion.div)`
	position: relative;
	pointer-events: none;
`;

const PageBackground = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

const PageBackgroundMaterial = styled(motion.div)`
	position: absolute;
	pointer-events: none;
`;

export const Page = props => {
	const { getPageTop, getPageHeight, metrics } = useContext(MetricsContext);
	const { pageWidth, pageLeft, minPageHeight, pageMargin, pageCornerRadius, viewportWidth } = metrics;
	const { tomeData, currentPage, isPlayMode } = useContext(TomeContext);

	// Find the current page
	const page = tomeData.pages.filter(page => {
		return page.id === currentPage.id;
	})[0];
	//console.log(page.id);

	// Find all the rows that belong to this page
	const rows = tomeData.rows.filter(row => {
		return row.pageId === page.id;
	});
	//rows.sort((a, b) => (a.order > b.order ? 1 : -1));

	// Find the tiles for each row
	rows.forEach(row => {
		row.tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === currentPage.id && tile.rowId === row.id;
		});
		row.tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
	});
	// console.log(rows);

	// Find the page height
	const pageTop = getPageTop(page);
	const pageHeight = getPageHeight(page);

	useEffect(() => {
		// console.log("reset scroll");
		window.scroll({ top: 0, left: 0 });
	}, [currentPage.id]);

	const pageOriginY = useMotionValue(0);

	useEffect(() => {
		
		pageOriginY.set((pageTop + pageMargin + window.scrollY) / (pageHeight + (pageTop*2)));

		// console.log("pageOriginY", pageOriginY.get());
		/*
		if (isPlayMode) {
			pageOriginY.set(getScrollPercent())
		}
		*/
	}, [isPlayMode, pageOriginY, pageHeight, pageMargin, pageTop]);


	return (
		<Wrap
			id="pageWrap"
			key={page.id}
		>
			{/* <PagePlayModeBg 
				style={{
					backgroundColor: colors.z1,
				}}
				animate={{
					opacity: isPlayMode ? 1 : 0,
				}}
				initial={false}
				transition={transitions.playModeFade}
			/> */}
			<PageContent
				id="pageContent"
				style={{
					width: pageWidth,
					minHeight: minPageHeight,
					borderRadius: pageCornerRadius,
					height: pageHeight + (pageTop*2),
					originX: 0.5,
					//originY: 0.5,
					originY: pageOriginY,
				}}
				animate={{
					x: pageLeft,
					scale: isPlayMode ? 1.05 : 1,
				}}
				initial={false}
				transition={isPlayMode ? transitions.playModeFade : transitions.playModeFade}
				key={"pageContent_" + page.id}
			>
				<PageBackground
					style={{
						minHeight: minPageHeight,
					}}
					// animate={{
					// 	width: isPlayMode ? viewportWidth : pageWidth,
					// 	y: isPlayMode ? 0: pageTop,
					// 	x: isPlayMode ? -pageLeft : 0,
					// 	height: pageHeight + pageTop,
					// }}
					animate={{
						width: pageWidth,
						y: pageTop,
						x: 0,
						height: pageHeight + pageTop,
					}}
					transition={isPlayMode ? transitions.playModeFade : transitions.layoutTransition}
					initial={false}
				>
					<PageBackgroundMaterial
						// animate={{
						// 	backgroundColor: colors.z1,
						// 	width: isPlayMode ? viewportWidth : pageWidth,
						// 	height: isPlayMode ? document.documentElement.scrollHeight : pageHeight,
						// 	borderRadius: isPlayMode ? 0 : pageCornerRadius,
						// }}
						animate={{
							backgroundColor: colors.z1,
							width:pageWidth,
							height: pageHeight,
							borderRadius: pageCornerRadius,
						}}
						style={{
							minHeight: minPageHeight,
						}}
						initial={false}
						transition={isPlayMode ? transitions.playModeFade : transitions.layoutTransition}
					/>
				</PageBackground>

				<TilePlacementIndicator />

				<AnimatePresence>
					{tomeData.tiles.map(
						tile => tile.pageId === page.id && <Tile key={tile.id} tile={tile} pageTop={pageTop} />
					)}
				</AnimatePresence>

				{rows.map(
					row =>
						row.tiles.length > 1 && (
							<TileResizeControl
								tiles={row.tiles}
								order={1}
								row={row}
								rows={rows}
								key={row.id + "_resize_1"}
								pageTop={pageTop}
							/>
						)
				)}

				{rows.map(row => (
					<RowResizeHandle row={row} rows={rows} tiles={row.tiles} key={row.id + "_resize_3"} pageTop={pageTop} />
				))}
			</PageContent>

			{/* <Overlay pageHeight={pageHeight} pageTop={dPageTop} /> */}
		</Wrap>
	);
};
