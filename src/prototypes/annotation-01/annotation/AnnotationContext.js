import React, { createContext, useState } from "react";

export const AnnotationContext = createContext();

export const AnnotationColors = [
	{ name: "yellow", background: "rgba(255, 229, 0, 1)", foreground: "rgba(0, 0, 0, 1)" },
	{ name: "magenta", background: "rgba(237, 0, 235, 1)", foreground: "rgba(255, 255, 255, 0.9)" },
	{ name: "blue", background: "rgba(64, 145, 253, 1)", foreground: "rgba(255, 255, 255, 0.9)" },
	{ name: "gray", background: "rgba(107, 107, 107, 1)", foreground: "rgba(255, 255, 255, 0.9)" },
	// { name: "white", background: "rgba(255, 255, 255, 1)", foreground: "rgba(0, 0, 0, 0.9)" },
	// { name: "black", background: "rgba(0, 0, 0, 1)", foreground: "rgba(255, 255, 255, 0.9)" },
];

export const AnnotationProvider = ({ children }) => {
	const [a1State, setA1State] = useState({
		id: "a1",
		order: 1,
		direction: "left",
		text: "Is this still feeling like the right size?",
		position: { x: 190, y: 154 },
		color: "yellow",
		lineStyle: "wavy",
	});

	const [a2State, setA2State] = useState({
		id: "a2",
		order: 2,
		direction: "right",
		text: "On some displays, the distinction between the page color and viewport color disappears",
		position: { x: 30, y: 300 },
		color: "magenta",
		lineStyle: "wavy",
	});

	const [a3State, setA3State] = useState({
		id: "a3",
		order: 3,
		direction: "right",
		text: "Let's add more stars here",
		position: { x: 20, y: 20 },
		color: "blue",
		lineStyle: "wavy",
	});

	const [a4State, setA4State] = useState({
		id: "a4",
		order: 4,
		direction: "left",
		text: "Maybe we can brighten up the forest a bit, the details are getting lost",
		position: { x: 200, y: 175 },
		color: "gray",
		lineStyle: "wavy",
	});

	return (
		<AnnotationContext.Provider
			value={{
				a1State,
				setA1State,
				a2State,
				setA2State,
				a3State,
				setA3State,
				a4State,
				setA4State,
				total: 4,
			}}
		>
			{children}
		</AnnotationContext.Provider>
	);
};
