import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";

import { MetricsContext, metricConstants } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";
// import { TileResizeControl } from "./TileResizeControl";
import { RowResizeHandle } from "./RowResizeControl";
import { TilePlacementIndicator } from "./TilePlacementIndicator";

const Wrap = styled(motion.div)`
	position: relative;
	pointer-events: none;
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
	const {
		pageWidth,
		pageLeft,
		pageTop,
		minPageHeight,
		pageCornerRadius,
		pageMargin,
		rowHeight,
		rowMargin,
		viewportHeight,
	} = useContext(MetricsContext).metrics;
	const { tomeData, currentPage } = useContext(TomeContext);

	// Find the current page
	const page = tomeData.pages.filter(page => {
		return page.id === currentPage.id;
	})[0];
	//console.log(page.id);

	// Find all the rows that belong to this page
	const rows = tomeData.rows.filter(row => {
		return row.pageId === currentPage.id;
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
	let dPageTop = pageTop;
	let pageHeight = pageMargin;
	rows.forEach(r => {
		pageHeight += rowHeight * r.height + rowMargin * r.height;
	});
	pageHeight -= rowMargin;
	pageHeight += pageMargin;

	// Find the page top
	if (pageHeight > minPageHeight) {
		const minY = metricConstants.cPageMinY;
		const minH = viewportHeight - minY - minY;
		if (pageHeight < minH) {
			dPageTop = (viewportHeight - pageHeight) / 2;
		} else {
			dPageTop = minY;
		}
	}

	//console.log(dPageTop);

	// dPageTop = 0;

	// useEffect(() => {
	// 	window.scrollTo({ top: 0, left: 0 });
	// }, [currentPage.id]);

	return (
		<Wrap id="pageWrap" key={page.id}>
			<PageContent
				id="pageContent"
				style={{
					width: pageWidth,
					minHeight: minPageHeight,
					borderRadius: pageCornerRadius,
				}}
				animate={{
					y: dPageTop,
					x: pageLeft,
				}}
				initial={false}
				transition={transitions.layoutTransition}
				//layout
			>
				<PageBackground
					style={{
						minHeight: minPageHeight,
					}}
					animate={{
						width: pageWidth,
						height: pageHeight + dPageTop,
					}}
					transition={transitions.layoutTransition}
					//layout
				>
					<PageBackgroundMaterial
						animate={{
							backgroundColor: colors.z1,
							width: pageWidth,
							height: pageHeight,
							borderRadius: pageCornerRadius,
						}}
						style={{
							minHeight: minPageHeight,
						}}
						initial={false}
						transition={transitions.layoutTransition}
						//layout
					/>
				</PageBackground>

				{tomeData.tiles.map(
					tile =>
						tile.pageId === page.id && (
							<Tile key={tile.id} tile={tile} pageHeight={pageHeight} pageTop={dPageTop} />
						)
				)}

				{/*
				{rows.map(
					row =>
						row.tiles.length > 1 && (
							<TileResizeControl tiles={row.tiles} order={1} row={row} rows={rows} key={row.id + "_resize_1"} />
						)
				)}
				*/}
				{/* 				
				{rows.map(
					row =>
						row.tiles.length > 2 && (
							<TileResizeControl tiles={row.tiles} order={2} row={row} rows={rows} key={row.id + "_resize_2"} />
						)
				)} */}

				{rows.map(row => (
					<RowResizeHandle row={row} rows={rows} tiles={row.tiles} key={row.id + "_resize_3"} />
				))}

				<TilePlacementIndicator />
			</PageContent>
		</Wrap>
	);
};
