import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { DiagramContext, diagramShapeOptions, diagramColors } from "./DiagramContext";
import { colors } from "../metrics/MetricsContext";
import { Button } from "../../../ds/Button";
import { ColorSwatch } from "../controls/ColorSwatch";

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
`;

const Toolbar = styled(motion.div)`
	display: flex;
	align-items: flex-start;
	overflow: hidden;
	pointer-events: auto;
	border-radius: 8px;
    filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.25));
`;

export const DiagramObjectProperties = props => {
	const {
		selectedShapeData,
		panX,
		panY,
		diagramShape1Data,
		setDiagramShape1Data,
		diagramShape2Data,
		setDiagramShape2Data,
		diagramShape3Data,
		setDiagramShape3Data,
		diagramShape4Data,
		setDiagramShape4Data,
	} = useContext(DiagramContext);

	const [geometrySelected, setGeometrySelected] = useState(false);
	const [colorSelected, setColorSelected] = useState(false);

	const parentMenuWidth = 144;
	const childMenuY = -80;
	const buttonWidth = "48px";

	const menuX = useMotionValue(0);
	const menuY = useMotionValue(0);

    
    

	if (selectedShapeData && selectedShapeData.rect) {
        const viewportRect = document.getElementById("viewport").getBoundingClientRect();
		menuX.set(selectedShapeData.rect.x + (selectedShapeData.rect.width/2) - (parentMenuWidth/2) - viewportRect.x);
		menuY.set(selectedShapeData.rect.y - 48 - viewportRect.y);
	}

	useEffect(() => {
        const viewportRect = document.getElementById("viewport").getBoundingClientRect();
		panX.onChange(latest => {
            if (selectedShapeData && selectedShapeData.rect) {
                menuX.set(selectedShapeData.rect.x + (selectedShapeData.rect.width/2) - (parentMenuWidth/2) + latest - viewportRect.x);
            }
		});
		panY.onChange(latest => {
            if (selectedShapeData && selectedShapeData.rect) {
                menuY.set(selectedShapeData.rect.y - 48 + latest - viewportRect.y);
            }
		});
        if (selectedShapeData === null) {
            setGeometrySelected(false);
            setColorSelected(false);
        }
	}, [panX, panY, selectedShapeData, menuX, menuY]);

	// console.log(selectedShapeData);

	let updateShapeData = null;
	let shapeData = null;
	if (selectedShapeData && selectedShapeData.id === "shape1") {
		shapeData = diagramShape1Data;
		updateShapeData = setDiagramShape1Data;
	}
	if (selectedShapeData && selectedShapeData.id === "shape2") {
		shapeData = diagramShape2Data;
		updateShapeData = setDiagramShape2Data;
	}
	if (selectedShapeData && selectedShapeData.id === "shape3") {
		shapeData = diagramShape3Data;
		updateShapeData = setDiagramShape3Data;
	}
	if (selectedShapeData && selectedShapeData.id === "shape4") {
		shapeData = diagramShape4Data;
		updateShapeData = setDiagramShape4Data;
	}

	return (
		<Wrap
			style={{
				x: menuX,
				y: menuY,
				display: selectedShapeData ? "block" : "none",
			}}
		>
			{selectedShapeData && (
				<Toolbar
					style={{
						backgroundColor: colors.z3,
						width: parentMenuWidth,
					}}
				>
					<Button
						key={"change-shape-geometry"}
						kind="icon"
						icon={shapeData.geometry}
						selectedBackgroundColor={"rgba(0, 0, 0, 0.2)"}
						selected={geometrySelected}
						width={buttonWidth}
						minWidth={buttonWidth}
						// radius={"0"}
						// nohover={true}
						onTap={e => {
							setGeometrySelected(!geometrySelected);
							setColorSelected(false);
						}}
					/>
					<Button
						key={"change-shape-color"}
						kind="icon"
						icon="ColorRing"
						color={shapeData.color.value}
						selectedBackgroundColor={"rgba(0, 0, 0, 0.2)"}
						selected={colorSelected}
						width={buttonWidth}
						minWidth={buttonWidth}
						// radius={"0"}
						// nohover={true}
						assetOpacity={1}
						onTap={e => {
							setColorSelected(!colorSelected);
							setGeometrySelected(false);
						}}
					/>
					<Button
						key={"toggle-label"}
						kind="icon"
						icon={shapeData.labelVisible ? "Title" : "TitleOff"}
						selectedBackgroundColor={"transparent"}
						selected={shapeData.labelVisible}
						selectedColor={"rgba(255, 255, 255, 0.4)"}
                        width={buttonWidth}
						minWidth={buttonWidth}
                        isToggle={true}
						// radius={"0"}
						// nohover={true}
						onMouseUp={e => {
							updateShapeData({ ...shapeData, labelVisible: !shapeData.labelVisible });
							setColorSelected(false);
							setGeometrySelected(false);
							//updateDiagramObjectProperty(info.id, "labelVisible", !selectedShapeData.labelVisible);
						}}
					/>
				</Toolbar>
			)}

			{selectedShapeData && (
				<Toolbar
					style={{
						backgroundColor: colors.z3,
						y: childMenuY,
						x: `calc(-50% + ${parentMenuWidth / 2}px)`,
						display: geometrySelected ? "flex" : "none",
					}}
				>
					{Object.keys(diagramShapeOptions).map(key => (
						<Button
							kind="icon"
							key={key}
							icon={diagramShapeOptions[key]}
							onMouseUp={e => {
								updateShapeData({ ...shapeData, geometry: diagramShapeOptions[key] });
								setGeometrySelected(false);
							}}
                            width={"44px"}
							selected={shapeData.geometry === diagramShapeOptions[key]}
							selectedBackgroundColor={"transparent"}
						/>
					))}
				</Toolbar>
			)}

			{selectedShapeData && (
				<Toolbar
					style={{
						backgroundColor: colors.z3,
						y: childMenuY,
						x: `calc(-50% + ${parentMenuWidth / 2}px)`,
						display: colorSelected ? "flex" : "none",
					}}
				>
					{diagramColors.map(color => (
						<ColorSwatch
							key={color.name}
							name={color.name}
							color={color.value}
							selected={shapeData.color.name === color.name}
							onTap={e => {
								updateShapeData({ ...shapeData, color: color });
								setColorSelected(false);
							}}
						/>
					))}

					<ColorSwatch
						isColorPicker={true}
						key={"color-picker"}
						name={"color-picker"}
						color={null}
						isSelected={false}
						onTap={null}
					/>
				</Toolbar>
			)}
		</Wrap>
	);
};
