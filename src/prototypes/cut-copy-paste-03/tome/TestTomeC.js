import { tileNames, textBlockType } from "../page/TileConstants";

export const TestTomeC = {
	pages: [
		{
			id: "page_ahjsgd367i",
			order: 2,
		},
        {
			id: "page_kjsfguyweg",
			order: 1,
		},
	],
	rows: [
		{
			id: "row_kjsadgf",
			pageId: "page_kjsfguyweg",
			order: 1,
			height: 4,
			flexHeight: true,
		},
		{
			id: "row_sdoiufgy",
			pageId: "page_ahjsgd367i",
			order: 1,
			height: 48,
			flexHeight: true,
		},
        {
			id: "row_klshf8o7w4",
			pageId: "page_kjsfguyweg",
			order: 2,
			height: 8,
			flexHeight: true,
		},
	],
	tiles: [
		{
			id: "tile_ajdaio9a87",
			pageId: "page_kjsfguyweg",
			rowId: "row_kjsadgf",
			order: 1,
			width: 12,
			height6: 6,
			height12: 4,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Last row resize: shrink",
					},
					{
						type: textBlockType.P,
						content:
							"An attempt to make the row resize drag action more controllable by waiting to update the page y position until drag end.",
					},
				],
			},
		},
        {
			id: "tile_adsqwr2353456",
			pageId: "page_ahjsgd367i",
			rowId: "row_sdoiufgy",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,

			params: {
				image: "/images/iphone-wallpapers/1961.Light_Beams_Dark_Gray_Light-428w-926h@3x~iphone.jpeg",
				imageSize: "cover",
				backgroundColor: "#000",
			},
		},
        {
			id: "tile_ajksgdfuys342",
			pageId: "page_kjsfguyweg",
			rowId: "row_klshf8o7w4",
			order: 1,
			width: 12,
			type: tileNames.IMAGE.name,

			params: {
				image: "/images/iphone-wallpapers/1951.Light_Beams_Silver_Light-428w-926h@3x~iphone.jpeg",
				imageSize: "contain",
				
			},
		},
    ]
}