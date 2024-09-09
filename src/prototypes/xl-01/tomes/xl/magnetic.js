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

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H1,
						content: "Magnetic",
					},
				],
			},
		},
		row,
		tome,
	);
	row.height = 6;

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/zac-henderson/b463a9155386831.63532ddcb1895.jpg",
				imageSize: "cover",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
		
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/zac-henderson/101ed8155386831.63532dddaee0c.jpg",
				imageSize: "cover",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
		
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/zac-henderson/9e21bd155386831.63532dde998cd.jpg",
				imageSize: "cover",
				//backgroundColor: "rgba(0,0,0,0.02)",
			},
		},
		row,
		tome,
		
	);

	row.height = 12;
	return page;
};
