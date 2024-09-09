import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme({ mode: "light" }));

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
						content: "Research",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H1,
						content: "Wearables can help, but most people don't trust the metrics.",
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
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Dom, 31",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "“I love the idea of a watch that really tells me where I'm at. Unfortunately, there's nothing out there that can do that yet.”",
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
				image: "/fitwell/thai-an-E2Yd6K2A3fE-unsplash.jpg",
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
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Ezra, 34",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "“I’m not very good about going to a my doctor regularly. So I’d definitely pay for something more convenient if it actually existed.”",
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
				image: "/fitwell/danie-franco-tN0UwMCB-ks-unsplash.jpg",
				imageSize: "cover",
				imagePosition: "center center"
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
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H3,
						content: "Ivy, 28",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "“Everyone I know, myself included, doesn't really trust the health data that their smartwatch gives them.”",
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
				image: "/fitwell/Interview-14.png",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	

	
	return page;
};
