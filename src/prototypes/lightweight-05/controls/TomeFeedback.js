import React, { useContext } from "react";
import { TomeContext } from "../tome/TomeContext";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrap = styled(motion.div)`
	width: 300px;
    height: 40px;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
`;

export const TomeFeedback = props => {
	const { documentStatus } = useContext(TomeContext);

	return (
		<Wrap>
		<Button kind="icon" icon="HeartEmpty"  />
		</Wrap>
	);
};