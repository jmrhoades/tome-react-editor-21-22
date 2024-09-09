import React, { useState, createContext, useEffect } from "react";
import { useMotionValue } from "framer-motion";

export const diagramTools = {
	PAN: "DiagramPan",
	ADD_SHAPE: "DiagramShapeRectangle",
	ADD_CONNECTOR: "DiagramConnectorA",
};

export const diagramObjects = {
	SHAPE: "Shape",
	CONNECTOR: "Connector",
};

export const diagramToolbarStates = {
	CHOOSE_TOOL: "ChooseTool",
	CHOOSE_SHAPE: "ChooseShape",
	CHOOSE_CONNECTOR: "ChooseConnector",
};

export const diagramShapeOptions = {
	RECTANGLE: "DiagramShapeRectangle",
	CIRCLE: "DiagramShapeCircle",
	DIAMOND: "DiagramShapeDiamond",
	PARALLELOGRAM: "DiagramShapeParallelogram",
	CYLINDER: "DiagramShapeCylinder",
	CLOUD: "DiagramShapeCloud",
};

export const diagramConnectorOptions = {
	START_CAP_ARROW: "DiagramConnectorStartCapArrow",
	START_CAP_DOT: "DiagramConnectorStartCapDot",
	END_CAP_ARROW: "DiagramConnectorEndCapArrow",
	END_CAP_DOT: "DiagramConnectorEndCapDot",
	LINE_SOLID: "DiagramConnectorLineSolid",
	LINE_DOTTED: "DiagramConnectorLineDotted",
};

export const diagramConnectors = {
	DOT_ARROW_SOLID: "DiagramConnectorDotArrowSolid",
	DOT_DOT_SOLID: "DiagramConnectorDotDotSolid",
	ARROW_ARROW_SOLID: "DiagramConnectorArrowArrowSolid",
	ARROW_DOT_SOLID: "DiagramConnectorArrowDotSolid",
	DOT_ARROW_DOTTED: "DiagramConnectorDotArrowDotted",
	DOT_DOT_DOTTED: "DiagramConnectorDotDotDotted",
	ARROW_ARROW_DOTTED: "DiagramConnectorArrowArrowDotted",
	ARROW_DOT_DOTTED: "DiagramConnectorArrowDotDotted",
};

// export const diagramColors = {
// 	GRAY1: "rgba(155, 160, 170, 1)",
// 	GRAY2: "rgba(79, 81, 85, 1)",
// 	ORANGE: "rgba(198, 97, 73, 1)",
// 	GREEN: "rgba(62, 142, 84, 1)",
// 	BLUE: "rgba(53, 135, 169, 1)",
// 	PURPLE: "rgba(151, 101, 216, 1)",
// 	PINK: "rgba(189, 85, 187, 1)",
// 	RED: "rgba(208, 85, 108, 1)",
// };

export const diagramColors = [
	{
		name: "Red",
		value: "rgba(235, 77, 61, 1)",
		label: "rgba(0, 0, 0, 0.9)",
	},
	{
		name: "Yellow",
		value: "rgba(251, 231, 84, 1)",
		label: "rgba(0, 0, 0, 0.9)",
	},
	{
		name: "Green",
		value: "rgba(101, 219, 125, 1)",
		label: "rgba(0, 0, 0, 0.9)",
	},
	{
		name: "Blue",
		value: "rgba(71, 146, 243, 1)",
		label: "rgba(0, 0, 0, 0.9)",
	},
	{
		name: "Purple",
		value: "rgba(178, 96, 234, 1)",
		label: "rgba(0, 0, 0, 0.9)",
	},
	{
		name: "Gray",
		value: "rgba(156, 160, 169, 1)",
		label: "rgba(0, 0, 0, 0.9)",
	},
];

