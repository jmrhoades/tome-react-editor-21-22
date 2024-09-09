import React, { createContext } from "react";
import { useMotionValue } from "framer-motion";

export const TomeContext = createContext();

export const TomeProvider = ({ children }) => {
	// Viewport Dimensions
	const viewportWidth = 375;
	const viewportHeight = 812;

	// Paging Scrollview
	const scrollY = useMotionValue(0);
	const isScrolling = useMotionValue(0);
	const currentPage = useMotionValue(0);

	// Tile Image Expanded
	const expandedTileID = useMotionValue("");
	const hideChrome = useMotionValue(0);
	const expandedTileAnimationComplete = useMotionValue(0);
	
	// Opened Annotation
	const activeAnnotationID = useMotionValue("");

	
	return (
		<TomeContext.Provider
			value={{
				viewportWidth,
				viewportHeight,
				scrollY,
				isScrolling,
				currentPage,
				expandedTileID,
				activeAnnotationID,
				hideChrome,
				expandedTileAnimationComplete,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
