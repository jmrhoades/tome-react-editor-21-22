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
			height12: 7,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "Problem",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H1,
						content: "The modern world is busy, making it more difficult than ever to stay healthy.",
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
			height6: 6,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Annual Visits",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "75% of people don't schedule an annual visit with their doctor, citing a lack of time in their busy schedules",
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
				image: "/fitwell/Data-2.png",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Diagnostic Appointments",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "Out of the 25% people who do schedule a visit, more than 50% end up missing their diagnostic appointment",
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
				image: "/fitwell/Data-3.png",
				imageSize: "cover",
			},
		},
		row,
		tome
	);

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Remote Work",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "Remote work has decreased average physical activity by 10%, largely due to the lack of commute and office commute",
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
				image: "/fitwell/Data-4.png",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	

	
	return page;
};
