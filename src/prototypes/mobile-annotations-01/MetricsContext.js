import React, { createContext } from "react";

export const MetricsContext = createContext();
export const MetricsProvider = ({ children }) => {
	return (
		<MetricsContext.Provider
			value={{
				pageHeight: 216,
			}}
		>
			{children}
		</MetricsContext.Provider>
	);
};
