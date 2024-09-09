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
			height6: 11,
			height12: 9,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H2,
						content: "Introducing Pixy, your friendly flying camera.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content: "It’s a pocket-sized, free-flying sidekick that’s a fit for adventures big and small.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Pixy is a companion to Snapchat. Videos from flights are wirelessly transferred and saved into Snapchat Memories. From there, use Snapchat’s editing tools, Lenses, and Sounds to customize what you capture. ",
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
				image: "/pixy/pixy1.jpg",
			},
		},
		row,
		tome,
		8
	);
	row.height = 15;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H2,
						content: "Get the perfect shot of you and the whole crew as Hover pans to whatever direction you lead it.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 5;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {
				image: "/pixy/pixy2.jpg",
				video: "/humankind/humankind-intro.mp4",
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
			height6: 11,
			height12: 9,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H2,
						content: "Introducing Pixy, your friendly flying camera.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content: "It’s a pocket-sized, free-flying sidekick that’s a fit for adventures big and small.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Pixy is a companion to Snapchat. Videos from flights are wirelessly transferred and saved into Snapchat Memories. From there, use Snapchat’s editing tools, Lenses, and Sounds to customize what you capture. ",
					},
				],
			},
		},
		row,
		tome,
		2
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/pixy/pixy1.jpg",
			},
		},
		row,
		tome,
		10
	);


	row.height = 34;


	return page;
};
