import { tileNames, textBlockType } from "../page/TileConstants";

export const TestTomeA = {
	pages: [
		{
			id: "page1",
			order: 3,
		},
		{
			id: "page2",
			order: 2,
		},
		{
			id: "page3",
			order: 1,
		},
		
	],
	rows: [
		{
			id: "row1",
			pageId: "page1",
			order: 1,
			height: 2,
			flexHeight: true,
		},
		{
			id: "row3",
			pageId: "page1",
			order: 2,
			height: 2,
			flexHeight: true,
		},
		{
			id: "row4",
			pageId: "page1",
			order: 3,
			height: 2,
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
			id: "row5",
			pageId: "page3",
			order: 1,
			height: 3,
			flexHeight: false,
		},
		{
			id: "row6",
			pageId: "page3",
			order: 2,
			height: 6,
			flexHeight: false,
		},
		
	],
	tiles: [
		
		{
			id: "tile5",
			pageId: "page1",
			rowId: "row1",
			order: 1,
			width: 12,
			type: tileNames.TEXT.name,
			params: {
				centerVertical: true,
				textAlign: "center",
				blocks: [
					{
						type: textBlockType.H2,
						content: "Operators",
					},
				],
			},
		},
		{
			id: "tile6",
			pageId: "page1",
			rowId: "row3",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/t-e/54bd43bf632a270300880cb0_2048.png",
				imageSize: "contain",
			},
		},
		{
			id: "tile7",
			pageId: "page1",
			rowId: "row4",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/t-e/5bc066ec1a41630004a9ce50_2048.png",
				imageSize: "contain",
			},
		},

		{
			id: "tile2",
			pageId: "page2",
			rowId: "row2",
			order: 1,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "the magic radio",
					},
					{
						type: textBlockType.P,
						content: "introducing OB–4, the portable high fidelity loudspeaker with two 4'' bass drivers and a pair of neodymium tweeters that deliver crystal clear, open natural sound with 38 watts per channel — that's around 100 decibels of incredible sounding stereo.",
					},
					{
						type: textBlockType.P,
						content: "listen using line input, bluetooth, FM radio and disk. the interface is minimal, with only the things you really need. yet if you look below the surface, there's a lot more than meets the eye. ",
					},
				],
			},
		},

		{
			id: "tile3",
			pageId: "page2",
			rowId: "row2",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/t-e/5f7489690ac0440004e5b89e_2048.png",
				imageSize: "cover",
			},
		},
		{
			id: "tile8",
			pageId: "page3",
			rowId: "row5",
			order: 1,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "The Dolomites",
					},
				],
			},
		},
		{
			id: "tile9",
			pageId: "page3",
			rowId: "row6",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-1.jpg",
				imageSize: "cover",
			},
		},
		{
			id: "tile10",
			pageId: "page3",
			rowId: "row5",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-2.jpg",
				imageSize: "cover",
			},
		},
	],
};






