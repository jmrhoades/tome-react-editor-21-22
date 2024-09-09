import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { debounce } from "lodash";

import { TomeContext } from "./TomeContext";

export const metricConstants = {
	cViewportWidth: 1280,
	cViewportHeight: 720,

	cPageMarginLeft: 160,
	cPageMarginRight: 160,
	cPageMarginRightPanelOpen: 336,
	cPageMinMarginY: 72,

	cPresentModeMargin: 60,

	cPanelWidth: 240,

	cColumnCount: 12,
	cColumnMinWidth: 2,
	cColumnMaxWidth: 10,

	cRowCount: 6,
	cRowMinHeight: 2,

	cPageMargin: 12,
	cColumnGutter: 12,
	cRowMargin: 12,
	cTileCornerRadius: 12,
	cPageCornerRadius: 24,

	cTileBorderSize: 3,
	cTileResizeHandleSize: 6,
	cTileInsertIndicatorSize: 4,
};

const useViewport = (delay = 700) => {
	// Use window as viewport for now, but div w/ id #viewport is also an option
	// const viewport = document.getElementById("viewport").getBoundingClientRect();
	//const viewportRect = document.getElementById("viewport").getBoundingClientRect();
	//if (!viewportRect || viewportRect.width === 0) return;
	const [viewport, setViewport] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	useEffect(() => {
		const handleResize = () =>
			setViewport({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		const debouncedHandleResize = debounce(handleResize, delay);
		window.addEventListener("resize", debouncedHandleResize);
		return () => {
			window.removeEventListener("resize", debouncedHandleResize);
		};
	}, [delay]);
	return viewport;
};

const getMetrics = (sidePanelOpen, tomeData, currentPage) => {
	// Get viewport dimensions
	const vW = window.innerWidth;
	const vH = window.innerHeight;
	const {
		cViewportWidth,
		cPageMarginLeft,
		cPageMarginRight,
		cPageMarginRightPanelOpen,
		cPageMinMarginY,

		cPageCornerRadius,
		cTileCornerRadius,

		cColumnCount,
		cRowCount,
		cPageMargin,
		cColumnGutter,
		cRowMargin,

		cColumnMinWidth,
		cColumnMaxWidth,
		cRowMinHeight,

		cTileInsertIndicatorSize,
	} = metricConstants;

	// Set layout orientation based on viewport aspect ratio
	// Always set to landscape layout for now
	let isPortrait = false; // vW < vH; turn off for now

	// Find the "scale" of the page
	// let scale = isPortrait ? vH / cViewportHeight : vW / cViewportWidth;
	let pageScale = 1;

	// Page width
	let pageWidth = vW - cPageMarginLeft - cPageMarginRight;

	if (sidePanelOpen) {
		pageWidth = vW - cPageMarginLeft - cPageMarginRightPanelOpen;
		// pageScale = (vW - cPageMarginLeft - cPageMarginRightPanelOpen) / pageWidth;
	}

	let minPageHeight = (9 / 16) * pageWidth;
	
	let pageLeft = cPageMarginLeft;

	// Adjust for minimum y margin
	if ((vH - minPageHeight) / 2 < cPageMinMarginY) {
		// console.log((vH - minPageHeight) / 2, cPageMinMarginY)
		minPageHeight = vH - cPageMinMarginY * 2;
		pageWidth = (16 / 9) * minPageHeight;
		pageLeft = (vW - pageWidth) / 2;
	}

	// Now that we have sizes of everything, lay them out
	let pageTop = (vH - minPageHeight) / 2;
	let pageHeight = minPageHeight;

	// Find the "scale" of the page
	let scale = pageWidth / (cViewportWidth - cPageMarginLeft - cPageMarginRight);

	const pageCornerRadius = cPageCornerRadius * scale;
	const tileCornerRadius = cTileCornerRadius * scale;

	const columnCount = cColumnCount;
	const rowCount = cRowCount;

	const pageMargin = cPageMargin * scale;
	const columnGutter = cColumnGutter * scale;
	const columnWidth = (pageWidth - pageMargin * 2 - columnGutter * (columnCount - 1)) / columnCount;
	const rowMargin = cRowMargin * scale;
	const rowHeight = (minPageHeight - pageMargin * 2 - rowMargin * (rowCount - 1)) / rowCount;

	const dropIndicatorSize = cTileInsertIndicatorSize * scale

	/*
	if (tomeData && tomeData.rows) {
		// Find all the rows that belong to the current page
		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
		});
		//rows.sort((a, b) => (a.order > b.order ? 1 : -1));

		// Find the tiles for each of those rows
		rows.forEach(row => {
			row.tiles = tomeData.tiles.filter(tile => {
				return tile.pageId === currentPage.id && tile.rowId === row.id;
			});
			row.tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		});
		// console.log(rows);

		// Find the page height
		let pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;
		// Find the page top
		if (pageHeight > minPageHeight) {
			const minY = metricConstants.cPageMinMarginY;
			const minH = vH - minY - minY;
			if (pageHeight < minH) {
				pageTop = (vH - pageHeight) / 2;
			} else {
				pageTop = minY;
			}
		}

		// console.log(pageWidth)
	}
	*/

	const metrics = {
		viewportWidth: vW,
		viewportHeight: vH,

		isPortrait: isPortrait,
		scale: scale,

		pageLeft: pageLeft,
		pageTop: pageTop,
		pageWidth: pageWidth,
		pageHeight: pageHeight,
		minPageHeight: minPageHeight,
		pageScale: pageScale,
		pageCornerRadius: pageCornerRadius,

		tileCornerRadius: tileCornerRadius,

		columnCount: columnCount,
		rowCount: rowCount,

		pageMargin: pageMargin,
		columnGutter: columnGutter,
		rowMargin: rowMargin,

		columnWidth: columnWidth,
		rowHeight: rowHeight,

		columnMinWidth: cColumnMinWidth,
		columnMaxWidth: cColumnMaxWidth,
		rowMinHeight: cRowMinHeight,

		dropIndicatorSize: dropIndicatorSize,
	};

	return metrics;
};

export const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
	const { sidePanelOpen, } = useContext(TomeContext);

	const viewport = useViewport(0);
	const [metrics, setMetrics] = useState(getMetrics(true));

	const updateMetrics = useCallback(() => {
		setMetrics(getMetrics(sidePanelOpen));
	}, [sidePanelOpen]);

	useEffect(() => {
		updateMetrics();
	}, [viewport, sidePanelOpen, updateMetrics]);

	return (
		<MetricsContext.Provider
			value={{
				metrics,
			}}
		>
			{children}
		</MetricsContext.Provider>
	);
};
