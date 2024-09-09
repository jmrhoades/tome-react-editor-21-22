import { tileNames, textBlockType } from "../page/TileConstants";

export const TestTomeA = {
	pages: [
		{
			id: "page_ahjsgd367i",
			order: 1,
		},
	],
	rows: [
		{
			id: "row_kjsadgf",
			pageId: "page_ahjsgd367i",
			order: 1,
			height: 11,
			flexHeight: false,
		},
		{
			id: "row_sdoiufgy",
			pageId: "page_ahjsgd367i",
			order: 2,
			height: 12,
			flexHeight: false,
		},
		{
			id: "row_ufehjfs",
			pageId: "page_ahjsgd367i",
			order: 3,
			height: 12,
			flexHeight: false,
		},
	],
	tiles: [
		{
			id: "tile_ajdaio9a87",
			pageId: "page_ahjsgd367i",
			rowId: "row_kjsadgf",
			order: 1,
			width: 6,
			height6: 11,
			height12: 7,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Purple Smoke",
					},
					{
						type: textBlockType.P,
						content:
							"The passageways varied. Some were large enough to fit a ship through, more like a dry dock than a corridor. Some were like the Roci or the Falcon, well fitted to a human form. Some were barely crawl spaces and some as thin as drinking straws. Probably there were others too small for the naked eye to see.",
					},
				],
			},
		},
		{
			id: "tile_8fkhagdfg",
			pageId: "page_ahjsgd367i",
			rowId: "row_kjsadgf",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/unsplash/camille-couvez-H5PnIYI_1I0-unsplash.jpg",
				imageSize: "cover",
				backgroundColor: "#F2434B",
			},
		},
		{
			id: "tile_jgd7823Ifgdfg",
			pageId: "page_ahjsgd367i",
			rowId: "row_sdoiufgy",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/device-phone-purple-smoke.png",
				imageSize: "contain",
				backgroundColor: "#F2434B",
			},
		},
		{
			id: "tile_hf783s",
			pageId: "page_ahjsgd367i",
			rowId: "row_ufehjfs",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/device-laptop-purple-smoke.png",
				imageSize: "contain",
				backgroundColor: "#FFF",
			},
		},
		
	],
};






