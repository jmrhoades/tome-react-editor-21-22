import React, { useState, createContext } from "react";
import { useMotionValue } from "framer-motion";

export const TomeContext = createContext();
export const TomeProvider = ({ children }) => {
	const [sidePanelOpen, setSidePanelOpen] = useState(false);
	const [panelName, setPanelName] = useState("");

	const [addTileDropTarget, setAddTileDropTarget] = useState("");
	const [showAddTileDropTarget, setShowAddTileDropTarget] = useState("");

	

	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);

	const addTileAlpha = useMotionValue(0);

	return (
		<TomeContext.Provider
			value={{
				sidePanelOpen,
				setSidePanelOpen,
				panelName,
				setPanelName,
				addTileDropTarget,
				setAddTileDropTarget,
				dragX,
				dragY,
				addTileAlpha,
				showAddTileDropTarget,
				setShowAddTileDropTarget,
			}}
		>
			{children}
		</TomeContext.Provider>
	);
};
