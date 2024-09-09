import { tileNames, textBlockType } from "../page/TileConstants";

export const TestTomeA = {
	pages: [
		{
			id: "page1",
			order: 1,
		},
		{
			id: "page2",
			order: 2,
		},
		{
			id: "page3",
			order: 3,
		},
		{
			id: "page4",
			order: 4,
		},
		{
			id: "page5",
			order: 5,
		},
		{
			id: "page6",
			order: 6,
		},
		{
			id: "page7",
			order: 7,
		},
	],
	rows: [
		{
			id: "row1",
			pageId: "page1",
			order: 1,
			height: 6,
			flexHeight: true,
		},
		{
			id: "row2",
			pageId: "page2",
			order: 1,
			height: 6,
			flexHeight: true,
		},
		{
			id: "row3",
			pageId: "page3",
			order: 1,
			height: 3,
			flexHeight: false,
		},
		{
			id: "row4",
			pageId: "page3",
			order: 2,
			height: 3,
			flexHeight: true,
		},
		{
			id: "row5",
			pageId: "page4",
			order: 1,
			height: 6,
			flexHeight: true,
		},
		{
			id: "row6",
			pageId: "page5",
			order: 1,
			height: 2,
			flexHeight: false,
		},
		{
			id: "row7",
			pageId: "page5",
			order: 2,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row8",
			pageId: "page5",
			order: 3,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row9",
			pageId: "page5",
			order: 4,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row10",
			pageId: "page5",
			order: 5,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row11",
			pageId: "page5",
			order: 6,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row12",
			pageId: "page6",
			order: 1,
			height: 6,
			flexHeight: true,
		},
		{
			id: "row13",
			pageId: "page6",
			order: 2,
			height: 2,
			flexHeight: true,
		},
		{
			id: "row14",
			pageId: "page6",
			order: 3,
			height: 2,
			flexHeight: true,
		},
		{
			id: "row15",
			pageId: "page6",
			order: 4,
			height: 3,
			flexHeight: true,
		},
		{
			id: "row16",
			pageId: "page7",
			order: 1,
			height: 2,
			flexHeight: true,
		},
		{
			id: "row17",
			pageId: "page7",
			order: 2,
			height: 8,
			flexHeight: true,
		},
		{
			id: "row18",
			pageId: "page7",
			order: 3,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row19",
			pageId: "page7",
			order: 4,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row20",
			pageId: "page7",
			order: 5,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row21",
			pageId: "page7",
			order: 6,
			height: 5,
			flexHeight: true,
		},
		{
			id: "row22",
			pageId: "page7",
			order: 7,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row23",
			pageId: "page7",
			order: 8,
			height: 5,
			flexHeight: true,
		},
		{
			id: "row24",
			pageId: "page7",
			order: 9,
			height: 5,
			flexHeight: true,
		},
		{
			id: "row25",
			pageId: "page7",
			order: 10,
			height: 5,
			flexHeight: true,
		},
	],
	tiles: [
		{
			id: "tile2",
			pageId: "page1",
			rowId: "row1",
			order: 2,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Text Heading",
					},
					{
						type: textBlockType.P,
						content: "Here’s an example of a paragraph with a much greater amount of body text.",
					},
					{
						type: textBlockType.P,
						content:
							"Let’s look at one with even more. There’s something to be said for the way the colors transition in the photo of the mountain to the left. It represents warm and cold hues, as well as bright and dark shades.",
					},
				],
			},
		},
		{
			id: "tile1",
			pageId: "page1",
			rowId: "row1",
			order: 1,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-2.jpg",
			},
		},
		{
			id: "tile3",
			pageId: "page2",
			rowId: "row2",
			order: 1,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-1.jpg",
			},
		},
		{
			id: "tile4",
			pageId: "page2",
			rowId: "row2",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-2.jpg",
			},
		},
		{
			id: "tile5",
			pageId: "page3",
			rowId: "row3",
			order: 1,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "Text Subheading",
					},
					{
						type: textBlockType.P,
						content: "Here’s an example of a paragraph with a much greater amount of body text.",
					},
					{
						type: textBlockType.P,
						content:
							"Let’s look at one with even more. There’s something to be said for the colors in the mountain.",
					},
				],
			},
		},
		{
			id: "tile6",
			pageId: "page3",
			rowId: "row3",
			order: 2,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "Text Subheading",
					},
					{
						type: textBlockType.P,
						content: "Here’s an example of a paragraph with a much greater amount of body text.",
					},
					{
						type: textBlockType.P,
						content:
							"Let’s look at one with even more. There’s something to be said for the colors in the mountain.",
					},
				],
			},
		},
		{
			id: "tile7",
			pageId: "page3",
			rowId: "row4",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-3.jpg",
			},
		},
		{
			id: "tile8",
			pageId: "page4",
			rowId: "row5",
			order: 1,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Do your work once, show it off everywhere",
					},
					{
						type: textBlockType.P,
						content:
							"Embed your work from Figma, Notion, Airtable, G Suite, Office, and many other apps on the web.",
					},
				],
			},
		},
		{
			id: "tile9",
			pageId: "page4",
			rowId: "row5",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-giphy-1.gif",
			},
		},
		{
			id: "tile10",
			pageId: "page5",
			rowId: "row6",
			order: 1,
			width: 12,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Viewport → content area",
					},
				],
			},
		},
		{
			id: "tile11",
			pageId: "page5",
			rowId: "row7",
			order: 1,
			width: 5,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "1/5",
					},
					{
						type: textBlockType.P,
						content: "Let's use a 1280x724 viewport as a starting point.",
					},
				],
			},
		},
		{
			id: "tile12",
			pageId: "page5",
			rowId: "row7",
			order: 2,
			width: 7,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/grid-01.png",
				imageSize: "contain",
				imagePosition: "center top",
			},
		},
		{
			id: "tile13",
			pageId: "page5",
			rowId: "row8",
			order: 1,
			width: 5,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "2/5",
					},
					{
						type: textBlockType.P,
						content:
							"Horizontal and vertical margins are subtracted from the viewport. This is for fixed-positioned UI elements like the titlebar and toolbar.",
					},
				],
			},
		},
		{
			id: "tile14",
			pageId: "page5",
			rowId: "row8",
			order: 2,
			width: 7,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/grid-02.png",
				imageSize: "contain",
				imagePosition: "center top",
			},
		},
		{
			id: "tile15",
			pageId: "page5",
			rowId: "row9",
			order: 1,
			width: 5,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "3/5",
					},
					{
						type: textBlockType.P,
						content:
							"A 16x9 rectangle fills the remaining space. Page dimensions are derived from the size of this rect.",
					},
				],
			},
		},
		{
			id: "tile16",
			pageId: "page5",
			rowId: "row9",
			order: 2,
			width: 7,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/grid-03.png",
				imageSize: "contain",
				imagePosition: "center top",
			},
		},
		{
			id: "tile17",
			pageId: "page5",
			rowId: "row10",
			order: 1,
			width: 5,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "4/5",
					},
					{
						type: textBlockType.P,
						content: "A page margin is subtracted from the area. Here the page margin is 12pts.",
					},
				],
			},
		},
		{
			id: "tile18",
			pageId: "page5",
			rowId: "row10",
			order: 2,
			width: 7,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/grid-04.png",
				imageSize: "contain",
				imagePosition: "center top",
			},
		},
		{
			id: "tile19",
			pageId: "page5",
			rowId: "row11",
			order: 1,
			width: 5,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content: "5/5",
					},
					{
						type: textBlockType.P,
						content:
							"We're left with the content area of the page, 936x516 in this case. This is the area that is subdivded into rows and columns.",
					},
				],
			},
		},
		{
			id: "tile20",
			pageId: "page5",
			rowId: "row11",
			order: 2,
			width: 7,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/grid-05.png",
				imageSize: "contain",
				imagePosition: "center top",
			},
		},
		{
			id: "tile21",
			pageId: "page6",
			rowId: "row12",
			order: 1,
			width: 6,
			type: tileNames.COLOR.name,
			params: {
				color: "#c630bb",
			},
		},
		{
			id: "tile22",
			pageId: "page6",
			rowId: "row12",
			order: 2,
			width: 6,
			type: tileNames.COLOR.name,
			params: {
				color: "#6a0d8f",
			},
		},
		{
			id: "tile23",
			pageId: "page6",
			rowId: "row13",
			order: 1,
			width: 12,
			type: tileNames.COLOR.name,
			params: {
				color: "#9e1bad",
			},
		},
		{
			id: "tile24",
			pageId: "page6",
			rowId: "row14",
			order: 1,
			width: 9,
			type: tileNames.COLOR.name,
			params: {
				color: "#d84eb5",
			},
		},
		{
			id: "tile25",
			pageId: "page6",
			rowId: "row14",
			order: 2,
			width: 3,
			type: tileNames.COLOR.name,
			params: {
				color: "#fcd4df",
			},
		},
		{
			id: "tile26",
			pageId: "page6",
			rowId: "row15",
			order: 1,
			width: 2,
			type: tileNames.COLOR.name,
			params: {
				color: "#d68fc0",
			},
		},
		{
			id: "tile27",
			pageId: "page6",
			rowId: "row15",
			order: 2,
			width: 10,
			type: tileNames.COLOR.name,
			params: {
				color: "#330c4e",
			},
		},
		{
			id: "tile28",
			pageId: "page7",
			rowId: "row16",
			order: 1,
			width: 12,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: `Abstract Visuals`,
					},
				],
			},
		},
		{
			id: "tile29",
			pageId: "page7",
			rowId: "row17",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/1c22fa80-d13f-4916-aa0d-e0fc21f7378b.png.webp",
			},
		},
		{
			id: "tile30",
			pageId: "page7",
			rowId: "row18",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/3dd7bfc3-9ee5-464a-ba93-989e5493d8b5.png.webp",
			},
		},
		{
			id: "tile31",
			pageId: "page7",
			rowId: "row19",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/2ba31bb5-800c-49bc-96c8-7b4e1e411394.png.webp",
			},
		},
		{
			id: "tile32",
			pageId: "page7",
			rowId: "row20",
			order: 1,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/8aa770bd-0eb6-4a1c-954d-e06e054e84b7.png.webp",
			},
		},
		{
			id: "tile33",
			pageId: "page7",
			rowId: "row20",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/3dd7bfc3-9ee5-464a-ba93-989e5493d8b5.png.webp",
			},
		},
		{
			id: "tile34",
			pageId: "page7",
			rowId: "row21",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/9d6e6758-83b1-485a-9678-f746cf6f0749.png.webp",
			},
		},
		{
			id: "tile35",
			pageId: "page7",
			rowId: "row22",
			order: 1,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/c9edfa7d-55b2-40b7-bb73-c6d5ec3db7a8.png.webp",
			},
		},
		{
			id: "tile36",
			pageId: "page7",
			rowId: "row22",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/bd7044a5-cbd9-44dd-869d-602584ec18ac.png.webp",
			},
		},
		{
			id: "tile37",
			pageId: "page7",
			rowId: "row23",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/thumbnail-2.png",
			},
		},
		{
			id: "tile38",
			pageId: "page7",
			rowId: "row24",
			order: 1,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/9489d191-06ee-4813-8a1e-473148fe3770.png.webp",
			},
		},
		{
			id: "tile39",
			pageId: "page7",
			rowId: "row24",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/44ee4b75-22d8-4692-9e79-d0de92fb011f.png.webp",
			},
		},
		{
			id: "tile40",
			pageId: "page7",
			rowId: "row25",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/aforox/thumbnail-1.png",
			},
		},
	],
};
