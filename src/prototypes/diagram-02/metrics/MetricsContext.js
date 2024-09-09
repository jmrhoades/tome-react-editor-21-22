import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { transform } from "framer-motion";
import { debounce } from "lodash";

import { TomeContext } from "../tome/TomeContext";

export const colors = {
	z0: "hsl(0, 0%, 4%)",
	z1: "hsl(0, 0%, 8%)",
	z2: "hsl(0, 0%, 12%)",
	z3: "hsl(0, 0%, 16%)",
	z4: "hsl(0, 0%, 20%)",
	z5: "hsl(0, 0%, 24%)",
	accent: "hsl(301, 100%, 46%)",

	pageBackground: "hsl(0, 0%, 8%)",
	tileBackground: "hsl(0, 0%, 8%)",
	diagramBackground: "hsl(0, 0%, 10%)",
	nullTileBackground: "hsl(0, 0%, 12%)",
	pageThumbnailSelectedBackground: "hsl(0, 0%, 17%)",
	selectionRectBackground: "hsla(301, 100%, 46%, 0.05)",
};

/*
Find the scale value by dividing the actual viewport size by the canonical viewport size
Check if the calculated page height times the scale value is bigger than the minimum viewport margins in either dimension, if so, adjust the scale
Use the adjusted scale to determine the layout metrics
*/

export const metricConstants = {
	cViewportWidth: 1280,
	cViewportHeight: 724,

	cPageCornerRadius: 20,
	cPagePadding: 8,
	cTileCornerRadius: 12,
	cTileMargin: 8,

	cPageMinMarginX: 64,
	cPageMinMarginY: 124,

	cTileHalfSize: 480,

	cTileBorderSize: 2,

	cPresentModeMargin: 60,
	cPageThumbnailWidth: 80,
	cPageThumbnailHeight: 40,

	cTextTilePadding: 24,
};

const useViewport = (delay = 700) => {
	// Use window as viewport for now, but div w/ id #viewport is also an option
	// const viewport = document.getElementById("viewport").getBoundingClientRect();
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
	const { panelOpen, showComments } = useContext(TomeContext);
	const viewport = useViewport(0);
	const [metrics, setMetrics] = useState({
		viewportWidth: viewport.width,
		viewportHeight: viewport.height,

		isPortrait: false,
		scale: 1,

		tileHalfSize: metricConstants.cTileHalfSize,
		tileMargin: metricConstants.cTileMargin,
		tileCornerRadius: metricConstants.cTileCornerRadius,
		tileBorderSize: metricConstants.cTileBorderSize,

		pagePadding: 12,
		pageWidth: 984,
		pageHeight: 496,
		pageCornerRadius: 20,
		pageOffsetX: 0,

		overlaySize: 32,
		overlayMargin: 16,

		textTilePadding: 20,
		fontSizeH1: 36,
		fontSizeP: 20,
		marginBottomH1: 16,
		marginBottomP: 16,

		colors: colors,
	});

	const updateMetrics = useCallback(() => {
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
			cPageMinMarginY,
			cTileBorderSize,
			cTextTilePadding,
		} = metricConstants;

		// Orientation & Aspect Ratios
		let isPortrait = false; // vW < vH; turn off for now

		// Scale
		let vPW = cViewportWidth;
		let vPH = cViewportHeight;
		let pageOffsetX = 0;
		if (showComments || panelOpen) {
			// vPW = cViewportWidth + 80;
			// pageOffsetX = -150;
		}
		let scale = isPortrait ? vH / vPH : vW / vPW;

		// Adjust for minimum margins
		let pW = cTileHalfSize * 2 + cTileMargin + cPagePadding * 2;
		let pH = cTileHalfSize + cPagePadding * 2;
		if ((vW - pW * scale) / 2 < cPageMinMarginX) {
			// console.log("adjust scale for x margin");
		}
		if ((vH - pH * scale) / 2 < cPageMinMarginY) {
			scale = (vH - cPageMinMarginY * 2) / pH;
			// console.log("adjust scale for y margin");
		}

		// Tile
		const tileHalfSize = Math.round(cTileHalfSize * scale);
		const tileMargin = Math.round(cTileMargin * scale);
		const tileCornerRadius = Math.round(cTileCornerRadius * scale);
		// const tileBorderSize = clamp(Math.round(cTileBorderSize * scale), 1, 3);
		const tileBorderSize = cTileBorderSize;
		const textTilePadding = Math.round(cTextTilePadding * scale);

		// Page
		const pagePadding = Math.round(cPagePadding * scale);
		const pageWidth = tileHalfSize * 2 + tileMargin + pagePadding * 2;
		const pageHeight = tileHalfSize + pagePadding * 2;
		const pageCornerRadius = Math.round(cPageCornerRadius * scale);

		// Overlay sizing
		const overlaySize = transform(scale, [0.1, 1, 3], [32, 72, 108]);
		const overlayMargin = 20 * scale;

		// Typography
		const fontSizeH1 = 37 * scale;
		const fontSizeP = 22 * scale;
		const marginBottomH1 = 16 * scale;
		const marginBottomP = 16 * scale;

		setMetrics({
			viewportWidth: vW,
			viewportHeight: vH,

			isPortrait: isPortrait,
			scale: scale,

			tileHalfSize: tileHalfSize,
			tileMargin: tileMargin,
			tileCornerRadius: tileCornerRadius,
			tileBorderSize: tileBorderSize,

			pagePadding: pagePadding,
			pageWidth: pageWidth,
			pageHeight: pageHeight,
			pageCornerRadius: pageCornerRadius,
			pageOffsetX: pageOffsetX,

			overlaySize: overlaySize,
			overlayMargin: overlayMargin,

			textTilePadding: textTilePadding,
			fontSizeH1: fontSizeH1,
			fontSizeP: fontSizeP,
			marginBottomH1: marginBottomH1,
			marginBottomP: marginBottomP,

			colors: colors,
		});
	}, [viewport, panelOpen, showComments]);

	useEffect(() => {
		updateMetrics();
	}, [viewport, panelOpen, showComments, updateMetrics]);

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
