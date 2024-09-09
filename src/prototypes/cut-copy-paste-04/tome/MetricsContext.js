import React, { useState, createContext, useLayoutEffect, useCallback, useContext } from "react";
import { debounce } from "lodash";
import { TomeContext } from "./TomeContext";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { transitions } from "../../../ds/Transitions";
export const metricConstants = {
	cViewportWidth: 1440,
	cViewportHeight: 720,

	cPageWidth: 960,

	cPageMarginLeft: 240,
	cPageMarginLeftPanelOpen: 144,
	cPageMarginRight: 240,
	cPageMarginRightPanelOpen: 336,
	cPageMinMarginY: 160,
	cPageMinY: 96,

	cPresentModeMargin: 60,

	cPanelWidth: 240,

	cColumnCount: 12,
	cColumnMinWidth: 2,
	cColumnMaxWidth: 10,

	cRowCount: 12,
	cRowMinHeight: 1,
	cRowDefaultHeight: 6,

	cPageMargin: 12,
	cColumnGutter: 12,
	cRowMargin: 12,
	cTileCornerRadius: 12,
	cPageCornerRadius: 24,

	cTileBorderSize: 2.5,
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
	const tempPageTop = useMotionValue(0);
	const tempPageHeight = useMotionValue(0);

	const windowWidth = useMotionValue(window.innerWidth);
	const windowHeight = useMotionValue(window.innerHeight);

	const windowWidthRange = [480, 176 * 12];
	const windowHeightRange = [480, 106 * 12];
	const marginHRange = [122, 20 * 12];
	const marginVRange = [64, 20 * 12];
	const marginH = useTransform(windowWidth, windowWidthRange, marginHRange);
	const marginV = useTransform(windowHeight, windowHeightRange, marginVRange);
	const scrollMotion = useMotionValue(window.scrollY);

	const { cPageMarginLeftPanelOpen, cPageMarginRightPanelOpen } = metricConstants;

	const getMetrics = sidePanelOpen => {
		windowWidth.set(window.innerWidth);
		windowHeight.set(window.innerHeight);
		let pageWidth = Math.round(window.innerWidth - Math.round(marginH.get() * 2));
		if (sidePanelOpen) {
			pageWidth = Math.round(window.innerWidth - cPageMarginLeftPanelOpen - cPageMarginRightPanelOpen);
		}

		let pageHeight = Math.round((9 / 16) * pageWidth);
		if ((window.innerHeight - pageHeight) / 2 <= marginV.get()) {
			pageHeight = Math.round(window.innerHeight - Math.round(marginV.get() * 2));
			pageWidth = Math.round((16 / 9) * pageHeight);
		}

		if (sidePanelOpen) {
			//cPageMarginLeftPanelOpen
		}

		let minPageHeight = (9 / 16) * pageWidth;
		let pageTop = (window.innerHeight - minPageHeight) / 2;
		let pageLeft = sidePanelOpen ? cPageMarginLeftPanelOpen : (window.innerWidth - pageWidth) / 2;

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
		} = metricConstants;

		// Set layout orientation based on viewport aspect ratio
		// Always set to landscape layout for now
		let isPortrait = false; // vW < vH; turn off for now

		// Find the "scale" of the page
		// let scale = isPortrait ? vH / cViewportHeight : vW / cViewportWidth;
		let pageScale = 1;

		// Find the "scale" of the page
		let scale = pageWidth / cPageWidth;

		const pageCornerRadius = cPageCornerRadius * scale;
		const tileCornerRadius = cTileCornerRadius * scale;
		const tileBorderSize = cTileBorderSize * scale;

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
		tempPageHeight.set(pageHeight);

		// pageHeight += getPageTop(page);
		return pageHeight;
	};

	const getPageTop = page => {
		// Find the page height
		let dPageTop = pageTop;
		let pageHeight = getPageHeight(page);
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
		if (rowResizing) {
			dPageTop = tempPageTop.get();
		} else {
			tempPageTop.set(dPageTop);
		}

		return dPageTop;
	};

	const getTileWidth = tile => {
		let tileWidth = columnWidth * tile.width + columnGutter * (tile.width - 1);
		return tileWidth;
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

	const getRowForY = (y) => {

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
			rowGapIndex = getRowGapForXY(x,y);
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
				scrollWindowToY,
				getPageTop,
				getPageHeight,
				getTileHeight,
				getTileRect,
				scrollTileIntoView,
				pointerX,
				pointerY,
				pointerInWindow,
				getRowForY,
				getTileForXY,
				getRowGapForXY,
				getRowAndSideForXY,
			}}
		>
			{children}
		</MetricsContext.Provider>
	);
};
