import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	// Page
	let page = appendPageToTome(tome, createTheme());

	

	// Row
	let row = appendRowToPageInTome(page, tome);
	let tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 12,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H0,
						content: "",
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
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
                        id: uniqueId("block_p_"),
                        type: textBlockType.P,
                        content:
                            "This page demonstrates how placeholder text interacts with different size and aligment options. Try selecting the blank text tile and changing its style properties in the property panel. Notice that in left and center alignments, the active caret is always to the left of the placeholder text. For right alignments, the caret is aligned right.",
                    },
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height12;
	

	return page;
};


