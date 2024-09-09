import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { useAnimationFrame } from "../../hooks/use-animation-frame";

const Wrap = styled(motion.div)``;

export const DIRECTION = {
	RTL: "RTL",
	LTR: "LTR",
};

export const Marquee = props => {
	const ref = useRef();
	const measureLabelRef = useRef();
	const fontFamily = "ABCDiatype";

	const x = useMotionValue(0);

	const labelWidth = useMotionValue(0);
	const viewportWidth = useMotionValue(0);
	const [displayLabel, setDisplayLabel] = useState("");

	//const fontSize = useMotionValue(window.innerHeight/5);

	const [fontSize, setFontSize] = useState(window.innerHeight / 5);

	// const label = useMotionValue("");

	const moveLabel = () => {
		const offset = props.direction === DIRECTION.RTL ? -0.5 : 0.5;
		x.set(x.get() + offset);

		if (x.get() >= 0 && props.direction === DIRECTION.LTR) {
			x.set(-labelWidth.get() / 2);
		}

		if (Math.abs(x.get()) >= labelWidth.get() / 2 && props.direction === DIRECTION.RTL) {
			x.set(0);
		}
	};
	useAnimationFrame(deltaTime => moveLabel());

	useEffect(() => {
		//fontSize.set(window.innerHeight/5)
		//console.log("Marquee innit");
		if (displayLabel === "") {
			if (measureLabelRef.current) {
				viewportWidth.set(window.innerWidth);
				const labelRect = measureLabelRef.current.getBoundingClientRect();
				const multiplier = Math.ceil(viewportWidth.get() / labelRect.width) * 2;
				console.log(multiplier)
				let l = "";
				for (let i = 0; i < multiplier; i++) {
					l += props.label + " ";
				}
				setDisplayLabel(l); // Re-render
			}
		} else {
			const dupedLabelRect = ref.current.getBoundingClientRect();
			labelWidth.set(dupedLabelRect.width);
			if (props.direction === DIRECTION.LTR) {
				x.set(-labelWidth.get() / 2);
			}
		}
	}, [setDisplayLabel, displayLabel, labelWidth, props.direction, props.label, viewportWidth, x, fontSize]);

	return (
		<Wrap
			style={{
				fontFamily: fontFamily,
				color: "white",
				fontSize: fontSize + "px",
				lineHeight: 1,
				x: x,
				whiteSpace: "nowrap",
			}}
		>
			<span
				style={{
					whiteSpace: "nowrap",
					backgroundColor: props.backgroundColor ? props.backgroundColor : "transparent",
					color: props.foregroundColor ? props.foregroundColor : "#FFF",
					
				}}
				ref={ref}
			>
				{displayLabel}
			</span>
			<div
				ref={measureLabelRef}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					//visibility: "hidden",
				}}
			>
				{props.label}
			</div>
		</Wrap>
	);
};
