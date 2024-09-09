import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Marquee, DIRECTION } from "./Marquee";

const TITLE = "Tome Prototypes";
const Wrap = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const marqueePhrases = [
    "Right Click",
    "Left Click",
    "Tome Protos",
    "Right Click",
    "Left Click",
]

export const Index01 = props => {
	return (
		<Wrap id="viewport">
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
			<Marquee label={"Right Click"} direction={DIRECTION.LTR} backgroundColor={"#000"} foregroundColor={"#fff"} />
            <Marquee label={"Left Click"} direction={DIRECTION.RTL}/>
            <Marquee label={"Tome Prototypes"} direction={DIRECTION.LTR} />
            <Marquee label={"Right Click"} direction={DIRECTION.RTL}/>
            <Marquee label={"Left Click"} direction={DIRECTION.LTR}/>
		</Wrap>
	);
};
