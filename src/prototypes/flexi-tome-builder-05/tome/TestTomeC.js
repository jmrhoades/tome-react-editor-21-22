import { tileNames, textBlockType } from "../page/TileConstants";

export const TestTomeC = {
	pages: [
		{
			id: "page1",
			order: 1,
		},
	],
	rows: [
		{
			id: "row1",
			pageId: "page1",
			order: 1,
			height: 1,
			flexHeight: true,
		},
		{
			id: "row2",
			pageId: "page1",
			order: 2,
			height: 3,
			flexHeight: true,
		},
		{
			id: "row3",
			pageId: "page1",
			order: 3,
			height: 7,
			flexHeight: true,
		},
		{
			id: "row4",
			pageId: "page1",
			order: 4,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row5",
			pageId: "page1",
			order: 5,
			height: 5,
			flexHeight: true,
		},
		{
			id: "row6",
			pageId: "page1",
			order: 6,
			height: 7,
			flexHeight: true,
		},
		{
			id: "row7",
			pageId: "page1",
			order: 7,
			height: 2,
			flexHeight: true,
		},
		{
			id: "row8",
			pageId: "page1",
			order: 8,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row9",
			pageId: "page1",
			order: 9,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row10",
			pageId: "page1",
			order: 10,
			height: 4,
			flexHeight: true,
		},
	],
	tiles: [
		{
			id: "tile1",
			pageId: "page1",
			rowId: "row1",
			order: 1,
			width: 12,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Typography",
					},
				],
			},
		},
		{
			id: "tile2",
			pageId: "page1",
			rowId: "row2",
			order: 1,
			width: 8,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content:
							"Straight-forward with a polished simplicity, our typography gives all the key information but never talks over the artist. Our typeface is called Plain—in a good way.",
					},
				],
			},
		},
		{
			id: "tile3",
			pageId: "page1",
			rowId: "row2",
			order: 2,
			width: 4,
			type: tileNames.TEXT.name,
			params: {},
		},
		{
			id: "tile4",
			pageId: "page1",
			rowId: "row3",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/vevo/type-carousel-05.jpg",
				imageSize: "contain",
				imagePosition: "center top",
			},
		},
		{
			id: "tile5",
			pageId: "page1",
			rowId: "row4",
			order: 1,
			width: 8,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Overview",
					},
					{
						type: textBlockType.H3,
						content: "Plain is a radically simple sans-serif font family designed by François Rappo in 2013. It is an incredibly fluid typeface, both flexible and utilitarian at the same time. It complements the geometry of the Vevo logo and provides a warmth that is associated with revivalist Grotesque typeface design.",
					},
				],
			},
		},
		{
			id: "tile6",
			pageId: "page1",
			rowId: "row4",
			order: 2,
			width: 4,
			type: tileNames.TEXT.name,
			params: {},
		},
		{
			id: "tile7",
			pageId: "page1",
			rowId: "row5",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/vevo/typography-06.svg",
				imageSize: "contain",
			},
		},
		{
			id: "tile8",
			pageId: "page1",
			rowId: "row6",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/vevo/typography-01b.svg",
				imageSize: "contain",
			},
		},
		{
			id: "tile9",
			pageId: "page1",
			rowId: "row7",
			order: 1,
			width: 8,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.P,
						content: "To obtain a copy of the typeface or if you have questions regarding licensing, please reach out to Vevo Brand Team.",
					},
				],
			},
		},
		{
			id: "tile10",
			pageId: "page1",
			rowId: "row7",
			order: 2,
			width: 4,
			type: tileNames.TEXT.name,
			params: {},
		},
		{
			id: "tile11",
			pageId: "page1",
			rowId: "row8",
			order: 1,
			width: 8,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Weights",
					},
					{
						type: textBlockType.H3,
						content: "Our brand typeface Plain comes in two weights: Regular and Medium. The most common weight of the typeface used throughout the visual identity is Medium, but we use Regular for small copy to maximise legibility.",
					},
				],
			},
		},
		{
			id: "tile12",
			pageId: "page1",
			rowId: "row8",
			order: 2,
			width: 4,
			type: tileNames.TEXT.name,
			params: {},
		},
		{
			id: "tile13",
			pageId: "page1",
			rowId: "row9",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/vevo/typography-08.svg",
				imageSize: "contain",
			},
		},
		{
			id: "tile14",
			pageId: "page1",
			rowId: "row10",
			order: 1,
			width: 8,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Setting Type",
					},
					{
						type: textBlockType.H3,
						content: "Typography should only ever be aligned in two ways: Left-aligned or centered. Never right-align or force-justify typography.",
					},
				],
			},
		},
		{
			id: "tile15",
			pageId: "page1",
			rowId: "row10",
			order: 2,
			width: 4,
			type: tileNames.TEXT.name,
			params: {},
		},
	],
};
