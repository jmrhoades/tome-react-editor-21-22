import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { transitions } from "../../../ds/Transitions";

import { metricConstants } from "../tome/MetricsContext";
import { OutlineTile } from "./OutlineTile";

export const OutlinePageHeight = 48;
export const OutlinePageWidth = Math.round(OutlinePageHeight * (16 / 9));
export const outlineCornerRadius = 4;

const PageWrap = styled(motion.div)`
	position: relative;
	cursor: pointer;
	display: flex;
`;

const MetaInfo = styled(motion.div)`
	display: flex;
	padding-top: 9px;
	justify-content: center;
	gap: 6px;
	margin-right: 4px;
`;





const PageCurrentIndicator = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;



const PageNumber = styled(motion.div)``;

const PageThumbnail = styled(motion.div)`
	position: relative;
`;

const FullSizedPage = styled(motion.div)`
	position: relative;
`;

const OutlinePageHover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const PageMask = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const OutlinePageSelected = styled(motion.div)`
	position: absolute;
	pointer-events: none;
	border-style: solid;
`;

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		opacity: 1,
	},
	disabled: {
		opacity: 0.5,
	},
};

const pageVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.995,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0.5,
	},
};

const hoverVariants = {
	default: {
		opacity: 0,
	},
	hover: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	active: {
		opacity: 1,
		transition: { duration: 0.08 },
	},
	disabled: {
		opacity: 0,
	},
};

export const OutlinePage = ({
	tomeData,
	currentPage,
	page,
	number,
	isCurrent,
	isSelected,
	onMouseUp,
	transition,
	id,
}) => {
	const pageMargin = metricConstants.cPageMargin;
	const rowMargin = metricConstants.cRowMargin;
	const columnGutter = metricConstants.cColumnGutter;
	const rowCount = metricConstants.cRowCount;
	const columnCount = metricConstants.cColumnCount;
	const pageWidth =
		metricConstants.cViewportWidth - metricConstants.cPageMarginLeft - metricConstants.cPageMarginRight;
	const minPageHeight = (9 / 16) * pageWidth;
	const rowHeight = (minPageHeight - pageMargin * 2 - rowMargin * (rowCount - 1)) / rowCount;
	const columnWidth = (pageWidth - pageMargin * 2 - columnGutter * (columnCount - 1)) / columnCount;

	// Find all the rows that belong to this page
	const rows = tomeData.rows.filter(row => {
		return row.pageId === page.id;
	});
	rows.sort((a, b) => (a.order > b.order ? 1 : -1));
	// Find the tiles for each row and attach to rows data
	rows.forEach(row => {
		row.tiles = tomeData.tiles.filter(tile => {
			return tile.pageId === page.id && tile.rowId === row.id;
		});
		row.tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
	});
	let pageHeight = pageMargin;
	rows.forEach(r => {
		pageHeight += rowHeight * r.height + rowMargin * r.height;
	});
	pageHeight -= rowMargin;
	pageHeight += pageMargin;

	const outlineScale = (OutlinePageWidth - 4) / pageWidth;
	const scaledPageHeight = Math.round(pageHeight * outlineScale);

	const maxPageHeight = OutlinePageHeight * 3;

	const needsOutline = page.theme.colors.backgrounds.canvas === page.theme.colors.backgrounds.page;

	return (
		<PageWrap
			key={id}
			onMouseUp={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={transition}
			style={{
				padding: "4px 0 4px 0",
			}}
			//layout
		>

			<MetaInfo>
				<PageCurrentIndicator
					transition={transitions.layoutTransition}
					style={{
						width: 2,
						height: 24,
						borderRadius: 3,
						backgroundColor: currentPage.theme.colors.accent,
						opacity: isCurrent ? 1 : 0,
					}}
				/>
				<PageNumber
					transition={transitions.layoutTransition}
					style={{
						fontWeight: 600,
						fontSize: "13px",
						lineHeight: "24px",
						width: 16,
						color: isCurrent ? currentPage.theme.colors.t9 : currentPage.theme.colors.t7,
						
					}}
				>
					{number}
				</PageNumber>
			</MetaInfo>
			<PageThumbnail
				variants={pageVariants}
				style={{
					width: OutlinePageWidth,
					height: scaledPageHeight,
					maxHeight: maxPageHeight,
				}}
			>
				<PageMask
					style={{
						width: OutlinePageWidth,
						height: scaledPageHeight,
						borderRadius: outlineCornerRadius,
						overflow: "hidden",
						maxHeight: maxPageHeight,
						backgroundColor: page.theme.colors.backgrounds.page,
						// boxShadow: needsOutline ? `0 0 0 1px ${page.theme.colors.t2}` : undefined,
						// backfaceVisibility: "hidden",
						// transformStyle: "preserve-3d",
						// transform: "translate3d(0,0,0)",
						// outline: "1px solid transparent",
						// fontSmoothing: "antialiased",
						// webkitMaskImage: "-webkit-radial-gradient(white, black)",
					}}
				>
					<FullSizedPage
						style={{
							width: pageWidth,
							height: pageHeight,
							scale: outlineScale,
							originX: 0,
							originY: 0,
							perspective: 1,
							x: 2,
							y: 2,
						}}
					>
						{tomeData.tiles.map(
							tile =>
								tile.pageId === page.id && (
									<OutlineTile
										key={"outline_tile_" + tile.id}
										id={"outline_tile_" + tile.id}
										tomeData={tomeData}
										page={page}
										tile={tile}
										columnWidth={columnWidth}
										columnGutter={columnGutter}
										rowHeight={rowHeight}
										rowMargin={rowMargin}
										pageMargin={pageMargin}
										minPageHeight={minPageHeight}
										columnCount={columnCount}
									/>
								)
						)}
					</FullSizedPage>
					<OutlinePageHover
						style={{
							borderRadius: outlineCornerRadius,
							backgroundColor: page.theme.colors.t1,
						}}
						variants={hoverVariants}
					/>
				</PageMask>
				
			</PageThumbnail>
			<OutlinePageSelected
					style={{
						width: OutlinePageWidth,
						height: scaledPageHeight,
						//borderWidth: 1,
						borderRadius: outlineCornerRadius - 1,
						//borderColor: currentPage.theme.colors.accent,
						// boxShadow: `inset 0px 0px 0px 1px rgba(51, 20, 50, 0.25)`,
						boxShadow: "0 0 0 1px " + currentPage.theme.colors.accent,
						opacity: isSelected ? 1 : 0,
						maxHeight: maxPageHeight,
						left: 28,
					}}
				/>
		</PageWrap>
	);
};