export const DiagramContext = createContext();
export const DiagramProvider = ({ children }) => {
	const [diagramToolbarState, setDiagramToolbarState] = useState(diagramToolbarStates.CHOOSE_TOOL);
	const [activeDiagramTool, setActiveDiagramTool] = useState(null);
	const [lastSelectedDiagramShapeTool, setLastSelectedDiagramShapeTool] = useState(diagramShapeOptions.RECTANGLE);
	const [lastSelectedDiagramConnectorTool, setLastSelectedDiagramConnectorTool] = useState(
		diagramConnectors.DOT_ARROW_SOLID
	);

	const [lastSelectedDiagramConnectorStartCap, setLastSelectedDiagramConnectorStartCap] = useState(
		diagramConnectorOptions.START_CAP_DOT
	);
	const [lastSelectedDiagramConnectorEndCap, setLastSelectedDiagramConnectorEndCap] = useState(
		diagramConnectorOptions.END_CAP_ARROW
	);
	const [lastSelectedDiagramConnectorLineStyle, setLastSelectedDiagramConnectorLineStyle] = useState(
		diagramConnectorOptions.LINE_SOLID
	);

	const canvasScale = useMotionValue(1);

	const [diagramExpanded, setDiagramExpanded] = useState(false);

	const [isDragSelecting, setIsDragSelecting] = useState(false);

	const [diagramShape1Data, setDiagramShape1Data] = useState({
		id: "shape1",
		type: diagramObjects.SHAPE,
		geometry: diagramShapeOptions.RECTANGLE,
		label: "Observe",
		labelVisible: true,
		color: diagramColors[3],
		x: 900,
		y: 762,
		width: 120,
		height: 72,
		connectorLeft: true,
		connectorRight: true,
		connectorBottom: false,
	});

	const [diagramShape2Data, setDiagramShape2Data] = useState({
		id: "shape2",
		type: diagramObjects.SHAPE,
		geometry: diagramShapeOptions.PARALLELOGRAM,
		label: "Design",
		labelVisible: true,
		color: diagramColors[2],
		x: 1044,
		y: 906,
		width: 120,
		height: 96,
		connectorLeft: false,
		connectorRight: false,
		connectorBottom: true,
	});

	const [diagramShape3Data, setDiagramShape3Data] = useState({
		id: "shape3",
		type: diagramObjects.SHAPE,
		geometry: diagramShapeOptions.CIRCLE,
		label: "Build",
		labelVisible: true,
		color: diagramColors[0],
		x: 912,
		y: 1062,
		width: 96,
		height: 96,
		connectorLeft: true,
		connectorRight: true,
		connectorBottom: false,
	});

	const [diagramShape4Data, setDiagramShape4Data] = useState({
		id: "shape4",
		type: diagramObjects.SHAPE,
		geometry: diagramShapeOptions.DIAMOND,
		label: "Test",
		labelVisible: true,
		color: diagramColors[4],
		x: 756,
		y: 892,
		width: 120,
		height: 120,
		connectorLeft: false,
		connectorRight: false,
		connectorBottom: true,
	});

	const [selectedShapeData, setSelectedShapeData] = useState(null);

	const panX = useMotionValue(0);
	const panY = useMotionValue(0);

	// Reset toolbar each time the tile is re-selected
	useEffect(() => {
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_DOT &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_ARROW &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_SOLID
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.DOT_ARROW_SOLID);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_ARROW &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_ARROW &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_SOLID
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.ARROW_ARROW_SOLID);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_DOT &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_DOT &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_SOLID
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.DOT_DOT_SOLID);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_ARROW &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_DOT &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_SOLID
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.ARROW_DOT_SOLID);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_DOT &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_ARROW &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_DOTTED
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.DOT_ARROW_DOTTED);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_ARROW &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_ARROW &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_DOTTED
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.ARROW_ARROW_DOTTED);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_DOT &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_DOT &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_DOTTED
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.DOT_DOT_DOTTED);
		}
		if (
			lastSelectedDiagramConnectorStartCap === diagramConnectorOptions.START_CAP_ARROW &&
			lastSelectedDiagramConnectorEndCap === diagramConnectorOptions.END_CAP_DOT &&
			lastSelectedDiagramConnectorLineStyle === diagramConnectorOptions.LINE_DOTTED
		) {
			setLastSelectedDiagramConnectorTool(diagramConnectors.ARROW_DOT_DOTTED);
		}
	}, [
		lastSelectedDiagramConnectorStartCap,
		lastSelectedDiagramConnectorEndCap,
		lastSelectedDiagramConnectorLineStyle,
		setLastSelectedDiagramConnectorTool,
	]);

	return (
		<DiagramContext.Provider
			value={{
				diagramToolbarState,
				setDiagramToolbarState,
				activeDiagramTool,
				setActiveDiagramTool,
				lastSelectedDiagramShapeTool,
				setLastSelectedDiagramShapeTool,
				lastSelectedDiagramConnectorTool,
				setLastSelectedDiagramConnectorTool,
				lastSelectedDiagramConnectorStartCap,
				setLastSelectedDiagramConnectorStartCap,
				lastSelectedDiagramConnectorEndCap,
				setLastSelectedDiagramConnectorEndCap,
				lastSelectedDiagramConnectorLineStyle,
				setLastSelectedDiagramConnectorLineStyle,
				canvasScale,
				isDragSelecting,
				setIsDragSelecting,
				diagramShape1Data,
				setDiagramShape1Data,
				diagramShape2Data,
				setDiagramShape2Data,
				diagramShape3Data,
				setDiagramShape3Data,
				diagramShape4Data,
				setDiagramShape4Data,
				selectedShapeData,
				setSelectedShapeData,
				panX,
				panY,
				diagramExpanded,
				setDiagramExpanded,
			}}
		>
			{children}
		</DiagramContext.Provider>
	);
};
