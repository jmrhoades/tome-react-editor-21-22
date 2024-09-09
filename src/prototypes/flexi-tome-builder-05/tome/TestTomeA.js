import { tileNames, textBlockType } from "../page/TileConstants";

export const TestTomeA = {
	pages: [
		{
			id: "page1",
			order: 2,
		},
		{
			id: "page2",
			order: 1,
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
			id: "tile3",
			pageId: "page2",
			rowId: "row2",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/ds-image-square-mountains-2.jpg",
			},
		},
		
	],
};
