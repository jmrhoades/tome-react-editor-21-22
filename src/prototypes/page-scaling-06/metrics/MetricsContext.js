import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { transform } from "framer-motion";
import { debounce } from "lodash";

import { TomeContext, permissions } from "../tome/TomeContext";

export const metricConstants = {
	cViewportWidth: 1280,
	cPageWidth: 772,
	cPageHeight: 394,
	cPageRadius: 24,
	cTileHeight: 362,
	cTileRadius: 12,
	cTileMargin: 16,
	cPanelWidth: 240,
	cPanelRight: 64,
	cMarginLeft: 160,
	cMarginRight: 160,
	cMarginRightPanelOpen: 336,
	cPresentModeMargin: 60,
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
	const { panelOpen, editorState, permission } = useContext(TomeContext);
    const viewport = useViewport(100);
	const [metrics, setMetrics] = useState({
		isPortrait: false,
		scale: 1,
		viewportWidth: viewport.width,
		viewportHeight:  viewport.height,
		pageWidth: 772,
		pageHeight: 394,
		pageOffsetX: 0,
		pageCornerRadius: 24,
		pagePadding: 16,
		tileWidth: 362,
		tileHeight: 362,
		tileCornerRadius: 12,
		tilePadding: 16,
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
            marginRight = transform(
                vW,
                [768, 1280],
                [36, metricConstants.cPresentModeMargin]
            );
        }
		let marginY = 80;
		if (editorState === "presenting") {
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
		let offsetX = marginLeft > marginRight ? (marginLeft - marginRight) / 2 : (marginRight - marginLeft) / 2;
		if (panelOpen) offsetX = (marginLeft - marginRight) / 2;
		let pX = editorState === "presenting" ? 0 : offsetX;

		// Scale
		// used to determine corner radius, padding, overlay & text sizes
		const scale = isPortrait ? pH / cPageWidth : pW / cPageWidth;

		// Page corner radius & padding
		const pRadius = Math.round(metricConstants.cPageRadius * scale);
		const pPadding = Math.round(metricConstants.cTileMargin * scale);

		// Tile corner radius and height
		const tRadius = Math.round(metricConstants.cTileRadius * scale);
		const tHeight = Math.round(((isPortrait ? pH : pW) - pPadding * 3) / 2);

        // Overlay sizing
        const overlaySize = transform(scale, [0.1, 1, 3], [32, 64, 108])
	    const overlayMargin = 26 * scale;

		// Typography
		const fontSizeH1 = 26 * scale;
		const fontSizeP = 20 * scale;
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
			pageCornerRadius: pRadius,
			pagePadding: pPadding,
			tileWidth: tHeight,
			tileHeight: tHeight,
			tileCornerRadius: tRadius,
			tilePadding: pPadding,
            overlaySize: overlaySize,
            overlayMargin: overlayMargin,
			fontSizeH1: fontSizeH1,
			fontSizeP: fontSizeP,
			marginBottomH1: marginBottomH1,
			marginBottomP: marginBottomP,
		});
	}, [viewport, editorState, panelOpen, permission]);


	useEffect(() => {
		updateMetrics();
	}, [editorState, panelOpen, permission, viewport, updateMetrics]);


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
