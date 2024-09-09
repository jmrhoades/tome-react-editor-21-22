import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useAnimationFrame } from "../../hooks/use-animation-frame";
import { annotationDirections } from "./Annotation";

const WavyWrap = styled(motion.svg)`
	position: absolute;
	top: 0;
	left: 0;
	fill: none;
`;

const WavyPath = styled(motion.polyline)`
	transform-origin: 50% 50%;
	transform: rotate(180deg);
`;

export const AnnotationLine = props => {
	const wavyPoints = useMotionValue(" ");

	const width = props.lineLength - props.dotSize/2;
	const height = 14;
	const origin = {
		x: 0,
		y: height / 2,
	};
	const amplitude = height / 2 - 2;
	const pointSpacing = 1;
	const aF = props.lineStyle === "wavy" ? 0.25 : 0;
	const angularFrequency = useMotionValue(aF);
	const phaseAngle = useMotionValue(0.5);

	const drawLine = () => {
		phaseAngle.set(phaseAngle.get() + 0.15);
		const points = [];
		for (let i = 0; i < width / pointSpacing; i++) {
			const x = i * pointSpacing + origin.x;
			const y = Math.sin(angularFrequency.get() * (i + phaseAngle.get())) * amplitude + origin.y;
			points.push([x, y]);
		}
		wavyPoints.set(points.join(" "));
	};

	useEffect(() => {
		angularFrequency.set(props.lineStyle === "wavy" ? 0.25 : 0);
	}, [props.lineStyle, angularFrequency]);

	useAnimationFrame(deltaTime => drawLine());

	let rotation = 0;
	let xOffset = 0;
	let yOffset = 0;
	if (props.direction === annotationDirections.top) {
		rotation = -90;
		xOffset = 7;
		yOffset = -8;
	}
	if (props.direction === annotationDirections.bottom) {
		rotation = 90;
		xOffset = -7;
		yOffset = 8;
	}
	if (props.direction === annotationDirections.right) {
		xOffset = 7;
		yOffset = -7;
	}
	if (props.direction === annotationDirections.left) {
		xOffset = -7;
		yOffset = -7;
	}


	return (
		<WavyWrap
			viewBox={`0 0 ${width} ${height}`}
			width={width}
			height={height}
			style={{ y: yOffset, x: xOffset }}
			initial={{ opacity: 0, scaleX: 0, rotate: rotation }}
			animate={{
				opacity: props.isSelected ? 1 : 0,
				rotate: rotation,
				scaleX: props.direction === annotationDirections.right ? 1 : -1,
			}}
			transition={props.transition}
		>
			<WavyPath points={wavyPoints} stroke={props.color} strokeWidth={1.0} />
		</WavyWrap>
	);
};
