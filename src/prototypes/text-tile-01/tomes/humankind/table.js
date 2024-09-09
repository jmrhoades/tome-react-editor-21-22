import { uniqueId } from "lodash";
import { tileNames, textBlockType, tableTileType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
    const TD = tableTileType.TD;

	// Page
	let page = appendPageToTome(tome, createTheme({ mode: "light" }));

	// Row
	let row = appendRowToPageInTome(page, tome);
	let tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 2,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Data",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height6;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TABLE.name,
			height6: 9,
			height12: 9,
			params: {
				title: "Product popularity, by month",
				columns: [208, 127, 127, 127, 127, 127, 127, 127, 127, 127],
				header: ["", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"],
				rows: [
					[
						{ type: TD, content: "💛 Active" },
						{ type: TD, content: "17" },
						{ type: TD, content: "26" },
						{ type: TD, content: "53" },
						{ type: TD, content: "34" },
						{ type: TD, content: "76" },
						{ type: TD, content: "90" },
						{ type: TD, content: "43" },
						{ type: TD, content: "23" },
						{ type: TD, content: "19" },
					],
					[
						{ type: TD, content: "💚 Awake" },
						{ type: TD, content: "55" },
						{ type: TD, content: "43" },
						{ type: TD, content: "70" },
						{ type: TD, content: "65" },
						{ type: TD, content: "43" },
						{ type: TD, content: "21" },
						{ type: TD, content: "33" },
						{ type: TD, content: "87" },
						{ type: TD, content: "22" },
					],
					[
						{ type: TD, content: "💙 Balance" },
						{ type: TD, content: "23" },
						{ type: TD, content: "12" },
						{ type: TD, content: "18" },
						{ type: TD, content: "19" },
						{ type: TD, content: "17" },
						{ type: TD, content: "11" },
						{ type: TD, content: "67" },
						{ type: TD, content: "64" },
						{ type: TD, content: "41" },
					],
					[
						{ type: TD, content: "🖤 Cozy" },
						{ type: TD, content: "17" },
						{ type: TD, content: "11" },
						{ type: TD, content: "0" },
						{ type: TD, content: "0" },
						{ type: TD, content: "1" },
						{ type: TD, content: "6" },
						{ type: TD, content: "12" },
						{ type: TD, content: "18" },
						{ type: TD, content: "23" },
					],
					[
						{ type: TD, content: "💜 Indulge" },
						{ type: TD, content: "6" },
						{ type: TD, content: "12" },
						{ type: TD, content: "92" },
						{ type: TD, content: "104" },
						{ type: TD, content: "153" },
						{ type: TD, content: "243" },
						{ type: TD, content: "74" },
						{ type: TD, content: "32" },
						{ type: TD, content: "5" },
					],
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height12;

	

	return page;
};
