import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[3]);

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,

			params: {
				autoPlay: true,
				video: "/lightcast/Lightcast Glow-719233983.mp4",
			},
		},
		row,
		tome
	);

	return page;
};
