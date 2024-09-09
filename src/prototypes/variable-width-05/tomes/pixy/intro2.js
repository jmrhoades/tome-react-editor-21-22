import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme({mode: "light"}));

	

	// Row
	row = appendRowToPageInTome(page, tome);
	
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/pixy/pixy5.jpg",
			},
		},
		row,
		tome,
		8
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Get the perfect shot of you and the whole crew as Hover pans to whatever direction you lead it.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 8;



	// Row
	row = appendRowToPageInTome(page, tome);
	
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 11,
			height12: 9,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.DISTRIBUTE,
				blocks: [

					{
						id: uniqueId("block_p_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H4,
						content:
							"It gives you a totally new perspective, actually allows you to have fun and go hang out with your family and create videos all together",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Evan Spiegel, Snap CEO",
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
				image: "/pixy/pixy6.jpg",
			},
		},
		row,
		tome,
		8
	);

	row.height = 8;


	return page;
};
