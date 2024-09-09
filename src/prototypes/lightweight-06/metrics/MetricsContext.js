import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { transform } from "framer-motion";
import { debounce, clamp } from "lodash";

import { TomeContext, editorStates } from "../tome/TomeContext";

export const metricConstants = {
	cViewportWidth: 1280,
	cViewportHeight: 724,
	cPageWidth: 1022,
	cPageHeight: 510,
	cPageRadius: 0,
	cMarginLeft: 129,
	cMarginRight: 129,
	cMarginY: 96,
	cTileHeight: 510,
	cTilePadding: 30,
	cTileRadius: 16,
	cTileRadiusInside: 0,
	cTileMargin: 2,
	cPanelWidth: 240,
	cPanelRight: 64,
	cMarginRightPanelOpen: 336,
	cPresentModeMargin: 60,
	cPageThumbnailWidth: 72,
	cPageThumbnailHeight:  36,
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
	const { editorState, showComments } = useContext(TomeContext);
	const viewport = useViewport(0);
	const [metrics, setMetrics] = useState({
		isPortrait: false,
		scale: 1,
		viewportWidth: viewport.width,
		viewportHeight: viewport.height,
		pageWidth: metricConstants.cPageWidth,
		pageHeight: metricConstants.cPageHeight,
		pageOffsetX: 0,
		pageCornerRadius: metricConstants.cPageRadius,
		tileWidth: metricConstants.cTileHeight,
		tileHeight: metricConstants.cTileHeight,
		tileCornerRadiusOutside: metricConstants.cTileRadius,
		tileCornerRadiusInside: metricConstants.cTileRadiusInside,
		tilePadding: metricConstants.cTilePadding,
		fontSizeH1: 26,
		fontSizeP: 20,
		marginBottomH1: 16,
		marginBottomP: 16,
	});

	const updateMetrics = useCallback(() => {
		const vW = viewport.width;
		const vH = viewport.height;

		const cPageWidth = metricConstants.cPageWidth;
		const cPageHeight = metricConstants.cPageHeight;

		// Orientation & Aspect Ratios
		let isPortrait = false; // vW < vH; turn off for now

		const landscapeRatio = cPageHeight / cPageWidth;
		const portraitRatio = cPageWidth / cPageHeight;
		const pageHeightRatio = isPortrait ? portraitRatio : landscapeRatio;

		// Scaling Margins
		// these margins are used to find the width and height of the page
		/*
		const maxWidth = 2000;
		let marginLeft = transform(
			vW,
			[1440, maxWidth],
			[metricConstants.cMarginLeft, metricConstants.cMarginRightPanelOpen]
		);
		let marginRight = panelOpen
			? metricConstants.cMarginRightPanelOpen
			: transform(vW, [768, maxWidth], [80, metricConstants.cMarginRightPanelOpen]);
		if (permission === permissions.COMMENT_ONLY) {
			marginLeft = metricConstants.cMarginLeft;
			marginRight = transform(vW, [768, 1280], [36, metricConstants.cPresentModeMargin]);
		}
		
		*/

		// Scale
		// used to determine corner radius, padding, overlay & text sizes

		let scale = isPortrait ? vH / metricConstants.cViewportHeight : vW / metricConstants.cViewportWidth;

		let marginLeft = clamp(Math.round(metricConstants.cMarginLeft * scale), 64, 200);
		let marginRight = clamp(Math.round(metricConstants.cMarginRight * scale), 64, 200);
		let marginY = metricConstants.cMarginY;
		let offsetX = 0;

		if (showComments) {
			offsetX = -164;
			marginLeft = 32;
			marginRight = 376;
		}

		if (editorState === editorStates.FULLSCREEN) {
			marginLeft = metricConstants.cPresentModeMargin;
			marginRight = metricConstants.cPresentModeMargin;
			marginY = 0;
		}

		// Page Width & Height
		// assumes landscape orientation
		let pW = vW - marginLeft - marginRight;
		let pH = pW * pageHeightRatio;
		// adjust dimensions if page is too tall for the viewport
		// constrain height, apply inverse aspect ratio to height to get new width
		if (pH > vH - marginY * 2) {
			pH = vH - marginY * 2;
			pW = pH * portraitRatio;
		}
		// if portrait, constrain height to viewport height
		// get width by applying landscape ratio to height
		if (isPortrait) {
			pH = vH - marginY * 2;
			pW = pH * landscapeRatio;
			// adjust dimensions if page is too wide for the viewport
			// constrain width, apply inverse aspect ratio to width to get new height
			if (pW > vW - marginLeft - marginRight) {
				pW = vW - marginLeft - marginRight;
				pH = pW * portraitRatio;
			}
		}

		// Page X
		// page is always centered by parent container
		// convoluted logic for centering the page between the margins relative to viewport center
		// console.log(marginLeft, marginRight)
		// let offsetX = marginLeft > marginRight ? (marginLeft - marginRight) / 2 : (marginRight - marginLeft) / 2;
		// if (panelOpen) offsetX = (marginLeft - marginRight) / 2;
		
		
		let pX = editorState === editorStates.FULLSCREEN ? 0 : offsetX;

		// Scale
		// used to determine corner radius, padding, overlay & text sizes
		scale = isPortrait ? pH / cPageWidth : pW / cPageWidth;

		// Tile height, corner radius & padding
		const tPadding = Math.round(metricConstants.cTilePadding * scale);
		const tRadius = Math.round(metricConstants.cTileRadius * scale);
		const tRadiusInside = Math.round(metricConstants.cTileRadiusInside * scale);
		const tMargin = clamp(Math.round(metricConstants.cTileMargin * scale), 2, 8);
		const tHeight = Math.round(((isPortrait ? pH : pW) - tMargin) / 2);
		const tSelectionBorderSize = clamp(Math.round(metricConstants.cTileMargin * scale), 1, 2);
		//const tSelectionBorderSize = 1;

		// Overlay sizing
		const overlaySize = transform(scale, [0.1, 1, 3], [32, 72, 108]);
		const overlayMargin = 20 * scale;

		// Typography
		const fontSizeH1 = 33 * scale;
		const fontSizeP = 22 * scale;
		const marginBottomH1 = 16 * scale;
		const marginBottomP = 16 * scale;

		setMetrics({
			isPortrait: isPortrait,
			scale: scale,
			viewportWidth: vW,
			viewportHeight: vH,
			pageWidth: Math.round(pW),
			pageHeight: Math.round(pH),
			pageLeft: Math.round(pX),
			tileWidth: tHeight,
			tileHeight: tHeight,
			tileCornerRadiusOutside: tRadius,
			tileCornerRadiusInside: tRadiusInside,
			tilePadding: tPadding,
			tileSelectionBorderSize: tSelectionBorderSize,
			overlaySize: overlaySize,
			overlayMargin: overlayMargin,
			fontSizeH1: fontSizeH1,
			fontSizeP: fontSizeP,
			marginBottomH1: marginBottomH1,
			marginBottomP: marginBottomP,
		});
	}, [viewport, editorState, showComments]);

	useEffect(() => {
		updateMetrics();
	}, [editorState, viewport, updateMetrics, showComments]);

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
