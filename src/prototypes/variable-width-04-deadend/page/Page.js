import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

import { transitions } from "../ds/Transitions";

import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";
import { TileResizeControl } from "./TileResizeControl";
import { RowResizeHandle } from "./RowResizeControl";
import { TilePlacementIndicator } from "./TilePlacementIndicator";

//import { TileWidthIndicator } from "./TileWidthIndicator";

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
	height: auto;
	min-height: 100vh;
	//overflow-x: hidden;
	//overflow-y: hidden;
	// overflow-x: hidden;
	// overflow-y: auto;
	/* transition: transform 0.2s ease-out; */
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
	const { getPageTop, getPageHeight, getContentHeight, metrics /*, pageScrollY*/ } = useContext(MetricsContext);
	const { pageWidth, pageLeft, pageMargin, pageCornerRadius, pageBorderSize } = metrics;
	const { tomeData, currentPage, isPlayMode, rowResizing } = useContext(TomeContext);

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

	/*
	useEffect(() => {
		console.log("reset scroll");
		window.scroll({ top: 0, left: 0 });
	}, [currentPage.id]);
	*/

	const pageOriginY = useMotionValue(0);

	/*
	useEffect(() => {
		pageOriginY.set((pageTop + pageMargin + window.scrollY) / (pageHeight + pageTop * 2));
	}, [isPlayMode, pageOriginY]);
	*/

	const transition = isPlayMode ? transitions.playModeFade : transitions.layoutTransition;
	//const transition = {duration: 3}

	const needsOutline = page.theme.colors.backgrounds.canvas === page.theme.colors.backgrounds.page;
	//const needsOutline = false;

	//document.body.style.backgroundColor = page.theme.colors.backgrounds.canvas;


	const [pageScrollY, setPageScrollY] = useState(0);


	useEffect(() => {
		const handleWheel = e => {
			const min = metricConstants.cPageMinY;
			const max = -pageHeight + window.innerHeight - min;
			let y = pageScrollY.get() - e.deltaY;
			if (y > min) y = min;
			if (y < max) y = max;
			setPageScrollY(y)
		};
		window.addEventListener("wheel", handleWheel);
		return () => {
			window.removeEventListener("wheel", handleWheel);
		};
	});


	/*
	const animatePageYForWidthChange = (diff, per) => {
		//const pageHeight = getPageHeight(page);

		//const heightDifference = pageHeight - rowResizing.tempPageHeight;

		console.log("Page animatePageYForWidthChange", diff, per)

		const newScrollY = rowResizing.cachedScrollY + (diff * per);
		 
		//console.log("Page animatePageYForWidthChange", heightDifference, rowResizing.handleYPercent, pageScrollY.get(), rowResizing.cachedScrollY , heightDifference, rowResizing.handleYPercent, newScrollY)


		//pageScrollY.set(newScrollY)
		//animate(pageScrollY, newScrollY, {duration: 3});
		console.log(rowResizing.cachedScrollY , newScrollY)
		//animate(pageScrollY, newScrollY, transitions.layoutTransition);
	}
	*/


	return (
		<Wrap id="pageWrap" key={page.id} animate={{
			
			y: pageScrollY,
		}}
		transition={transition}
		>
			<PageContent
				id="pageContent"
				animate={{
					height: pageHeight + pageTop * 2,
					width: pageWidth,
				}}
				style={{
					x: pageLeft,
					originX: 0.5,
					originY: pageOriginY,
					borderRadius: pageCornerRadius,
					
				}}
				initial={false}
				transition={transition}
				key={"pageContent_" + page.id}
			>
				<PageBackground
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
					transition={transition}
					initial={false}
				>
					<PageBackgroundMaterial
						animate={{
							backgroundColor: isPlayMode
								? page.theme.colors.backgrounds.page
								: page.theme.colors.backgrounds.page,
							width: pageWidth,
							height: getContentHeight(page),
							borderRadius: pageCornerRadius,
							boxShadow:
								needsOutline && !isPlayMode
									? `0 0 0 ${pageBorderSize}px ${page.theme.colors.t2}`
									: "0 0 0 hsla(0,0%,0%,0)",
						}}
						initial={false}
						transition={transition}
					/>
				</PageBackground>
				<TilePlacementIndicator theme={page.theme} />
				<AnimatePresence>
					{tomeData.tiles.map(
						tile => tile.pageId === page.id && <Tile key={tile.id} tile={tile} pageTop={pageTop} page={page} />
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
								pageHeight={pageHeight}
								page={page}
								//animatePageYForWidthChange={animatePageYForWidthChange}
								pageScrollY={pageScrollY}
								setPageScrollY={setPageScrollY}
							/>
						)
				)}
				
				{rows.map(row => (
					<RowResizeHandle
						row={row}
						rows={rows}
						tiles={row.tiles}
						key={row.id + "_resize_2"}
						pageTop={pageTop}
						page={page}
					/>
				))}
			</PageContent>

			{/* <Overlay pageHeight={pageHeight} pageTop={dPageTop} /> */}
		</Wrap>
	);
};
