import React, {useContext} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MetricsContext } from "../metrics/MetricsContext";

const Wrap = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
    display: flex;
	align-items: center;
	justify-content: center;
    background-color: #9169F7;
`;

const Letter = styled(motion.div)`
    text-align: center;
    line-height: 1;
    color: white;
    font-weight: 800;
`;

export const LargeLetterTile = props => {
    // const tome = useContext(TomeContext);
	const { scale } = useContext(MetricsContext).metrics;
	
	return (
		<Wrap>
			<Letter
				style={{
                    fontSize: `${120 * scale}px`,
                }}
			>
                B
            </Letter>
		</Wrap>
	);
};
