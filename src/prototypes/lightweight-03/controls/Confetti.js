import React, { useContext } from "react";
import { TomeContext } from "../tome/TomeContext";
import ReactCanvasConfetti from "react-canvas-confetti";
import { motion } from "framer-motion";
import styled from "styled-components";

const ConfettiWrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 20;
	pointer-events: none;
`;

export const ConfettiWrapper = props => {
	const { documentStatus } = useContext(TomeContext);

	return (
		<ConfettiWrap>
			<Confetti documentStatus={documentStatus} />
		</ConfettiWrap>
	);
};

const canvasStyles = {
	position: "fixed",
	pointerEvents: "none",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	zIndex: 20,
};

export class Confetti extends React.Component {
	constructor(props) {
		super(props);
		this.isAnimationEnabled = false;
		this.animationInstance = null;
		this.nextTickAnimation = this.nextTickAnimation.bind(this);
	}

	makeShot = (angle, originX, originY) => {
		this.animationInstance &&
			this.animationInstance({
				particleCount: 3,
				angle,
				spread: 155,
				origin: { x: originX, y:originY},
				colors: ["#ED00EB", "#ffffff", "#414141"],
			});
	};

	nextTickAnimation = () => {
		this.makeShot(60, 0, 0.5);
		this.makeShot(120, 1, 0.5);
		
		if (this.isAnimationEnabled) requestAnimationFrame(this.nextTickAnimation);
	};

	startAnimation = () => {
		if (!this.isAnimationEnabled) {
			this.isAnimationEnabled = true;
			this.nextTickAnimation();
		}
	};

	pauseAnimation = () => {
		this.isAnimationEnabled = false;
	};

	stopAnimation = () => {
		this.isAnimationEnabled = false;
		this.animationInstance && this.animationInstance.reset();
	};

	handlerClickStart = () => {
		this.startAnimation();
	};

	handlerClickPause = () => {
		this.pauseAnimation();
	};

	handlerClickStop = () => {
		this.stopAnimation();
	};

	getInstance = instance => {
		this.animationInstance = instance;
	};

	componentWillUnmount() {
		this.isAnimationEnabled = false;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.documentStatus !== this.props.documentStatus) {
			if (this.props.documentStatus === "posted") {
				this.startAnimation();
				setTimeout(() => this.pauseAnimation(), 500);
			}
		}
	}

	render() {
		return (
			<>
				<ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles} />
			</>
		);
	}
}
