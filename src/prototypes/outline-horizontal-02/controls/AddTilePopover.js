import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	
`;

export const AddTilePopover = props => {
	const { setSelectedTileID } = useContext(TomeContext);

	return <Wrap></Wrap>;
};
