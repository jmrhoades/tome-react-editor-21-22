import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";

export const AutoScrollRegionBottom = props => {
	const { rowResizing } = useContext(TomeContext);

	const scrollInterval = useMotionValue(0);

	const Container = styled(motion.div)`
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 64px;
		background-color: red;
		background-color: transparent;
	`;

	useEffect(() => {
		if (!rowResizing) {
			clearInterval(scrollInterval.get());
		}
	}, [rowResizing, scrollInterval]);

	return (
		<Container
			onHoverStart={e => {
				if (rowResizing) {
					// Scroll the window down
					clearInterval(scrollInterval.get());
					const i = setInterval(() => {
						console.log("trying to scroll", i);
						window.scroll({
							top: document.body.scrollHeight,
							behavior: "smooth", // 👈
						});
					}, 100);
					scrollInterval.set(i);
				}
			}}
			onHoverEnd={e => {
				console.log("trying to stop scroll", scrollInterval.get());
				clearInterval(scrollInterval.get());
			}}
		/>
	);
};
