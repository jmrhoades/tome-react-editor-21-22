import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { debounce } from "lodash";

import { TomeContext } from "./TomeContext";

export const metricConstants = {
	cViewportWidth: 1280,
	cViewportHeight: 724,

	cPageCornerRadius: 20,
	cPagePadding: 8,
	cTileCornerRadius: 12,
	cTileMargin: 8,

	cPageMinMarginX: 32,
	cPageMinMarginXPanelOpen: 334,
	cPageMinMarginY: 124,

	cTileHalfSize: 480,
	cTileBorderSize: 2,

	cPresentModeMargin: 60,
	cPageThumbnailWidth: 80,
	cPageThumbnailHeight: 40,

	cPanelWidth: 240,
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

export const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
	const { sidePanelOpen } = useContext(TomeContext);

	const viewport = useViewport(0);
	const [metrics, setMetrics] = useState({
		viewportWidth: 0,
		viewportHeight: 0,
		scale: 0,
		pageWidth: 0,
		pageHeight: 0,
		pageLeft: 0,
		pageTop: 0,
		pageCornerRadius: 0,
		tileHalfSize: 0,
		tileCornerRadius: 0,
		tileTop: 0,
		tile1Left: 0,
		tile2Left: 0,
	});

	const updateMetrics = useCallback(() => {
		/*
		Find the scale value by dividing the actual viewport size by the canonical viewport size
		Check if the calculated page height times the scale value is bigger than the minimum viewport margins in either dimension, if so, adjust the scale
		Use the adjusted scale to determine the layout metrics
		*/

		// Get viewport dimensions
		const vW = viewport.width;
		const vH = viewport.height;

		const {
			cViewportWidth,
			cViewportHeight,
			cTileHalfSize,
			cTileMargin,
			cTileCornerRadius,
			cPagePadding,
			cPageCornerRadius,
			cPageMinMarginX,
			cPageMinMarginXPanelOpen,
			cPageMinMarginY,
		} = metricConstants;

		// Set layout orientation based on viewport aspect ratio
		// Always set to landscape layout for now
		let isPortrait = false; // vW < vH; turn off for now

		// Find the "scale" of the page
		let scale = isPortrait ? vH / cViewportHeight : vW / cViewportWidth;

		// Adjust viewport width if panel is open
		const pageMargins = sidePanelOpen ? cPageMinMarginX + cPageMinMarginXPanelOpen : cPageMinMarginX + cPageMinMarginX;

		// Adjust for minimum margins
		let pW = cTileHalfSize * 2 + cTileMargin + cPagePadding * 2;
		let pH = cTileHalfSize + cPagePadding * 2;
		if (vW - pW * scale < pageMargins) {
			console.log("adjust scale for x margin");
			scale = (vW - pageMargins) / pW;
		}
		if ((vH - pH * scale) / 2 < cPageMinMarginY) {
			scale = (vH - cPageMinMarginY * 2) / pH;
			console.log("adjust scale for y margin");
		}

		// Tile
		// metrics using canonical sizes multiplied by new scale
		const tileHalfSize = Math.round(cTileHalfSize * scale);
		const tileMargin = Math.round(cTileMargin * scale);
		const tileCornerRadius = Math.round(cTileCornerRadius * scale);

		// Page
		// metrics found from tile size
		const pagePadding = Math.round(cPagePadding * scale);
		const pageWidth = tileHalfSize * 2 + tileMargin + pagePadding * 2;
		const pageHeight = tileHalfSize + pagePadding * 2;
		const pageCornerRadius = Math.round(cPageCornerRadius * scale);

		// Now that we have sizes of everything, lay them out

		// Page position
		let pageLeft = (vW - pageWidth) / 2;
		if (sidePanelOpen) {
			pageLeft = cPageMinMarginX;
		}
		const pageTop = (vH - pageHeight) / 2;

		// Tile Positions
		const tileTop = pageTop + tileMargin;
		const tile1Left = pageLeft + tileMargin;
		const tile2Left = tile1Left + tileMargin + tileHalfSize;

		// Update children components with new metrics
		setMetrics({
			viewportWidth: vW,
			viewportHeight: vH,

			isPortrait: isPortrait,
			scale: scale,

			tileHalfSize: tileHalfSize,
			tileMargin: tileMargin,
			tileCornerRadius: tileCornerRadius,
			tileTop: tileTop,
			tile1Left: tile1Left,
			tile2Left: tile2Left,

			pagePadding: pagePadding,
			pageWidth: pageWidth,
			pageHeight: pageHeight,
			pageCornerRadius: pageCornerRadius,
			pageLeft: pageLeft,
			pageTop: pageTop,
		});
	}, [viewport, sidePanelOpen]);

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
