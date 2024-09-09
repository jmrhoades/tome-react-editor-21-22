import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Device = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 478px;
	height: 914px;
	background-image: url("/images/device-frame-iphone-12-mini-black.png");
	background-size: 478px 914px;
	background-repeat: no-repeat;
	transform: translate(-50%, -50%);
	pointer-events: none;
	opacity: 1;
`;

export const DeviceFrame = props => {
	return <Device></Device>;
};
