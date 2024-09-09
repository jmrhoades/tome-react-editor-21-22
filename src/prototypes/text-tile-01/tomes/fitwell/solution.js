import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme());

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.P,
						content: "Solution",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H1,
						content: "Introducing Fitwell — the first wearable to track the entire spectrum of cardio health.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height12;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/fitwell/Watch-Final.png",
			},
		},
		row,
		tome
	);

	return page;
};
