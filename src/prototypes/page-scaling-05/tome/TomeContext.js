/* eslint-disable */
import React, { useState, createContext, useEffect } from "react";
import { transform } from "framer-motion";
import { debounce } from "lodash";

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
	cMarginLeft: 140,
	cMarginRight: 140,
	cMarginRightPanelOpen: 336,
	cPresentModeMargin: 60,
};

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	const [editorState, setEditorState] = useState("editing");

	const [panelOpen, setPanelOpen] = useState(false);
	const [panelName, setPanelName] = useState("");

	const [metrics, setMetrics] = useState({
		isPortrait: false,
		scale: 1,
		viewportWidth: 1280,
		viewportHeight: 772,
		pageWidth: 772,
		pageHeight: 394,
		pageOffsetX: 0,
		pageCornerRadius: 24,
		pagePadding: 16,
		tileWidth: 362,
		tileHeight: 362,
		tileCornerRadius: 12,
		tilePadding: 16,
	});

	const layoutTransition = {
		type: "spring",
		stiffness: 550,
		damping: 50,
	};

	const panelTransition = {
		type: "spring",
		stiffness: 550,
		damping: 50,
	};

	const defaultSpring = {
		type: "spring",
		stiffness: 550,
		damping: 30,
	};

	const updateMetrics = () => {
		const viewport = document.getElementById("viewport").getBoundingClientRect();
		const vW = viewport.width;
		const vH = viewport.height;

		const cPageWidth = metricConstants.cPageWidth;
		const cPageHeight = metricConstants.cPageHeight;

		// Orientation & Aspect Ratios
		let isPortrait = vW < vH;
		isPortrait = false; // Turn this off for now
		const landscapeRatio = cPageHeight / cPageWidth;
		const portraitRatio = cPageWidth / cPageHeight;
		const pageHeightRatio = isPortrait ? portraitRatio : landscapeRatio;

		let marginY = 80;

		// Page Width & Height
		// assumes landscape orientation, min 768w viewport
		let pW = panelOpen
			? transform(vW, [768, 1280, 1440, 2560], [292, 772, 772, 1888])
			: transform(vW, [768, 1280, 1440, 2560], [456, 772, 772, 1888]);
		// Presenting mode margins
		if (editorState === "presenting") {
			pW = vW - metricConstants.cPresentModeMargin * 2;
			marginY = 0;
		}
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
		}

		// Page X Offset
		// page is always centered by parent container
		const shouldOffset = (vW - pW) / 2 < 334;
		let pOffsetX = 0;
		if (panelOpen && shouldOffset && editorState !== "presenting") {
			// center page within the space between the outline and the panel
            pOffsetX = -168;
		}

		// Page scale
		// this scale is used to set corner radius, padding, and overlay sizes
		const scale = isPortrait ? pH / cPageWidth : pW / cPageWidth;

		// Page Radius and Padding
		const pRadius = Math.round(metricConstants.cPageRadius * scale);
		const pPadding = Math.round(metricConstants.cTileMargin * scale);

		// Tile Radius and Height
		const tRadius = Math.round(metricConstants.cTileRadius * scale);
		const tHeight = Math.round(((isPortrait ? pH : pW) - pPadding * 3) / 2);

		setMetrics({
			isPortrait: isPortrait,
			scale: scale,
			viewportWidth: vW,
			viewportHeight: vH,
			pageWidth: Math.round(pW),
			pageHeight: Math.round(pH),
			pageOffsetX: pOffsetX,
			pageCornerRadius: pRadius,
			pagePadding: pPadding,
			tileWidth: tHeight,
			tileHeight: tHeight,
			tileCornerRadius: tRadius,
			tilePadding: pPadding,
		});
	};

	useEffect(() => {
		updateMetrics();
	}, [editorState, panelOpen]);

	useEffect(() => {
		const throttledResize = debounce(() => {
			updateMetrics();
		}, 100);
		window.addEventListener("resize", throttledResize);
		return () => {
			window.removeEventListener("resize", throttledResize);
		};
	});

	return (
		<TomeContext.Provider
			value={{
				editorState,
				setEditorState,
				panelOpen,
				setPanelOpen,
				panelName,
				setPanelName,
				metrics,
				layoutTransition,
				defaultSpring,
				panelTransition,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
