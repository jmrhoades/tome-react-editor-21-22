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
			type: tileNames.IMAGE.name,
			params: {
				image: "/fitwell/diagram01.svg",
				imageSize: "contain",
			},
		},
		row,
		tome,
		8
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "UML: Activity Diagram",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content:
							"Activity diagrams represent workflows in a graphical way. They can be used to describe the business or operational workflows of any component in a system.",
					},
				],
			},
		},
		row,
		tome,
		4
	);

	row.height = tile.height12;
	row.height = 12;
	return page;
};
