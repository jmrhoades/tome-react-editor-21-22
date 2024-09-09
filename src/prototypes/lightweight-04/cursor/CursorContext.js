import React, { createContext, useState } from "react";

export const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
	const [cursorName, setCursorName] = useState("default");

	return (
		<CursorContext.Provider
			value={{
				setCursorName,
				cursorName,
			}}
		>
			{children}
		</CursorContext.Provider>
	);
};
