import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { debounce } from "lodash";

import { TomeContext } from "./TomeContext";

export const metricConstants = {

	cViewportWidth: 1280,
	cViewportHeight: 724,

	cPageMarginLeft: 160,
	cPageMarginRight: 160,
	cPageMarginRightPanelOpen: 336,
	cPageMinMarginY: 96,

	cPageCornerRadius: 16,
	cPagePadding: 8,

	cTileCornerRadius: 12,
	cTileMargin: 8,
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

		viewportWidth: window.innerWidth,
		viewportHeight: window.innerHeight,

		isPortrait: false,
		scale: 1,

		pageLeft: metricConstants.cPageMarginLeft,
		pageWidth: window.innerWidth - (metricConstants.cPageMarginLeft*2),
		minPageHeight: (window.innerWidth - (metricConstants.cPageMarginLeft*2)) * 9/16,
		pageTop: (window.innerHeight - ((window.innerWidth - (metricConstants.cPageMarginLeft*2)) * 9/16)) / 2,
		pageScale: 1,

		columnGrid: 12,
		columnGridUnit: 960 / 12,
		columnGridMinWidth: 2,
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
			cPageMarginLeft,
			cPageMarginRight,
			cPageMarginRightPanelOpen,
			cPageMinMarginY,
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
		if ((vH - minPageHeight) / 2 <  cPageMinMarginY) {
			minPageHeight = vH - (cPageMinMarginY*2);
			pageWidth = (16 / 9) * minPageHeight;
			pageLeft = (vW - pageWidth) / 2;
		}

		// Now that we have sizes of everything, lay them out
		const pageTop = (vH - minPageHeight) / 2;

		// Find the "scale" of the page
		let scale = pageWidth / (cViewportWidth - cPageMarginLeft - cPageMarginRight)


		const pageCornerRadius = metricConstants.cPageCornerRadius * scale;


		// Update children components with new metrics
		setMetrics({
			viewportWidth: vW,
			viewportHeight: vH,

			isPortrait: isPortrait,
			scale: scale,

			pageLeft: pageLeft,
			pageTop: pageTop,
			pageWidth: pageWidth,
			minPageHeight: minPageHeight,	
			pageScale: pageScale,
			pageCornerRadius: pageCornerRadius,


			columnGrid: 12,
			columnGridUnit: pageWidth / 12,
			columnGridMinWidth: 2,
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
