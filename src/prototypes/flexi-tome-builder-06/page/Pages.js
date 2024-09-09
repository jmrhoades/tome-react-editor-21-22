import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";

import { MetricsContext } from "../tome/MetricsContext";
import { TomeContext } from "../tome/TomeContext";
import { Tile } from "./Tile";
import { TileResizeControl } from "./TileResizeControl";
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

export const Pages = props => {
	const { pageWidth, pageLeft, pageTop, minPageHeight, pageCornerRadius, pageMargin, rowHeight, rowMargin } =
		useContext(MetricsContext).metrics;
	const { tomeData, currentPage } = useContext(TomeContext);

    tomeData.pages.sort((a, b) => (a.order > b.order ? 1 : -1));

	// Find the current page
	const page = tomeData.pages.filter(page => {
		return page.id === currentPage.id;
	})[0];
	console.log(page.id);

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

	let pageHeight = pageMargin;
	rows.forEach(r => {
		pageHeight += rowHeight * r.height + rowMargin * r.height;
	});
	pageHeight -= rowMargin;
	pageHeight += pageMargin;

	return (
		<Wrap
			id="pageWrap"
			transition={transitions.layoutTransition}
			layout
			style={{
				paddingTop: pageTop,
			}}
			key={page.id}
		>
			<PageContent
				id="pageContent"
				
				style={{
					backgroundColor: colors.z1,
					marginLeft: pageLeft,
					width: pageWidth,
					minHeight: minPageHeight,
					borderRadius: pageCornerRadius,
				}}
				transition={transitions.layoutTransition}
				layout
			>
				<PageBackground
					style={{
						width: pageWidth,
						minHeight: minPageHeight,
						height: pageHeight + pageTop,
					}}
					transition={transitions.layoutTransition}
					layout
				>
					<PageBackgroundMaterial
						style={{
							backgroundColor: colors.z1,
							width: pageWidth,
							minHeight: minPageHeight,
							height: pageHeight,
							borderRadius: pageCornerRadius,
						}}
						transition={transitions.layoutTransition}
						layout
					/>
				</PageBackground>

				{tomeData.tiles.map(tile => (
					<Tile key={tile.id} tile={tile} pageHeight={pageHeight} />
				))}

				{rows.map(
					row =>
						row.tiles.length > 1 && (
							<TileResizeControl tiles={row.tiles} order={1} row={row} rows={rows} key={row.id + "_resize_1"} />
						)
				)}
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
