import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors} from "../../../ds/Colors";
import { metricConstants } from "../tome/MetricsContext";
import { OutlineTile } from "./OutlineTile";

const OutlinePageWidth = 94;
const OutlinePageHeight = Math.round(OutlinePageWidth * (9 / 16));

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
	background: rgba(255, 255, 255, 0.04);
`;

const PageSelected = styled(PageHover)`
	background: rgba(255, 255, 255, 0.08);
`;

const PageCurrentIndicator = styled(motion.div)``;

const PageNumber = styled(motion.div)`
	font-size: 10px;
	font-weight: 500;
	text-align: center;
`;

const PageThumbnail = styled(motion.div)`
	background: rgba(255, 255, 255, 0.04);
	/* background: #141414; */
`;

const FullSizedPage = styled(motion.div)`
	position: relative;
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
		scale: 0.95,
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
				padding: "8px 10px 8px 4px",
			}}
		>
			<PageSelected initial={false} animate={{ opacity: isSelected ? 1 : 0 }} transition={{ duration: 0.2 }} />
			<PageHover variants={hoverVariants} />
			<PageCurrentIndicator
				initial={false}
				animate={{ opacity: isCurrent ? 1 : 0 }}
				transition={{ duration: isCurrent ? 0.1 : 0.4 }}
				style={{
					width: 3,
					height: OutlinePageHeight,
					borderRadius: 3,
					backgroundColor: "rgba(237, 0, 235, 1)",
				}}
			/>
			<PageNumber
				animate={{ opacity: isCurrent ? 1 : 0.4 }}
				transition={transition}
				style={{
					width: 24,
					lineHeight: `${OutlinePageHeight}px`,
					color: "white",
				}}
			>
				{number}
			</PageNumber>
			<PageThumbnail
				variants={pageVariants}
				style={{
					width: OutlinePageWidth,
					height: scaledPageHeight,
					borderRadius: 4,
				}}
			>
				<FullSizedPage
					style={{
						width: pageWidth,
						height: pageHeight,
						scale: outlineScale,
						originX: 0,
						originY: 0,
                        backgroundColor: colors.z0,
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
								/>
							)
					)}
				</FullSizedPage>
			</PageThumbnail>
		</PageWrap>
	);
};
