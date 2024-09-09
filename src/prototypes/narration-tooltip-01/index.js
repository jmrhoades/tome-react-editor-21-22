import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

import { Titlebar } from "./titlebar";
import { Overlay } from "./overlay";
import { Page } from "./page";
import { PageTapNavigation } from "./pageTapNavigation";
import { Chrome } from "./chrome";
import { NavigationTooltip } from "./navigation-tooltip";

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: ${props => props.bgcolor};	
	}
`;

const Wrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Screen = styled(motion.div)`
	width: 390px;
	height: 844px;
	position: relative;
	background-color: #141414;
`;

const Content = styled(motion.div)`
	width: 100%;
	height: 100%;
	position: relative;

	/* background-image: url("/images/narration-mobile-content-01.png"); */
	/* background-size: 390px 844px; */
`;

const PageContainer = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	/*
	scroll-snap-type: x mandatory;
	overflow-x: scroll;
	display: flex;
	*/
`;



const themes = {
	dark: {
		mode: "dark",
		page: "#141414",
		heading: "#ffffff",
		contrast16: "rgba(255, 255, 255, 0.16)",
		contrast40: "rgba(255, 255, 255, 0.40)",
		contrast60: "rgba(255, 255, 255, 0.60)",
	},
	light: {
		mode: "light",
		page: "rgba(255, 255, 255, 1.0)",
		heading: "#000000",
		contrast16: "rgba(0, 0, 0, 0.16)",
		contrast40: "rgba(0, 0, 0, 0.40)",
		contrast60: "rgba(0, 0, 0, 0.60)",
	},
};

const pages = [
	{
		id: "page1",
		order: 1,
		theme: themes.dark,
		tiles: [
			{
				id: "tileA",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page05.png",
				},
			},
		],
	},
	{
		id: "page2",
		order: 2,
		theme: themes.dark,
		tiles: [
			{
				id: "tileB",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page02.png",
				},
			},
		],
	},
	{
		id: "page3",
		order: 3,
		theme: themes.light,
		tiles: [
			{
				id: "tileC",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page03.png",
				},
			},
		],
	},
	{
		id: "page4",
		order: 4,
		theme: themes.light,
		tiles: [
			{
				id: "tileD",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page04.png",
				},
			},
		],
	},
	{
		id: "page5",
		order: 5,
		theme: themes.dark,
		tiles: [
			{
				id: "tileE",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page01.png",
				},
			},
		],
	},
	{
		id: "page6",
		order: 6,
		theme: themes.dark,
		tiles: [
			{
				id: "tileF",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page06.png",
				},
			},
		],
	},
	{
		id: "page7",
		order: 7,
		theme: themes.light,
		tiles: [
			{
				id: "tileG",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page07.png",
				},
			},
		],
	},
	{
		id: "page8",
		order: 8,
		theme: themes.light,
		tiles: [
			{
				id: "tileH",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page08.png",
				},
			},
		],
	},
	{
		id: "page9",
		order: 9,
		theme: themes.dark,
		tiles: [
			{
				id: "tileI",
				type: "image",
				data: {
					imageURL: "/images/moweb-tap-to-advance/page09.png",
				},
			},
		],
	},
];

export const NarrationTooltip01 = props => {
	const [currentPage, setCurrentPage] = React.useState(pages[0]);

	return (
		<>
			<GlobalStyle bgcolor={"#000"} />
			<Wrap>
				<Screen>
					<Content
					//initial={{ opacity: 0 }}
					//animate={{ opacity: 1 }}
					//transition={{ delay: 0.75, duration: 0 }}
					>
						<PageContainer>
							{pages.map(page => (
								<Page key={page.id} page={page} currentPage={currentPage} />
							))}
						</PageContainer>
						{/* <Overlay /> */}
						<PageTapNavigation pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

						
							<NavigationTooltip />
								
						
					</Content>

					<Titlebar pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

					<Chrome currentPage={currentPage} />
				</Screen>
			</Wrap>
		</>
	);
};
