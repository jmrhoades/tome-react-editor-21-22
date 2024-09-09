import { uniqueId } from "lodash";
import { tileNames, textBlockType, tableTileType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	// Page
	let page = appendPageToTome(tome, createTheme({ mode: "oxide" }));
	

	// Row
	let row = appendRowToPageInTome(page, tome);
	let tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H2,
						content: "Servers as they should be",
						//color: "#48D597",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Hardware, with the software baked in, for running infrastructure at scale. Shipping 2022.",
						//color: "D1D2D3",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height12;


	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/oxide/image-1.webp",
				imageSize: "cover",
				imagePosition: "left"
			},
		},
		row,
		tome
	);

	row.height = 12;

	return page;
};
