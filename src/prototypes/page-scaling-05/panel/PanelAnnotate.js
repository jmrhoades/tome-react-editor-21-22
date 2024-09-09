/* eslint-disable */

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { PanelTitleBar } from "./PanelTitleBar";
import { AnnotationContext, AnnotationColors } from "../annotation/AnnotationContext";
import { Segment } from "../../../ds/Segment";
import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: relative;
	width: 100%;
	background: #141414;
	border-radius: 20px;
	padding: 0 16px 20px;
`;

const Header = styled(motion.div)`
	font-size: 12px;
	line-height: 12px;
	padding-bottom: 8px;
	color: rgba(255, 255, 255, 0.4);
`;

const VerticalSpacer = styled(motion.div)`
	height: 16px;
`;

const editorModeVariants = {
	editing: {
		opacity: 1,
	},
	presenting: {
		opacity: 0,
	},
};

const defaultLayoutTransition = {
	duration: 0.25,
	ease: [0.4, 0, 0.1, 1],
};

export const PanelAnnotate = props => {
	const tome = useContext(TomeContext);
	const value = useContext(AnnotationContext);
	let title = "Add Annotation";
	let color = AnnotationColors[0].name;
	let lineStyle = "hairline";
	let show = "showOnClick"
	let data = null;
	let callback = null;
	if (props.selectedAnotation) {
		if (props.selectedAnotation === 1) {
			data = value.a1State;
			callback = value.setA1State;
		}
		if (props.selectedAnotation === 2) {
			data = value.a2State;
			callback = value.setA2State;
		}
		if (props.selectedAnotation === 3) {
			data = value.a3State;
			callback = value.setA3State;
		}
		if (props.selectedAnotation === 4) {
			data = value.a4State;
			callback = value.setA4State;
		}
		title = "Annotation " + data.order;
		color = data.color;
		lineStyle = data.lineStyle;
	}

	const [selectedColor, setSelectedColor] = useState(color);
	const [selectedLineStyle, setSelectedLineStyle] = useState(lineStyle);
	const [selectedShowOption, setSelectedShowOption] = useState(show);

	useEffect(() => {
		if (props.selectedAnotation === 1) {
			setSelectedColor(value.a1State.color);
			setSelectedLineStyle(value.a1State.lineStyle);
		}
		if (props.selectedAnotation === 2) {
			setSelectedColor(value.a2State.color);
			setSelectedLineStyle(value.a2State.lineStyle);
		}
		if (props.selectedAnotation === 3) {
			setSelectedColor(value.a3State.color);
			setSelectedLineStyle(value.a3State.lineStyle);
		}
		if (props.selectedAnotation === 4) {
			setSelectedColor(value.a4State.color);
			setSelectedLineStyle(value.a4State.lineStyle);
		}
	}, [props.selectedAnotation]);

	const updateSelectedColor = name => {
		setSelectedColor(name);
		if (callback) {
			callback(state => ({ ...state, color: name }));
		}
	};

	const updateSelectedLineStyle = name => {
		setSelectedLineStyle(name);
		if (callback) {
			callback(state => ({ ...state, lineStyle: name }));
		}
	};

	const updateSelectedShowStyle = name => {
		setSelectedShowOption(name);
		if (callback) {
			callback(state => ({ ...state, showStyle: name }));
		}
	};

	return (
		<Wrap
			height={188}
			initial={{ opacity: 0, scale: 0.9, x: 0 }}
			animate={{ opacity: 1, scale: 1.0, x: 0 }}
			exit={{ opacity: 0, scale: 0.9, x: 0 }}
			transition={tome.panelTransition}
			onMouseUp={e => {
				e.stopPropagation();
			}}
		>
			<motion.div variants={editorModeVariants} animate={props.editorState}>
				<PanelTitleBar title={title} />

				<Header>Color</Header>

				<Colors>
					{AnnotationColors.map(color => (
						<Color
							key={color.name}
							name={color.name}
							color={color.background}
							isSelected={selectedColor === color.name}
							onClick={() => updateSelectedColor(color.name)}
						/>
					))}
				</Colors>
				
				<VerticalSpacer />
				
				<Header>Line Style</Header>
				<Segment
					leftLabel="Hairline"
					leftValue="hairline"
					leftIcon="LineHairline"
					rightLabel="Wavy"
					rightValue="wavy"
					rightIcon="LineWavy"
					initialValue={selectedLineStyle}
					updateValue={updateSelectedLineStyle}
				/>

				<VerticalSpacer />
				
				<Header>Show</Header>
				<Segment
					leftLabel="On click"
					leftValue="showOnClick"
					leftIcon="ShowOnClick"
					rightLabel="Always"
					rightValue="showAlways"
					rightIcon="ShowAlways"
					initialValue={selectedShowOption}
					updateValue={updateSelectedShowStyle}
				/>

			</motion.div>
		</Wrap>
	);
};

const Colors = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(6, 28px);
	column-gap: 6px;
`;

const ColorWrap = styled(motion.div)`
	position: relative;
	width: 28px;
	height: 28px;
`;

const ColorCircle = styled(motion.div)`
	position: absolute;
	top: 4px;
	left: 4px;
	bottom: 4px;
	right: 4px;
	border-radius: 50%;
`;

const ColorOutlineInner = styled(ColorCircle)`
	border: 1px solid white;
`;

const ColorOutline = styled(motion.div)`
	position: absolute;
	top: 0px;
	left: 0px;
	bottom: 0px;
	right: 0px;
	border-radius: 50%;
	border: 2px solid white;
`;

const ColorOutlineHover = styled(ColorOutline)``;

const Color = ({ name, color, isSelected, onClick }) => {
	const colorWrapVariants = {
		default: {
			opacity: 1,
		},
		hover: {
			opacity: 1,
		},
	};

	const colorHoverOutlineVariants = {
		default: {
			opacity: 0,
		},
		hover: {
			opacity: 0.4,
		},
	};

	return (
		<ColorWrap
			initial="default"
			whileHover="hover"
			variants={colorWrapVariants}
			onMouseUp={e => {
				onClick();
				e.stopPropagation();
			}}
		>
			<ColorCircle
				style={{ backgroundColor: color }}
				initial={false}
				animate={{ scale: isSelected ? 1 : 1 }}
				transition={defaultLayoutTransition}
			/>

			{/* <ColorOutlineInner style={{ opacity: name === "black" ? 0.4 : 0 }} /> */}

			<ColorOutlineHover
				style={{ borderColor: color }}
				variants={colorHoverOutlineVariants}
				transition={defaultLayoutTransition}
			/>

			<ColorOutline
				style={{ borderColor: color }}
				initial={false}
				animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 1 }}
				transition={defaultLayoutTransition}
			/>
		</ColorWrap>
	);
};
