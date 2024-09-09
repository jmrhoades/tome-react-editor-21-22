import React, { useState, createContext, useLayoutEffect, useCallback, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { TomeContext } from "./TomeContext";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { Lethargy } from "lethargy";

export const metricConstants = {
	cViewportWidth: 1412,
	cViewportHeight: 856,

	cPageWidth: 1152,

	cPageMarginLeft: 130,
	cPageMarginLeftPanelOpen: 130,
	cPageMarginRight: 130,
	cPageMarginRightPanelOpen: 130,

	cPageMinMarginY: 104,
	cPageMinY: 104,

	cPresentModeMargin: 60,

	cPanelWidth: 240,

	cColumnCount: 12,
	cColumnMinWidth: 1,
	cColumnMaxWidth: 11,

	cRowCount: 12,
	cRowMinHeight: 1,
	cRowDefaultHeight: 6,

	cPageMargin: 12,
	cColumnGutter: 12,
	cRowMargin: 12,
	cTileCornerRadius: 12,
	cPageCornerRadius: 24,

	cTileBorderSize: 2,
	cTileResizeHandleSize: 6,
	cTileInsertIndicatorSize: 4,

	cPageBorderSize: 3,
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
	useLayoutEffect(() => {
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

export const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
	const { sidePanelOpen, tomeData, rowResizing, currentPage } = useContext(TomeContext);
	//const tempPageTop = useMotionValue(0);
	//const tempPageHeight = useMotionValue(0);
	const pageScrollY = useMotionValue(metricConstants.cPageMinMarginY);

	const windowWidth = useMotionValue(window.innerWidth);
	const windowHeight = useMotionValue(window.innerHeight);

	//const windowWidthRange = [480, 1324, 176 * 12];
	//const windowHeightRange = [480, 796, 106 * 12];
	//const marginHRange = [144, 144, 144];
	//const marginVRange = [64, 64, 20 * 12];
	//const marginH = useTransform(windowWidth, windowWidthRange, marginHRange);
	//const marginV = useTransform(windowHeight, windowHeightRange, marginVRange);

	const marginH = metricConstants.cPageMarginLeft;
	const marginV = metricConstants.cPageMinMarginY;

	const scrollMotion = useMotionValue(window.scrollY);

	const getMetrics = sidePanelOpen => {
		windowWidth.set(window.innerWidth);
		windowHeight.set(window.innerHeight);

		// Get viewport dimensions
		const vW = window.innerWidth;
		const vH = window.innerHeight;
		const {
			cPageWidth,
			cPageCornerRadius,
			cTileCornerRadius,
			cTileBorderSize,
			cColumnCount,
			cRowCount,
			cPageMargin,
			cColumnGutter,
			cRowMargin,
			cColumnMinWidth,
			cColumnMaxWidth,
			cRowMinHeight,
			cTileInsertIndicatorSize,
			cPageBorderSize,
		} = metricConstants;

		//let pageWidth = Math.round(window.innerWidth - Math.round(marginH.get() * 2));
		let pageWidth = Math.round(window.innerWidth - Math.round(marginH * 2));
		//if (pageWidth > 1280) pageWidth = 1048;

		/*
		if (sidePanelOpen) {
			pageWidth = Math.round(window.innerWidth - cPageMarginLeftPanelOpen - cPageMarginRightPanelOpen);
		}
		*/

		//pageWidth = cPageWidth;
		let pageHeight = Math.round((9 / 16) * pageWidth);

		// Always fit a 16x9 page on the screen
		if ((window.innerHeight - pageHeight) / 2 <= marginV) {
			pageHeight = Math.round(window.innerHeight - Math.round(marginV * 2));
			pageWidth = Math.round((16 / 9) * pageHeight);
		}

		if (sidePanelOpen) {
			//cPageMarginLeftPanelOpen
		}

		let minPageHeight = (9 / 16) * pageWidth;
		let pageTop = (window.innerHeight - minPageHeight) / 2;

		let pageLeft = (window.innerWidth - pageWidth) / 2;

		/*
		if (sidePanelOpen && pageLeft < cPageMarginRightPanelOpen) {
			pageLeft -= cPageMarginRightPanelOpen - pageLeft;
		}
		*/

		/*
		console.log(
			"window.innerWidth",
			window.innerWidth,
			"marginH: ",
			Math.round(marginH.get()),
			"marginV: ",
			Math.round(marginV.get()),
			"pageWidth:",
			pageWidth,
			"pageHeight:",
			pageHeight
		);
		*/

		// Set layout orientation based on viewport aspect ratio
		// Always set to landscape layout for now
		let isPortrait = false; // vW < vH; turn off for now

		// Find the "scale" of the page
		// let scale = isPortrait ? vH / cViewportHeight : vW / cViewportWidth;
		let pageScale = 1;

		// Find the "scale" of the page
		let scale = pageWidth / cPageWidth;
		//scale = 1;

		const pageCornerRadius = cPageCornerRadius * scale;
		const tileCornerRadius = cTileCornerRadius * scale;
		let tileBorderSize = cTileBorderSize * scale;
		let pageBorderSize = cPageBorderSize * scale;
		if (tileBorderSize < 1) tileBorderSize = 1;
		if (pageBorderSize < 1) pageBorderSize = 1;

		const columnCount = cColumnCount;
		const rowCount = cRowCount;

		const pageMargin = cPageMargin * scale;
		const columnGutter = cColumnGutter * scale;
		const columnWidth = (pageWidth - pageMargin * 2 - columnGutter * (columnCount - 1)) / columnCount;
		const rowMargin = cRowMargin * scale;
		const rowHeight = (minPageHeight - pageMargin * 2 - rowMargin * (rowCount - 1)) / rowCount;

		const dropIndicatorSize = cTileInsertIndicatorSize * scale;

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
			tileBorderSize: tileBorderSize,
			pageBorderSize: pageBorderSize,

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

	const viewport = useViewport(60);
	const [metrics, setMetrics] = useState(getMetrics(true));

	const updateMetrics = useCallback(() => {
		setMetrics(getMetrics(sidePanelOpen));
	}, [sidePanelOpen]);

	useLayoutEffect(() => {
		updateMetrics();
	}, [viewport, sidePanelOpen, updateMetrics]);

	const pointerX = useMotionValue(0);
	const pointerY = useMotionValue(0);
	const pointerInWindow = useMotionValue(true);

	/*
	React.useEffect(() => {
		const setFromEvent = e => {
			pointerX.set(e.clientX);
			pointerY.set(e.clientY);
		};
		const pointerEnter = e => {
			pointerInWindow.set(true);
		};
		const pointerExit = e => {
			pointerInWindow.set(false);
		};
		document.addEventListener("mousemove", setFromEvent);
		document.addEventListener("mouseenter", pointerEnter);
		document.addEventListener("mouseleave", pointerExit);
		return () => {
			document.removeEventListener("mousemove", setFromEvent);
			document.removeEventListener("mouseenter", pointerEnter);
			document.removeEventListener("mouseleave", pointerExit);
		};
	}, [pointerX, pointerY, pointerInWindow]);
	*/

	const {
		viewportHeight,
		minPageHeight,
		pageMargin,
		rowHeight,
		rowMargin,
		pageTop,
		columnWidth,
		columnGutter,
		pageWidth,
		pageLeft,
	} = metrics;

	// Use this to prop up the body height while resizing rows
	// Otherwise the page will jump unexpectedly and the resize operation
	// will become uncontrollable
	const getContentHeight = page => {
		let pageHeight = 0;
		// Find the rows belonging to the page
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		// Find the page height
		pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;
		return pageHeight;
	};

	const getPageHeight = page => {
		let pageHeight = 0;

		// Find the rows belonging to the page
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		// Find the page height
		pageHeight = pageMargin;
		rows.forEach(r => {
			pageHeight += rowHeight * r.height + rowMargin * r.height;
		});
		pageHeight -= rowMargin;
		pageHeight += pageMargin;

		/*
		// Suspend when row/tile resizing
		if (rowResizing) {
			pageHeight = tempPageHeight.get();
		} else {
			tempPageHeight.set(pageHeight);
		}
		*/

		return pageHeight;
	};

	const getPageTop = page => {
		// Find the page height
		let scrollY = pageScrollY.get();
		let pageTop = scrollY;
		let pageHeight = getPageHeight(page);

		if (rowResizing && rowResizing.isResizingWidth) {
			const heightDifference = pageHeight - rowResizing.tempPageHeight;
			pageTop = scrollY - heightDifference * rowResizing.handleYPercent;
		} else if (rowResizing && rowResizing.isResizingHeight) {
			// console.log("rowResizing.height")
		} else {
			//console.log("DO IT", scrollY, pageHeight, pageHeight + scrollY, window.innerHeight - (pageHeight + scrollY));
			const bottomSpace = window.innerHeight - (pageHeight + scrollY);
			if (bottomSpace > metricConstants.cPageMinY) {
				pageTop = -pageHeight + window.innerHeight - metricConstants.cPageMinY;
				pageScrollY.set(pageTop);
			}
			if (scrollY > metricConstants.cPageMinY) {
				pageTop = metricConstants.cPageMinY;
				pageScrollY.set(metricConstants.cPageMinY);
			}
			

		}

		if (pageHeight <  window.innerHeight) {
			pageTop = (window.innerHeight-pageHeight)/2
			//pageScrollY.set();
		}


		return pageTop;
		//return 0;
	};

	const getTileWidth = tile => {
		let tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);
		return tileWidth;
	};

	const getTileWidthForUnit = unit => {
		return columnWidth * unit + columnGutter * (unit - 1);
	};

	const getTileX = tile => {
		let tileX = pageMargin;
		// Set based on order
		if (tile.order === 1) {
			tileX = pageMargin;
		}
		if (tile.order === 2) {
			// const firstTile = tiles[0];
			//const firstTile = tiles.filter(tile => {
			//return tile.order === 1;
			//})[0];
			//const firstTileWidth = columnWidth * firstTile.width + columnGutter * (firstTile.width - 1);
			//tileX = pageMargin + firstTileWidth + columnGutter;
			tileX = pageWidth - pageMargin - getTileWidth(tile);
		}
		return tileX;
	};

	const getTileY = tile => {
		//console.log("getTileY")
		const page = tomeData.pages.filter(page => {
			return page.id === tile.pageId;
		})[0];
		//console.log(tile)
		const rows = tomeData.rows.filter(row => {
			return row.pageId === page.id;
		});
		let tileTop = pageMargin + getPageTop(page);
		const row = tomeData.rows.filter(r => {
			return r.id === tile.rowId;
		})[0];
		if (row.order !== 1) {
			rows.forEach(r => {
				// Find all the rows with orders less than this row
				// add up their heights
				if (r.order < row.order) {
					tileTop +=
						r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
					tileTop += rowMargin;
				}
			});
		}
		return tileTop;
	};

	const getTileHeight = tile => {
		let tileHeight = 0;
		// Find the row the tile is in
		const row = tomeData.rows.filter(r => {
			return r.id === tile.rowId;
		})[0];
		if (row && row.height) {
			tileHeight = rowHeight * row.height + rowMargin * (row.height - 1);
		}
		return tileHeight;
	};

	const getTileRect = tile => {
		const rect = {
			x: getTileX(tile),
			y: getTileY(tile),
			width: getTileWidth(tile),
			height: getTileHeight(tile),
		};
		return rect;
	};

	const getRowRect = row => {
		const rows = tomeData.rows.filter(r => {
			return r.pageId === row.pageId;
		});
		let top = pageMargin + pageTop;
		if (row.order !== 1) {
			rows.forEach(r => {
				// Find all the rows with orders less than this row
				// add up their heights
				if (r.order < row.order) {
					top +=
						r.height === 0 ? minPageHeight - pageMargin * 2 : rowHeight * r.height + rowMargin * (r.height - 1);
					top += rowMargin;
				}
			});
		}

		/*
		Row height
		*/
		let height = rowHeight * row.height + rowMargin * (row.height - 1);

		const rect = {
			x: pageLeft,
			y: top,
			width: pageWidth,
			height: height,
		};
		return rect;
	};

	const leth = new Lethargy(2, 120, 0.05);
	useEffect(() => {
		const handleWheel = e => {
			const scrollSign = leth.check(e);
			if (scrollSign !== false) {
				console.log(scrollSign);
				pageScrollY.set(pageScrollY.get() - e.deltaY);
				setMetrics(getMetrics(true));
			}
		};

		window.addEventListener("wheel", handleWheel);
		return () => {
			window.removeEventListener("wheel", handleWheel);
		};
	});

	const scrollWindowToY = y => {
		// Scroll the window down
		/*
		const scrollY = window.scrollY;
		animate(scrollY, y, {
			type: "tween",
			ease: "easeInOut",
			duration: 1,
			onUpdate: v => {
				console.log(v);
				window.scroll({
					top: v,
				});
			},
		});
		*/

		/*
		setTimeout(() => {
			console.log("trying to scroll", y);
			window.scroll({
				top: y,
				behavior: "smooth", // 👈
			});
		}, 10);
		*/
		//console.log("trying to scroll", y);

		setTimeout(() => {
			scrollMotion.set(window.scrollY);
			animate(scrollMotion, y, {
				type: "tween",
				//stiffness: 650,
				//damping: 60,
				duration: 0.3,
				onUpdate: v => {
					window.scroll({
						top: v,
					});
				},
			});
		}, 10);
	};

	const scrollTileIntoView = tile => {
		const tileY = Math.round(getTileY(tile));
		const tileHeight = Math.round(getTileHeight(tile));

		//console.log("tileY", tileY, "tileHeight", tileHeight, "viewportHeight", viewportHeight, "window.scrollY", window.scrollY);
		const bottomIsBelowViewport = tileY + tileHeight > viewportHeight + window.scrollY;
		const topIsAboveViewport = tileY < window.scrollY;
		//console.log("bottomIsBelowViewport", bottomIsBelowViewport);
		//console.log("topIsAboveViewport", topIsAboveViewport);

		// above or below the viewport, update scroll position
		if (bottomIsBelowViewport) {
			//scrollWindowToY(tileY + (tileHeight - viewportHeight) / 2);
			scrollWindowToY(tileY + tileHeight + pageTop - viewportHeight);
		}
		if (topIsAboveViewport) {
			//scrollWindowToY(tileY + (tileHeight - viewportHeight) / 2);
			scrollWindowToY(tileY - pageTop);
		}
	};

	const getRowForY = y => {
		let row = false;
		const pageTop = getPageTop(currentPage);

		y = y - pageTop - pageMargin + window.scrollY;

		//console.log("getRowForY", y, pageTop, window.scrollY);

		if (y < 0) {
			//console.log("ABOVE PAGE", y, pageTop, window.scrollY);
			return false;
		}

		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
		});

		// Rows must be sorted every time, y checking assumes sorted rows
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let rowTop = 0; // Used to tally-up the row heights
		rows.forEach((r, i) => {
			// Current row's height
			let rowBottom = rowTop + (rowHeight * r.height + rowMargin * (r.height - 1));
			//console.log("mouse is over row", r, i, rowBottom, rowTop)

			if (y >= rowTop && y <= rowBottom) {
				//console.log("mouse is over row", r, i, y, rowTop, rowBottom);
				// 	return r;
				row = r;
			}
			// calculate next row y position
			rowTop += rowHeight * r.height + rowMargin * r.height;
		});

		if (y > pageTop + rowTop) {
			//console.log("BELOW PAGE", y, pageTop, window.scrollY, rowTop);
			return false;
		}

		return row;
	};

	const getRowGapForXY = (x, y) => {
		if (!x || !y) {
			x = pointerX.get();
			y = pointerY.get();
		}
		let newRowOrder = 0;
		const pageTop = getPageTop(currentPage);
		x = x - pageLeft;
		if (x < 0 || x > pageWidth) {
			//console.log("getRowGapForPointer not in x");
			return false;
		}
		y = y - pageTop + window.scrollY;
		const rows = tomeData.rows.filter(row => {
			return row.pageId === currentPage.id;
		});
		rows.sort((a, b) => (a.order > b.order ? 1 : -1));
		let rowGapTop = 0; // Used to tally-up the row heights
		rows.forEach((r, i) => {
			// Current row's height
			let rowGapBottom = rowGapTop + rowMargin;
			//console.log("getRowGapForPointer", i, y, rowGapTop, rowGapBottom);
			if (y >= rowGapTop && y <= rowGapBottom) {
				//console.log("mouse is over row gap", r, i, y);
				newRowOrder = i;
			}
			// calculate next row y position
			rowGapTop += rowHeight * r.height + rowMargin * r.height;
		});
		return newRowOrder;
	};

	const getRowAndSideForXY = (x, y) => {
		if (!x || !y) {
			x = pointerX.get();
			y = pointerY.get();
		}
		//console.log("getRowAndSideForXY", x, y);

		let direction = "left";

		const row = getRowForY(y);
		let rowGapIndex = 0;
		x = x - pageLeft;
		if (x >= pageWidth / 2) {
			direction = "right";
		}
		if (!row) {
			rowGapIndex = getRowGapForXY(x, y);
			//console.log(rowGapIndex);
			if (y >= window.innerHeight / 2) {
				direction = "bottom";
			} else {
				direction = "top";
			}
		}
		return { row: row, direction: direction, rowGapIndex: rowGapIndex };
	};

	const getTileForXY = (x, y) => {
		if (!x || !y) {
			x = pointerX.get();
			y = pointerY.get();
		}
		//console.log("getTileForXY", x, y);
		let tile = false;
		let direction = "left";
		const row = getRowForY(y);
		const tiles = tomeData.tiles.filter(t => {
			return row.id === t.rowId;
		});
		tiles.sort((a, b) => (a.order > b.order ? 1 : -1));
		x = x - pageMargin - pageLeft;
		let tW = 0;
		let tX = pageMargin;
		tiles.forEach(t => {
			tW = columnWidth * t.width + columnGutter * (t.width - 1);
			if (x >= tX && x <= tX + tW) {
				tile = t;
				if (x >= tX + tW / 2) {
					direction = "right";
				}
			}
			// Calc next tile's x position
			tX += tW + pageMargin;
		});
		if (!tile) {
			if (y >= window.innerHeight / 2) {
				direction = "bottom";
			} else {
				direction = "top";
			}
		}
		//console.log(tile.id, direction);
		return { tile: tile, direction: direction };
	};

	return (
		<MetricsContext.Provider
			value={{
				metrics,

				getTileY,
				getTileWidthForUnit,
				getTileRect,
				getTileHeight,
				getTileForXY,

				getRowForY,
				getRowGapForXY,
				getRowAndSideForXY,
				getRowRect,

				getPageTop,
				getPageHeight,
				getContentHeight,
				pageScrollY,

				scrollTileIntoView,
				scrollWindowToY,

				pointerX,
				pointerY,
				pointerInWindow,
			}}
		>
			{children}
		</MetricsContext.Provider>
	);
};
