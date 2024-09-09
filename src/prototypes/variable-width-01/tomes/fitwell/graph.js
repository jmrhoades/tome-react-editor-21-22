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
						type: textBlockType.H2,
						content: "Test",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "We added domain matching for invitations to Tomes, and auto-generated workspaces for guests and saw a 20% m/m lift in workspace expansion.",
					},
				],
			},
		},
		row,
		tome,
		4
	);


	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/fitwell/graph.svg",
				imageSize: "contain",
			},
		},
		row,
		tome,
		8
	);


	
	

	


	row.height = tile.height12;
	row.height = 12;
	return page;
};
