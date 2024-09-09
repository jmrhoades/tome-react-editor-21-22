import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { useInterval } from "../../../hooks/use-interval";
import { AnnotationContext, AnnotationColors } from "./AnnotationContext";
import { AnnotationLine } from "./AnnotationLines";
import { CursorContext } from "../cursor/CursorContext";

const Wrap = styled(motion.div)`
	position: absolute;
	left: ${props => props.x * props.scale}px;
	top: ${props => props.y * props.scale}px;
`;

const CenteredContainer = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(-50%, -50%);
`;

const PulseContainer = styled(CenteredContainer)`
	width: ${props => props.scale * 72}px;
	height: ${props => props.scale * 72}px;
	pointer-events: none;
`;

const Pulse = styled(motion.div)`
	width: 100%;
	height: 100%;
	border-radius: 100%;
	background-color: ${props => props.color};
	transition: background-color 0.2s ease-out;
	opacity: 0;
	transform: scale(0);
`;

const DotContainer = styled(CenteredContainer)`
	width: ${props => props.scale * 12}px;
	height: ${props => props.scale * 12}px;
	filter: drop-shadow(0 0.1rem 0.15rem rgba(0, 0, 0, 0.1));
`;

const Dot = styled(motion.div)`
	width: 100%;
	height: 100%;
	border-radius: 100%;
	background-color: ${props => props.color};
	transition: background-color 0.2s ease-out;
	
	/* box-sizing: content-box; */
`;

const SelectionRingContainer = styled(CenteredContainer)`
	width: ${props => props.scale * 15}px;
	height: ${props => props.scale * 15}px;
	pointer-events: none;
	display: none;
`;

const SelectionRing = styled(motion.div)`
	width: 100%;
	height: 100%;
	border-radius: 100%;
	border-color: ${props => props.color};
	transition: border-color 0.2s ease-out;
	border-width: 2px;
	border-style: solid;
	border-color: white;
`;

const LabelContainer = styled(motion.div)`
	position: relative;
	transform: translateY(-50%);
`;

const LabelContent = styled(motion.div)`
	position: relative;
	background-color: ${props => props.color};
	transition: background-color 0.2s ease-out;
	padding: 6px 10px;
	border-radius: 8px;
	box-shadow: 0 1.2px 2.2px rgba(0, 0, 0, 0.02), 0 2.9px 5.3px rgba(0, 0, 0, 0.028), 0 5.4px 10px rgba(0, 0, 0, 0.035),
		0 9.6px 17.9px rgba(0, 0, 0, 0.042), 0 18px 33.4px rgba(0, 0, 0, 0.05), 0 43px 80px rgba(0, 0, 0, 0.07);
`;

const Label = styled(motion.div)`
	font-weight: 500;
	font-size: ${props => props.scale * 10}px;
	line-height: 140%;
	color: ${props => props.color};
	transition: color 0.2s ease-out;
	width: ${props => props.width};
`;

export const Annotation = props => {
	const value = useContext(AnnotationContext);
	const cursor = useContext(CursorContext);


	let data = null;
	if (props.id === "a1") {
		data = value.a1State;
	}
	if (props.id === "a2") {
		data = value.a2State;
	}
	if (props.id === "a3") {
		data = value.a3State;
	}
	if (props.id === "a4") {
		data = value.a4State;
	}

	const total = value.total;
	const color = AnnotationColors.find(o => o.name === data.color);
	const background = color.background;
	const foreground = color.foreground;
	const isSelected = props.selectedAnotation === data.order;
	const isRight = data.direction === "right";
	const labelDistance = 80;

	const dotControl = useAnimation();
	const pulseControl = useAnimation();
	const cycleCount = useMotionValue(0);
	const [isPulsing, setIsPulsing] = useState(true);

	const doPulse = () => {
		if (cycleCount.get() === data.order) {
			pulseControl.start({
				scale: [0, 1],
				opacity: [0, 0.1, 0],
				transition: { duration: 0.75, delay: 0.15 },
			});

			dotControl.start({
				scale: [1, 0, 1.5, 1],
				transition: { duration: 0.75 },
			});
		}
	};

	useInterval(
		() => {
			doPulse();
			let count = cycleCount.get() + 1;
			if (count > total * 3) {
				cycleCount.set(1);
			} else {
				cycleCount.set(count);
			}
		},
		isPulsing ? 500 : null
	);

	const dotVariants = {
		default: {
			opacity: 1,
			x: "-50%",
			y: "-50%",
		},
		hover: {
			opacity: 1,
			x: "-50%",
			y: "-50%",
		},
		active: {
			scale: 0.8,
			x: "-50%",
			y: "-50%",
			transition: { duration: 0.15 },
		},
		disabled: {
			opacity: 0.5,
			x: "-50%",
			y: "-50%",
		},
	};

	const selectionVariants = {
		default: {
			opacity: 1,
			scale: 0.5,
		},
		selected: {
			opacity: 1,
			scale: 1,
		},
	};

	const labelVariants = {
		default: {
			opacity: 0,
			scale: 0.5,
			y: "-50%",
			x: isRight ? 0 : "-100%",
		},
		selected: {
			opacity: 1,
			scale: 1,
			y: "-50%",
			x: isRight ? 0 : "-100%",
		},
	};

	const easeA = {
		duration: 0.25,
		ease: [0.4, 0, 0.1, 1],
	};

	const springB = {
		type: "spring",
		stiffness: 650,
		damping: 30,
		mass: 1,
	};

	const transition = data.lineStyle === "hairline" ? easeA : springB;

	return (
		<Wrap x={data.position.x} y={data.position.y} scale={props.scale} drag dragMomentum={false} layout>
			<PulseContainer scale={props.scale}>
				<Pulse animate={pulseControl} color={background} />
			</PulseContainer>

			<AnnotationLine
				lineStyle={data.lineStyle}
				color={background}
				isSelected={isSelected}
				scale={props.scale}
				isRight={isRight}
				distance={labelDistance}
				transition={transition}
			/>

			<LabelContainer
				initial="default"
				variants={labelVariants}
				animate={isSelected ? "selected" : "default"}
				transition={transition}
				style={{
					transformOrigin: isRight ? "0 50%" : "100% 50%",
				}}
			>
				<LabelContent
					color={background}
					style={{
						x: isRight ? labelDistance : -labelDistance,
					}}
				>
					<Label
						scale={props.scale}
						width={props.width ? props.width * props.scale + "px" : "auto"}
						color={foreground}
					>
						{data.text}
					</Label>
				</LabelContent>
			</LabelContainer>

			<SelectionRingContainer scale={props.scale}>
				<SelectionRing
					initial="default"
					variants={selectionVariants}
					animate={isSelected ? "selected" : "default"}
					transition={transition}
					color={background}
				/>
			</SelectionRingContainer>

			<DotContainer
				scale={props.scale}
				whileTap="active"
				whileHover="hover"
				initial="default"
				variants={dotVariants}
				onMouseEnter={(e)=>{cursor.setCursorName("pointer")}}
				onMouseLeave={(e)=>{cursor.setCursorName("default")}}
				onMouseUp={e => {
					e.stopPropagation();
				}}
				onTap={() => {
					if (props.selectedAnotation === data.order) {
						props.setSelectedAnnotation(null);
					} else {
						props.setSelectedAnnotation(data.order);

						pulseControl.start({
							scale: [0.5, 0.75],
							opacity: [0.1, 0],
							transition: { duration: 0.5 },
						});
					}
					setIsPulsing(false);
				}}
			>
				<Dot animate={dotControl} color={background} />
			</DotContainer>
		</Wrap>
	);
};
