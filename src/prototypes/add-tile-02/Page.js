import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { colors } from "../../ds/Colors";
import { MetricsContext } from "./MetricsContext";
import { transitions } from "../../ds/Transitions";

const Wrap = styled(motion.div)`
	position: absolute;
    background-color: cornflowerblue;
`;

export const Page = props => {

    const { pageWidth, pageHeight, pageLeft, pageTop, pageCornerRadius } = useContext(MetricsContext).metrics;
    
    //console.log("render")
	
    return (
		<Wrap
			id="page"
            layout
            transition={transitions.layoutTransition}
			style={{
				backgroundColor: colors.z1,
                width: pageWidth,
                height: pageHeight,
                borderRadius: pageCornerRadius,
                top: pageTop,
                left: pageLeft,
			}}
		>
			{props.children}
		</Wrap>
	);
};
