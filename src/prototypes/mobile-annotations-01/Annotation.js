import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

import { AnnotationLine } from "./AnnotationLine";

import { TomeContext } from "./TomeContext";
import { transitions } from "../../ds/Transitions";

export const annotationDirections = {
	left: "LEFT",
	right: "RIGHT",
	top: "TOP",
	bottom: "BOTTOM",
};

const Wrap = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
`;

const DotContainer = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: ${props => props.tapArea}px;
	height: ${props => props.tapArea}px;
	pointer-events: auto;
	transform-origin: 50% 50%;
`;

const Dot = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	border-radius: 50%;
	background-color: ${props => props.color};
`;

const ActiveDot = styled(Dot)`
	background-color: transparent;
	border-color: ${props => props.color};
	border-style: solid;
	border-width: 2px;
`;

const LabelContainer = styled(motion.div)`
	position: relative;
	transform: translateY(-50%);
`;

const DummyLabelContainer = styled(motion.div)`
	opacity: 0;
`;

const LabelContent = styled(motion.div)`
	position: relative;
	background-color: ${props => props.color};
	transition: background-color 0.2s ease-out;
	padding: 6px 10px;
	border-radius: 8px;
	max-width: 256px;
	box-shadow: 0 1.2px 2.2px rgba(0, 0, 0, 0.02), 0 2.9px 5.3px rgba(0, 0, 0, 0.028), 0 5.4px 10px rgba(0, 0, 0, 0.035),
		0 9.6px 17.9px rgba(0, 0, 0, 0.042), 0 18px 33.4px rgba(0, 0, 0, 0.05), 0 43px 80px rgba(0, 0, 0, 0.07);
`;

const Label = styled(motion.div)`
	font-weight: 500;
	font-size: 13px;
	line-height: 140%;
	color: ${props => props.color};
	transition: color 0.2s ease-out;
