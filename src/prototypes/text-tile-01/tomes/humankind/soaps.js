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
						content: "Popular Scents",
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
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Grapefruit",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap3.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 9;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Tea Tree",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap4.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 9;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Peppermint",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap5.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 9;


	return page;
};
