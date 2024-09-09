import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../../ds/Colors";
import { transitions } from "../../../ds/Transitions";

import { metricConstants } from "../tome/MetricsContext";
import { OutlineTile } from "./OutlineTile";

export const OutlinePageHeight = 44;
export const OutlinePageWidth = Math.round(OutlinePageHeight * (16 / 9));

const PageWrap = styled(motion.div)`
	position: relative;
	cursor: pointer;
	display: flex;
`;

const PageHover = styled(motion.div)`
	position: absolute;
	top: 2px;
	left: 2px;
	right: 4px;
	bottom: 2px;
	border-radius: 4px;
	/* background: rgba(255, 255, 255, 0.04); */
`;

const PageSelected = styled(PageHover)`
	/* background: rgba(255, 255, 255, 0.08); */
`;

const PageCurrentIndicator = styled(motion.div)`
	display: flex;
	flex-direction: column;
  	justify-content: center;
`;

const PageCurrentIndicatorMaterial = styled(motion.div)``;

const PageNumber = styled(motion.div)`
	font-size: 11px;
	font-weight: 600;
	text-align: center;
`;

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
		scale: 0.975,
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

export const OutlinePage = ({ tomeData, page, number, isCurrent, isSelected, onMouseUp, transition }) => {
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

	const outlineScale = OutlinePageWidth / pageWidth;
	const scaledPageHeight = Math.round(pageHeight * outlineScale);

	const maxPageHeight = OutlinePageHeight * 3;
	// const indicatorHeight = scaledPageHeight >= maxPageHeight ? maxPageHeight : scaledPageHeight;
	const indicatorHeight = OutlinePageHeight;

	// console.log(pageHeight, "pageHeight", scaledPageHeight, OutlinePageHeight);

	return (
		<PageWrap
			onMouseUp={onMouseUp}
			whileTap="active"
			whileHover="hover"
			initial={"default"}
			variants={buttonVariants}
			transition={transition}
			style={{
				padding: "8px 0 8px 0",
			}}
			layout
		>
			<PageSelected initial={false} animate={{ opacity: isSelected ? 1 : 0 }} transition={{ duration: 0.2 }} />
			{/* <PageHover variants={hoverVariants} /> */}
			{isCurrent && (
				<PageCurrentIndicator
					
					transition={transitions.layoutTransition}
					style={{
						position: "absolute",
						top: 8,
						left: 0,
						width: 4,
						height: indicatorHeight,
					}}
				>
					<PageCurrentIndicatorMaterial
						style={{
							width: 3,
							height: 24,
							borderRadius: 1.5,
							backgroundColor: colors.accent,
							// boxShadow: `1px 0px 15px 5px rgba(237, 0, 235, .1), 1px 0px 35px 5px rgba(255, 255, 255, 0.1)`,
						}}
					/>
				</PageCurrentIndicator>
			)}
			<PageNumber
				// animate={{ opacity: isCurrent ? 0.4 : 0.4 }}
				transition={transitions.layoutTransition}
				style={{
					width: 28,
					lineHeight: `${indicatorHeight}px`,
					color: isCurrent ? colors.white : colors.white40,
				}}
			>
				{number}
			</PageNumber>
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
						borderRadius: 4,
						overflow: "hidden",
						maxHeight: maxPageHeight,
					}}
				>
					<FullSizedPage
						style={{
							width: pageWidth,
							height: pageHeight,
							scale: outlineScale,
							originX: 0,
							originY: 0,
							backgroundColor: colors.z1,
						}}
					>
						{tomeData.tiles.map(
							tile =>
								tile.pageId === page.id && (
									<OutlineTile
										key={tile.id}
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
							borderRadius: 4,
							backgroundColor: colors.white04,
						}}
						variants={hoverVariants}
					/>
				</PageMask>
				<OutlinePageSelected
					style={{
						width: OutlinePageWidth,
						height: scaledPageHeight,
						borderWidth: 1.5,
						borderRadius: 3,
						borderColor: colors.accent,
						// boxShadow: `inset 0px 0px 0px 1px rgba(51, 20, 50, 0.25)`,
						opacity: isSelected ? 1 : 0,
						maxHeight: maxPageHeight,
					}}
				/>
			</PageThumbnail>
		</PageWrap>
	);
};