`;

const labelVariants = {
	default: {
		opacity: 0,
		scale: 0.5,
	},
	selected: {
		opacity: 1,
		scale: 1,
	},
};

const hideDotEase = {
	duration: 0.25,
	ease: [0.4, 0, 0.1, 1],
};

const showLabelSpring = {
	type: "spring",
	stiffness: 650,
	damping: 30,
	mass: 1,
};

const dotVariants = {
	hide: {
		opacity: 0,
		scale: 0,
		transition: hideDotEase,
	},
	show: i => ({
		opacity: 1,
		scale: 1,
		transition: {
			delay: i * 0.05,
			type: "spring",
			stiffness: 350,
			damping: 20,
			mass: 2,
		},
	}),
};

export const Annotation = props => {
	const { isScrolling, activeAnnotationID, expandedTileID } = useContext(TomeContext);

	const expandTileAnimation = useAnimation();

	const [visible, setVisible] = useState(true);
	const [selected, setSelected] = useState(activeAnnotationID.get() === props.id || props.alwaysOn);
	const dotRef = useRef(null);
	const labelRef = useRef(null);

	const tapArea = 44;
	const dotSize = 18;
	const lineLength = 32;

	const [direction, setDirection] = useState(annotationDirections.right);
	const [labelLeft, setLabelLeft] = useState(0);
	const [labelTop, setLabelTop] = useState(0);
	const [labelTransformOrigin, setLabelTransformOrigin] = useState("0% 0%");

	const maxRight = 375;
	const minLeft = 0;

	useEffect(() => {
		isScrolling.onChange(latest => {
			if (latest === 1) {
				setVisible(false);
				activeAnnotationID.set("");
			} else {
				setVisible(true);
			}
		});
		activeAnnotationID.onChange(latest => {
			if (latest === props.id) {
				setSelected(true);
			} else {
				if (!props.alwaysOn) {
					setSelected(false);
				}
			}
		});
		expandedTileID.onChange(latest => {
			if (latest === props.tileID) {
				expandTileAnimation.start({
					x: props.x * props.tileWidthExpanded,
					y: props.y * props.tileHeightExpanded,
				});
			} else {
				expandTileAnimation.start({
					x: props.x * props.tileWidth,
					y: props.y * props.tileHeight,
				});
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	

	const findLabelDirection = () => {
		if (!labelRef.current) return;
		const labelWidth = labelRef.current.getBoundingClientRect().width;
		const labelHeight = labelRef.current.getBoundingClientRect().height;

		if (props.x <= props.tileWidth / 2) {
			// Dot is on the left side of the tile
			const labelRight = props.x + lineLength + labelWidth;
			if (labelRight >= maxRight) {
				// Label too wide for right placement, try top
				if (props.y - lineLength - labelHeight > 0) {
					setDirection(annotationDirections.top);
				} else {
					// Goes off top of tile, use bottom
					setDirection(annotationDirections.bottom);
				}
			} else {
				// Safe to place on right
				setDirection(annotationDirections.right);
			}
		} else {
			const labelLeft = props.x - lineLength - labelWidth;
			if (labelLeft <= minLeft) {
				// Label too wide for left placement, try top
				if (props.y - lineLength - labelHeight > 0) {
					setDirection(annotationDirections.top);
				} else {
					// Goes off top of tile, use bottom
					setDirection(annotationDirections.bottom);
				}
			} else {
				// Safe to place on left
				setDirection(annotationDirections.left);
			}
		}

		// Ignore that mess up there for now and take position from a prop
		setDirection(props.position);

		let offsetX = props.offsetX ? props.offsetX : 0;
		switch (direction) {
			case annotationDirections.left:
				setLabelLeft(-labelWidth / 2 - lineLength + 2);
				setLabelTop(0);
				setLabelTransformOrigin("100% 50%");
				break;
			case annotationDirections.right:
				setLabelLeft(labelWidth / 2 + lineLength - 2);
				setLabelTop(0);
				setLabelTransformOrigin("0% 50%");
				break;
			case annotationDirections.top:
				setLabelLeft(offsetX);
				setLabelTop(-lineLength - labelHeight / 2 + 2);
				setLabelTransformOrigin("50% 100%");
				break;
			case annotationDirections.bottom:
				setLabelLeft(offsetX);
				setLabelTop(lineLength + labelHeight / 2);
				setLabelTransformOrigin("50% 0%");
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		findLabelDirection();
	});

	return (
		<Wrap
			transition={transitions.layoutTransition}
			animate={expandTileAnimation}
			initial={{
				x: props.x * props.tileWidth,
				y: props.y * props.tileHeight,
			}}
			style={{
				zIndex: selected && !props.alwaysOn ? 1 : 0,
			}}
			ref={dotRef}
		>
			<AnnotationLine
				lineStyle={props.lineStyle}
				color={props.color.background}
				isSelected={selected}
				direction={direction}
				lineLength={lineLength}
				dotSize={dotSize}
				transition={showLabelSpring}
			/>

			<motion.div
				style={{
					x: -tapArea / 2,
					y: -tapArea / 2,
				}}
			>
				<DotContainer
					tapArea={tapArea}
					onTap={e => {
						
							activeAnnotationID.set(selected ? "" : props.id);
						
					}}
					animate={visible || props.alwaysOn ? "show" : "hide"}
					variants={dotVariants}
					initial={"hide"}
					custom={props.order}
				>
					<Dot
						color={props.color.background}
						size={dotSize}
						style={{
							opacity: selected ? 0 : 1,
							x: (tapArea - dotSize) / 2,
							y: (tapArea - dotSize) / 2,
						}}
					/>
					<ActiveDot
						color={props.color.background}
						size={dotSize}
						style={{
							x: (tapArea - dotSize) / 2,
							y: (tapArea - dotSize) / 2,
						}}
					/>
				</DotContainer>
			</motion.div>

			<LabelContainer
				initial="default"
				variants={labelVariants}
				animate={selected ? "selected" : "default"}
				transition={showLabelSpring}
				style={{
					x: "-50%",
					y: "-50%",
					left: labelLeft,
					top: labelTop,
					transformOrigin: labelTransformOrigin,
					pointerEvents: selected ? "auto" : "none",
				}}
				onTap={e => {
					activeAnnotationID.set("");
				}}
			>
				<LabelContent color={props.color.background}>
					<Label color={props.color.foreground}>{props.text}</Label>
				</LabelContent>
			</LabelContainer>

			{/* Used for measuring label size */}
			<DummyLabelContainer ref={labelRef}>
				<LabelContent color={props.color.background}>
					<Label color={props.color.foreground}>{props.text}</Label>
				</LabelContent>
			</DummyLabelContainer>
		</Wrap>
	);
};
