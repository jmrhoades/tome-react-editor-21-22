import React, {useContext} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { TomeContext } from "../tome/TomeContext";


const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
    display: flex;
	align-items: center;
	justify-content: center;
    background-color: #ffe500;
`;

const Letter = styled(motion.div)`
    text-align: center;
    line-height: 1;
    color: black;
    font-weight: 800;
`;

export const LargeLetterTile = props => {
    const tome = useContext(TomeContext);
	const { scale } = tome.metrics;
	
	return (
		<Wrap>
			<Letter
				style={{
                    fontSize: `${120 * scale}px`,
                }}
			>
                A
            </Letter>
		</Wrap>
	);
};
