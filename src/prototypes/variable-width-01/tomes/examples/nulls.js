import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme({ mode: "dark" }));

	

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {},
		},
		row,
		tome
	);
	row.height = 6;

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.WEB.name,
			params: {},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.FIGMA.name,
			params: {},
		},
		row,
		tome
	);
	row.height = 6;

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.AIRTABLE.name,
			params: {},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.GIPHY.name,
			params: {},
		},
		row,
		tome
	);
	row.height = tile.height12;
	row.height = 6;


	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TWITTER.name,
			params: {},
		},
		row,
		tome
	);

	row.height = tile.height12;
	row.height = 6;

	return page;
};
