import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { Helmet } from "react-helmet";

import { Pages } from "./Pages";
import { StatusBar } from "./StatusBar";
import { Toolbar } from "./Toolbar";
import { TomeProvider } from "./TomeContext";
import { HomeIndicator } from "./HomeIndicator";
import { ExpandModeToolbar } from "./ExpandModeToolbar";
import { Viewport } from "./Viewport";
import { DeviceFrame } from "./DeviceFrame";

const TITLE = "Mobile Annotations 01";

const CenterEverything = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;
`;

const GlobalStyle = createGlobalStyle`
	#root {
		background-color: hsl(0, 0%, 8%);
	}
`;

export const MobileAnnotations01 = props => {
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	const stageScale = useMotionValue(1);

	/*
	const h = document.body.clientHeight;
	let scale = 1;
	if (h < 1100) {
		scale = h/1100;
	}
	console.log(h, scale)
	*/

	useEffect(() => {
		const h = document.body.clientHeight;
		const minHeight = 850;
		if (h < minHeight) {
			stageScale.set(h / minHeight);
		}
	}, [stageScale]);

	return (
		<TomeProvider>
			<GlobalStyle />
			<Helmet>
				<title>{TITLE}</title>
			</Helmet>
			<CenterEverything
				style={{
					scale: stageScale,
				}}
			>
				<Viewport>
					<Pages />
					{!isMobile && <StatusBar />}
					<Toolbar />
					{!isMobile && <HomeIndicator />}
					<ExpandModeToolbar />
				</Viewport>
				{!isMobile && <DeviceFrame />}
			</CenterEverything>
		</TomeProvider>
	);
};
