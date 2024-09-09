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
			id: "row_kjsadgf",
			pageId: "page1",
			order: 1,
			height: 5,
			flexHeight: false,
		},
		{
			id: "row_sdoiufgy",
			pageId: "page1",
			order: 2,
			height: 6,
			flexHeight: false,
		},
		{
			id: "row_fhiuowbs",
			pageId: "page1",
			order: 3,
			height: 13,
			flexHeight: false,
		},
		{
			id: "row_lsdfkljss",
			pageId: "page1",
			order: 4,
			height: 14,
			flexHeight: false,
		},
        {
			id: "row_ljfgsdtdew",
			pageId: "page1",
			order: 5,
			height: 8,
			flexHeight: false,
		},
        {
			id: "row_qoisdf8",
			pageId: "page1",
			order: 6,
			height: 8,
			flexHeight: false,
		},
		{
			id: "row_i8723rgf",
			pageId: "page2",
			order: 1,
			height: 13,
			flexHeight: true,
		},
		{
			id: "row_jkhf73452ajkw",
			pageId: "page2",
			order: 3,
			height: 10,
			flexHeight: true,
		},
	],
	tiles: [

		{
			id: "tile_ask75rt43frh3",
			pageId: "page1",
			rowId: "row_kjsadgf",
			order: 1,
			width: 12,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Null States",
					},
					{
						type: textBlockType.P,
						content:
							"When adding tiles, we can educate users on how to populate it with content.",
					},
				],
			},
		},

		{
			id: "tile_sadlkjgh",
			pageId: "page1",
			rowId: "row_sdoiufgy",
			order: 1,
			width: 6,
			type: tileNames.GIPHY.name,
			params: {},
		},
        {
			id: "tile_hjfuise7fh",
			pageId: "page1",
			rowId: "row_sdoiufgy",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {},
		},
        {
			id: "tile_hjsdfjhsld7fh",
			pageId: "page1",
			rowId: "row_fhiuowbs",
			order: 1,
			width: 6,
			type: tileNames.FIGMA.name,
			params: {},
		},
        {
			id: "tile_askjdlh3",
			pageId: "page1",
			rowId: "row_fhiuowbs",
			order: 2,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "More care, for more people.",
					},
					{
						type: textBlockType.P,
						content:
							"We help more patients access the healthcare they need by offering affordable monthly payment options.",
					},
					{
						type: textBlockType.H2,
						content:
							"Approve up to 90% of patients.",
					},
					{
						type: textBlockType.P,
						content:
							"Many patients looking for care are turned away because of increased out-of-pocket costs and unsophisticated credit algorithms. But that doesn’t have to be the case. It’s time to get more people the treatment they deserve.",
					},
				],
			},
		},
        {
			id: "tile_kjdgs5dcd",
			pageId: "page1",
			rowId: "row_lsdfkljss",
			order: 1,
			width: 6,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "We've cracked the code",
					},
					{
						type: textBlockType.P,
						content:
							"But that doesn’t have to be the case. It’s time to get more people the treatment they deserve.",
					},
					{
						type: textBlockType.H3,
						content:
							"Oh…yes we have",
					},
					{
						type: textBlockType.P,
						content:
							"There's no longer a need for providers to turn away patients, offer multiple finance solutions, or try to manage in-house payment plans.",
					},
                    {
						type: textBlockType.H3,
						content:
							"Let's partner!",
					},
					{
						type: textBlockType.P,
						content:
							"Talk with one of our team members to see how we can help you approve more patients.",
					},
				],
			},
		},
        {
			id: "tile_hlksdjfls",
			pageId: "page1",
			rowId: "row_lsdfkljss",
			order: 2,
			width: 6,
			type: tileNames.AIRTABLE.name,
			params: {},
		},
        {
			id: "tile_h763trfgfls",
			pageId: "page1",
			rowId: "row_ljfgsdtdew",
			order: 1,
			width: 12,
			type: tileNames.VIDEO.name,
			params: {},
		},
        {
			id: "tile_h7wiut734gls",
			pageId: "page1",
			rowId: "row_qoisdf8",
			order: 1,
			width: 12,
			type: tileNames.TWITTER.name,
			params: {},
		},
		{
			id: "tile_ajdaio9a87",
			pageId: "page2",
			rowId: "row_i8723rgf",
			order: 1,
			width: 6,
			height6: 13,
			height12: 10,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Tile scaling",
					},
					{
						type: textBlockType.P,
						content:
							"Let’s walk through some examples so we don’t  need to rely purely on words.",
					},
					{
						type: textBlockType.H3,
						content:
							"Default",
					},
					{
						type: textBlockType.P,
						content:
							"There's no longer a need for providers to turn away patients, offer multiple finance solutions, or try to manage in-house payment plans.",
					},
                    {
						type: textBlockType.H3,
						content:
							"Crop behavior",
					},
					{
						type: textBlockType.P,
						content:
							"Once an image is cropped, the cropped out data cannot be seen by viewers of, but it is visible to editors in adjust mode.",
					},
				],
			},
		},
		{
			id: "tile_8fkhagdfg",
			pageId: "page2",
			rowId: "row_i8723rgf",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/device-bubble-image-white-bg.jpg",
				imageSize: "contain",
				backgroundColor: "#fff",
			},
		},
		{
			id: "tile_jgd7823Ifgdfg",
			pageId: "page2",
			rowId: "row_jkhf73452ajkw",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			
			params: {
				image: "/images/pretty-bubble.jpg",
			},
		},

		
	],
};






